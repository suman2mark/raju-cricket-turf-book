
import { supabase } from '@/integrations/supabase/client';
import { BookingFormData, SlotTime } from '@/types';
import { format } from 'date-fns';

// Check if a slot is already booked for a specific date
export async function isSlotBooked(slotId: string, bookingDate: Date): Promise<boolean> {
  try {
    const formattedDate = format(bookingDate, 'yyyy-MM-dd');
    
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('slot_id', slotId)
      .eq('booking_date', formattedDate);
    
    if (error) {
      console.error('Error checking slot availability:', error);
      throw new Error('Failed to check slot availability');
    }
    
    return data && data.length > 0;
  } catch (error) {
    console.error('Exception checking slot availability:', error);
    throw new Error('Failed to check slot availability');
  }
}

// Send WhatsApp notification using the Supabase Edge Function
export async function sendWhatsAppNotification(
  bookingData: BookingFormData, 
  type: 'confirmation' | 'reminder'
): Promise<boolean> {
  try {
    if (!bookingData.slot) {
      console.error("Cannot send WhatsApp notification: Missing slot data");
      return false;
    }

    const formattedDate = format(bookingData.date, 'yyyy-MM-dd');
    const slotTime = `${bookingData.slot.startTime} - ${bookingData.slot.endTime}`;

    // Format the phone number to ensure international format
    const formattedPhoneNumber = formatWhatsAppNumber(bookingData.mobileNumber);
    
    console.log("Sending WhatsApp notification to:", formattedPhoneNumber);
    console.log("Notification type:", type);
    console.log("Slot time:", slotTime);
    console.log("Booking date:", formattedDate);
    console.log("Player count:", bookingData.players);

    const response = await fetch(
      'https://hxmgfhinrmdxgyhggtlv.supabase.co/functions/v1/send-whatsapp-notification',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bookingData.name,
          phoneNumber: formattedPhoneNumber,
          slotTime: slotTime,
          bookingDate: formattedDate,
          players: bookingData.players,
          type: type
        })
      }
    );

    const responseText = await response.text();
    console.log("WhatsApp notification raw response:", responseText);
    
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse response JSON:", e);
      console.log("Raw response was:", responseText);
      return false;
    }

    if (!response.ok) {
      console.error('WhatsApp notification failed:', result);
      return false;
    }

    console.log('WhatsApp notification sent successfully:', result);
    return true;
  } catch (error) {
    console.error("Failed to send WhatsApp notification:", error);
    return false;
  }
}

// Create a new booking
export async function createBooking(bookingData: BookingFormData): Promise<{ id: string }> {
  try {
    if (!bookingData.slot) {
      throw new Error('No slot selected');
    }
    
    const formattedDate = format(bookingData.date, 'yyyy-MM-dd');
    
    // Check again right before inserting to prevent race conditions
    const isAlreadyBooked = await isSlotBooked(bookingData.slot.id, bookingData.date);
    if (isAlreadyBooked) {
      throw new Error('This slot has just been booked by someone else. Please select another slot.');
    }
    
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        name: bookingData.name,
        mobile_number: bookingData.mobileNumber,
        players: bookingData.players,
        booking_date: formattedDate,
        slot_id: bookingData.slot.id,
        start_time: bookingData.slot.startTime,
        end_time: bookingData.slot.endTime,
        is_night_session: bookingData.slot.isNightSession
      })
      .select('id')
      .single();
    
    if (error) {
      console.error('Error creating booking:', error);
      throw new Error('Failed to create booking: ' + error.message);
    }
    
    if (!data) {
      throw new Error('Failed to create booking: No data returned');
    }

    // Send WhatsApp confirmation after successful booking
    try {
      console.log("Attempting to send WhatsApp confirmation for booking:", data.id);
      const notificationSent = await sendWhatsAppNotification(bookingData, 'confirmation');
      if (notificationSent) {
        console.log("WhatsApp confirmation sent successfully");
      } else {
        console.error("WhatsApp notification failed to send");
      }
    } catch (whatsAppError) {
      console.error('WhatsApp notification error:', whatsAppError);
      // Don't fail the booking if the notification fails
    }
    
    return data;
  } catch (error: any) {
    console.error('Exception creating booking:', error);
    throw new Error(error.message || 'Failed to create booking');
  }
}

// Get all bookings for a specific date
export async function getBookingsForDate(date: Date): Promise<any[]> {
  try {
    const formattedDate = format(date, 'yyyy-MM-dd');
    
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('booking_date', formattedDate);
    
    if (error) {
      console.error('Error fetching bookings:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Exception fetching bookings:', error);
    return [];
  }
}

// Helper function to format WhatsApp number correctly
export function formatWhatsAppNumber(number: string): string {
  // Remove any non-numeric characters
  const cleanNumber = number.replace(/\D/g, '');
  
  // If the number doesn't have a country code, add Indian code (91)
  if (cleanNumber.length === 10) {
    return `91${cleanNumber}`;
  }
  
  // If the number already has a country code (91), return it as-is
  if (cleanNumber.startsWith('91') && cleanNumber.length === 12) {
    return cleanNumber;
  }
  
  // For any other case, just return the cleaned number
  return cleanNumber;
}
