
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const SUPABASE_URL = "https://hxmgfhinrmdxgyhggtlv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4bWdmaGlucm1keGd5aGdndGx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNzA2ODksImV4cCI6MjA2MTc0NjY4OX0.RBhItW0FNqBAcgTCMPPl7DgoNvUKIgCew0KXKpmIx0s";
const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID") || "AC811940af25f55ffe7b02540bde704353";
const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN") || "3f1ff9e7aa6df954fbc7c7bd0eb016cf";
const TWILIO_MESSAGING_SERVICE_SID = "MG6de63204cfb2a559380642949d468a65";
const TWILIO_FROM_NUMBER = "+15084747449"; // Direct Twilio number for SMS
const ADMIN_PHONE_NUMBER = "+918919878315"; // Admin's phone number

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": 
    "authorization, x-client-info, apikey, content-type",
};

type MessageType = "confirmation" | "reminder" | "admin-notification";

interface NotificationRequest {
  bookingId?: string;
  name: string;
  phoneNumber: string;
  slotTime: string;
  bookingDate: string;
  type: MessageType;
  players?: number;
}

// Format a regular phone number for SMS
const formatRegularPhoneNumber = (phoneNumber: string): string => {
  // Remove any non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, "");
  
  // Ensure number has country code (+91 for India)
  if (cleaned.length === 10) {
    return `+91${cleaned}`;
  }
  
  // If already has country code
  if (cleaned.startsWith("91") && cleaned.length === 12) {
    return `+${cleaned}`;
  }
  
  // Return with + prefix
  return `+${cleaned}`;
};

const getMessageContent = (
  type: MessageType,
  name: string,
  slotTime: string,
  bookingDate: string,
  players?: number
): string => {
  if (type === "confirmation") {
    return `Hi ${name}, your cricket slot at ${slotTime} on ${bookingDate} is confirmed. Admin has been notified of your booking. See you at the pitch!`;
  } else if (type === "reminder") {
    return `Reminder: Your box cricket slot is today at ${slotTime}. Get ready to play!`;
  } else if (type === "admin-notification") {
    return `NEW BOOKING ALERT!
    
Name: ${name}
Date: ${bookingDate}
Time: ${slotTime}
Players: ${players || 'Not specified'}
Contact: ${formatRegularPhoneNumber(phoneNumber)}

Please prepare the pitch accordingly.`;
  } else {
    return `Hi ${name}, your cricket slot information: ${slotTime} on ${bookingDate}`;
  }
};

// Send SMS message using Twilio with the MessagingServiceSid
const sendSMSMessage = async (
  to: string,
  body: string
): Promise<Response> => {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    console.error("Missing Twilio credentials for SMS");
    throw new Error("Twilio credentials not configured");
  }
  
  console.log(`Sending SMS message to:`, to);
  console.log("SMS message body:", body);
  
  const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
  
  const formData = new URLSearchParams();
  formData.append("To", formatRegularPhoneNumber(to));
  
  // Use MessagingServiceSid for customer confirmations
  if (to === ADMIN_PHONE_NUMBER) {
    // For admin notifications, use direct From number
    formData.append("From", TWILIO_FROM_NUMBER);
  } else {
    formData.append("MessagingServiceSid", TWILIO_MESSAGING_SERVICE_SID);
  }
  
  formData.append("Body", body);
  
  const auth = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);
  
  try {
    console.log("Making Twilio SMS API request to:", twilioUrl);
    console.log("SMS Request headers:", { 
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${auth}` 
    });
    console.log("SMS Request body:", formData.toString());
    
    const twilioResponse = await fetch(twilioUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${auth}`,
      },
      body: formData,
    });
    
    const twilioData = await twilioResponse.json();
    console.log("Twilio SMS API response status:", twilioResponse.status);
    console.log("Twilio SMS API response:", twilioData);
    
    if (twilioResponse.ok) {
      return new Response(
        JSON.stringify({ success: true, messageId: twilioData.sid }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    } else {
      console.error("Twilio SMS error:", twilioData);
      throw new Error(`Twilio SMS error: ${JSON.stringify(twilioData)}`);
    }
  } catch (error) {
    console.error(`Failed to send SMS message:`, error);
    throw error;
  }
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Special case for scheduled invocation (for reminders)
    const source = req.headers.get("x-function-source");
    if (source === "scheduled") {
      console.log("Processing scheduled reminders");
      
      // Fetch today's bookings
      const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      
      const { data: bookings, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("booking_date", currentDate);
      
      if (error) {
        console.error("Error fetching bookings for reminders:", error);
        return new Response(
          JSON.stringify({ error: "Failed to fetch bookings" }),
          { 
            status: 500,
            headers: { "Content-Type": "application/json", ...corsHeaders }
          }
        );
      }
      
      console.log(`Processing ${bookings?.length || 0} bookings for reminders`);
      
      // Send SMS reminders for each booking
      for (const booking of bookings || []) {
        try {
          const messageContent = `Reminder: Your box cricket slot is today at ${booking.start_time} - ${booking.end_time}. Get ready to play!`;
          const toNumber = formatRegularPhoneNumber(booking.mobile_number);
          
          await sendSMSMessage(toNumber, messageContent);
          console.log(`Reminder sent for booking ${booking.id}`);
        } catch (error) {
          console.error(`Failed to send reminder for booking ${booking.id}:`, error);
        }
      }
      
      return new Response(
        JSON.stringify({ message: "Reminders processed successfully" }),
        { headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    // Handle normal message sending requests
    const requestData = await req.json();
    console.log("Received request data:", requestData);
    
    const { name, phoneNumber, slotTime, bookingDate, type, players } = requestData;
    
    if (!name || !phoneNumber || !slotTime || !bookingDate || !type) {
      console.error("Missing required parameters", requestData);
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        { 
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders }
        }
      );
    }
    
    console.log(`Sending ${type} message to ${phoneNumber} for ${name}`);
    
    // Send SMS confirmation to the user
    const userMessageContent = getMessageContent(type, name, slotTime, bookingDate, players);
    const userResponse = await sendSMSMessage(phoneNumber, userMessageContent);
    
    // If this is a booking confirmation, also notify the admin via SMS
    if (type === "confirmation") {
      try {
        console.log("Sending admin notification via SMS");
        
        // Fetch the actual booking details from Supabase for additional information
        const formattedDate = bookingDate.split('T')[0];
        const { data: bookingDetails, error: bookingError } = await supabase
          .from("bookings")
          .select("*")
          .eq("name", name)
          .eq("booking_date", formattedDate)
          .eq("start_time", slotTime.split(" - ")[0])
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (bookingError) {
          console.error("Error fetching booking details for admin notification:", bookingError);
        }
        
        const booking = bookingDetails && bookingDetails.length > 0 ? bookingDetails[0] : null;
        const contactNumber = booking ? booking.mobile_number : phoneNumber;
        const actualPlayers = booking ? booking.players : players || 'Not specified';
        
        const adminMessageContent = `NEW BOOKING ALERT!

Name: ${name}
Date: ${bookingDate}
Time: ${slotTime}
Players: ${actualPlayers}
Contact: ${formatRegularPhoneNumber(contactNumber)}

Please prepare the pitch accordingly.`;

        await sendSMSMessage(ADMIN_PHONE_NUMBER, adminMessageContent);
        console.log("Admin notification sent successfully via SMS");
      } catch (adminError) {
        console.error("Failed to send admin notification:", adminError);
        // Don't fail the overall process if admin notification fails
      }
    }
    
    return userResponse;
  } catch (error) {
    console.error("Error in notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      }
    );
  }
});
