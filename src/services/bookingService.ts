
import { supabase } from '@/integrations/supabase/client';
import { BookingFormData, SlotTime } from '@/types';
import { format } from 'date-fns';

// Check if a slot is already booked for a specific date
export async function isSlotBooked(slotId: string, bookingDate: Date): Promise<boolean> {
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
}

// Create a new booking
export async function createBooking(bookingData: BookingFormData): Promise<{ id: string }> {
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
    throw new Error('Failed to create booking');
  }
  
  return data;
}

// Get all bookings for a specific date
export async function getBookingsForDate(date: Date): Promise<any[]> {
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
}

// Helper function to format WhatsApp number correctly
export function formatWhatsAppNumber(number: string): string {
  // Remove any non-numeric characters
  const cleanNumber = number.replace(/\D/g, '');
  
  // If the number doesn't have a country code, add Indian code (91)
  if (cleanNumber.length === 10) {
    return `91${cleanNumber}`;
  }
  
  return cleanNumber;
}

// Send WhatsApp notification directly with proper formatting
export function sendWhatsAppNotification(to: string, message: string): boolean {
  try {
    const formattedNumber = formatWhatsAppNumber(to);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedNumber}&text=${encodedMessage}`;
    
    // Open in new tab for admin notifications
    window.open(whatsappUrl, '_blank');
    return true;
  } catch (error) {
    console.error("Failed to send WhatsApp notification:", error);
    return false;
  }
}
