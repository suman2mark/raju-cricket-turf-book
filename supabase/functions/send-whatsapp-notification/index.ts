
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const SUPABASE_URL = "https://hxmgfhinrmdxgyhggtlv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4bWdmaGlucm1keGd5aGdndGx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNzA2ODksImV4cCI6MjA2MTc0NjY4OX0.RBhItW0FNqBAcgTCMPPl7DgoNvUKIgCew0KXKpmIx0s";
const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID");
const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN");
const TWILIO_FROM_NUMBER = "whatsapp:+918919878315"; // Corrected format
const ADMIN_PHONE_NUMBER = "+918919878315"; // Admin's phone number

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": 
    "authorization, x-client-info, apikey, content-type",
};

type MessageType = "confirmation" | "reminder" | "admin-notification";

interface WhatsAppRequest {
  bookingId?: string;
  name: string;
  phoneNumber: string;
  slotTime: string;
  bookingDate: string;
  type: MessageType;
  players?: number;
}

const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove any non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, "");
  
  // Ensure number has country code (+91 for India)
  if (cleaned.length === 10) {
    return `whatsapp:+91${cleaned}`;
  }
  
  // If already has country code
  if (cleaned.startsWith("91") && cleaned.length === 12) {
    return `whatsapp:+${cleaned}`;
  }
  
  // If number already includes +, strip it and add whatsapp: prefix
  if (cleaned.length > 10) {
    return `whatsapp:+${cleaned}`;
  }
  
  console.log("Formatted phone number:", `whatsapp:+91${cleaned}`);
  return `whatsapp:+91${cleaned}`; // Default to India code
};

// Format a regular phone number (not for WhatsApp)
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
Contact: ${formatRegularPhoneNumber(name)}

Please prepare the pitch accordingly.`;
  } else {
    return `Hi ${name}, your cricket slot information: ${slotTime} on ${bookingDate}`;
  }
};

const sendTwilioMessage = async (
  to: string,
  body: string,
  isWhatsApp: boolean = true
): Promise<Response> => {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    console.error("Missing Twilio credentials");
    throw new Error("Twilio credentials not configured");
  }
  
  console.log(`Sending ${isWhatsApp ? 'WhatsApp' : 'SMS'} message to:`, to);
  console.log("Message body:", body);
  console.log("Using Twilio Account SID:", TWILIO_ACCOUNT_SID);
  console.log("Using Twilio from number:", TWILIO_FROM_NUMBER);
  
  const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
  
  const formData = new URLSearchParams();
  formData.append("To", isWhatsApp ? to : formatRegularPhoneNumber(to.replace('whatsapp:', '')));
  
  if (isWhatsApp) {
    formData.append("From", TWILIO_FROM_NUMBER);
  } else {
    // For regular SMS
    formData.append("MessagingServiceSid", "MG6de63204cfb2a559380642949d468a65");
  }
  
  formData.append("Body", body);
  
  const auth = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);
  
  try {
    console.log("Making Twilio API request to:", twilioUrl);
    console.log("Request headers:", { 
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${auth}` 
    });
    console.log("Request body:", formData.toString());
    
    const twilioResponse = await fetch(twilioUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${auth}`,
      },
      body: formData,
    });
    
    const twilioData = await twilioResponse.json();
    console.log("Twilio API response status:", twilioResponse.status);
    console.log("Twilio API response:", twilioData);
    
    if (twilioResponse.ok) {
      return new Response(
        JSON.stringify({ success: true, messageId: twilioData.sid }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    } else {
      console.error("Twilio error:", twilioData);
      throw new Error(`Twilio error: ${JSON.stringify(twilioData)}`);
    }
  } catch (error) {
    console.error(`Failed to send ${isWhatsApp ? 'WhatsApp' : 'SMS'} message:`, error);
    throw error;
  }
};

// Send WhatsApp message using Twilio
const sendWhatsAppMessage = async (
  to: string,
  body: string
): Promise<Response> => {
  return sendTwilioMessage(to, body, true);
};

// Send SMS message using Twilio
const sendSMSMessage = async (
  to: string,
  body: string
): Promise<Response> => {
  return sendTwilioMessage(to, body, false);
};

// Check for upcoming bookings that need reminders
const checkAndSendReminders = async (): Promise<void> => {
  try {
    const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const currentTime = new Date();
    
    // Fetch today's bookings
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("booking_date", currentDate);
    
    if (error) {
      console.error("Error fetching bookings for reminders:", error);
      return;
    }
    
    console.log(`Checking ${bookings?.length || 0} bookings for reminders`);
    
    for (const booking of bookings || []) {
      try {
        // Convert booking time to Date object for comparison
        const [hours, minutes] = booking.start_time.split(":");
        const bookingTime = new Date(currentDate);
        bookingTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));
        
        // Calculate time difference in minutes
        const timeDiff = (bookingTime.getTime() - currentTime.getTime()) / (1000 * 60);
        
        console.log(`Booking ${booking.id} - Slot time: ${booking.start_time}, Time difference: ${timeDiff} minutes`);
        
        // If booking is 45-75 minutes from now, send reminder
        if (timeDiff >= 45 && timeDiff <= 75) {
          const toNumber = formatPhoneNumber(booking.mobile_number);
          const messageContent = getMessageContent(
            "reminder",
            booking.name,
            `${booking.start_time} - ${booking.end_time}`, 
            booking.booking_date
          );
          
          console.log(`Sending reminder for booking ${booking.id} to ${toNumber}`);
          
          await sendWhatsAppMessage(toNumber, messageContent);
          console.log(`Reminder sent for booking ${booking.id}`);
        }
      } catch (error) {
        console.error(`Failed to process reminder for booking ${booking.id}:`, error);
      }
    }
  } catch (error) {
    console.error("Error in reminder processing:", error);
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
      await checkAndSendReminders();
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
    
    const toNumber = formatPhoneNumber(phoneNumber);
    const messageContent = getMessageContent(type, name, slotTime, bookingDate, players);
    
    console.log(`Sending ${type} message to ${toNumber} for ${name}`);
    
    // Send notification to the user
    const userResponse = await sendWhatsAppMessage(toNumber, messageContent);
    
    // If this is a booking confirmation, also notify the admin via SMS
    if (type === "confirmation") {
      try {
        console.log("Sending admin notification");
        const adminMessageContent = getMessageContent("admin-notification", name, slotTime, bookingDate, players);
        await sendSMSMessage(ADMIN_PHONE_NUMBER, adminMessageContent);
        console.log("Admin notification sent successfully");
      } catch (adminError) {
        console.error("Failed to send admin notification:", adminError);
        // Don't fail the overall process if admin notification fails
      }
    }
    
    return userResponse;
  } catch (error) {
    console.error("Error in WhatsApp notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      }
    );
  }
});
