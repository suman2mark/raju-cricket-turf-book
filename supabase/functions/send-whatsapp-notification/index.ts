
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const SUPABASE_URL = "https://hxmgfhinrmdxgyhggtlv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4bWdmaGlucm1keGd5aGdndGx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNzA2ODksImV4cCI6MjA2MTc0NjY4OX0.RBhItW0FNqBAcgTCMPPl7DgoNvUKIgCew0KXKpmIx0s";
const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID");
const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN");
const TWILIO_FROM_NUMBER = "whatsapp:+918919878315";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": 
    "authorization, x-client-info, apikey, content-type",
};

type MessageType = "confirmation" | "reminder";

interface WhatsAppRequest {
  bookingId?: string;
  name: string;
  phoneNumber: string;
  slotTime: string;
  bookingDate: string;
  type: MessageType;
}

const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove any non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, "");
  
  // Ensure number has country code (+91 for India)
  if (cleaned.length === 10) {
    return `whatsapp:+91${cleaned}`;
  }
  
  // If already has country code
  return `whatsapp:+${cleaned}`;
};

const getMessageContent = (
  type: MessageType,
  name: string,
  slotTime: string,
  bookingDate: string
): string => {
  if (type === "confirmation") {
    return `Hi ${name}, your cricket slot at ${slotTime} on ${bookingDate} is confirmed. See you at the pitch!`;
  } else {
    return `Reminder: Your box cricket slot is today at ${slotTime}. Get ready to play!`;
  }
};

const sendWhatsAppMessage = async (
  to: string,
  body: string
): Promise<Response> => {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    throw new Error("Twilio credentials not configured");
  }
  
  const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
  
  const formData = new URLSearchParams();
  formData.append("To", to);
  formData.append("From", TWILIO_FROM_NUMBER);
  formData.append("Body", body);
  
  const auth = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);
  
  try {
    const twilioResponse = await fetch(twilioUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${auth}`,
      },
      body: formData,
    });
    
    const twilioData = await twilioResponse.json();
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
      throw new Error(`Twilio error: ${JSON.stringify(twilioData)}`);
    }
  } catch (error) {
    console.error("Failed to send WhatsApp message:", error);
    throw error;
  }
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
    
    for (const booking of bookings) {
      try {
        // Convert booking time to Date object for comparison
        const [hours, minutes] = booking.start_time.split(":");
        const bookingTime = new Date(currentDate);
        bookingTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));
        
        // Calculate time difference in minutes
        const timeDiff = (bookingTime.getTime() - currentTime.getTime()) / (1000 * 60);
        
        // If booking is 45-75 minutes from now, send reminder
        if (timeDiff >= 45 && timeDiff <= 75) {
          const toNumber = formatPhoneNumber(booking.mobile_number);
          const messageContent = getMessageContent(
            "reminder",
            booking.name,
            `${booking.start_time} - ${booking.end_time}`, 
            booking.booking_date
          );
          
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
    if (req.headers.get("x-function-source") === "scheduled") {
      await checkAndSendReminders();
      return new Response(
        JSON.stringify({ message: "Reminders processed successfully" }),
        { headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    // Handle normal message sending requests
    const { name, phoneNumber, slotTime, bookingDate, type }: WhatsAppRequest = await req.json();
    
    if (!name || !phoneNumber || !slotTime || !bookingDate || !type) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        { 
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders }
        }
      );
    }
    
    const toNumber = formatPhoneNumber(phoneNumber);
    const messageContent = getMessageContent(type, name, slotTime, bookingDate);
    
    return await sendWhatsAppMessage(toNumber, messageContent);
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
