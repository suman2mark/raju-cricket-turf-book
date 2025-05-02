
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isBefore, isToday, parse, set } from "date-fns";
import { SlotTime } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const TIME_SLOTS: SlotTime[] = [
  // Morning slots
  { id: "6-7", startTime: "06:00", endTime: "07:00", price: 600, isNightSession: false },
  { id: "7-8", startTime: "07:00", endTime: "08:00", price: 600, isNightSession: false },
  { id: "8-9", startTime: "08:00", endTime: "09:00", price: 600, isNightSession: false },
  { id: "9-10", startTime: "09:00", endTime: "10:00", price: 600, isNightSession: false },
  { id: "10-11", startTime: "10:00", endTime: "11:00", price: 600, isNightSession: false },
  { id: "11-12", startTime: "11:00", endTime: "12:00", price: 600, isNightSession: false },
  
  // Afternoon slots
  { id: "12-13", startTime: "12:00", endTime: "13:00", price: 600, isNightSession: false },
  { id: "13-14", startTime: "13:00", endTime: "14:00", price: 600, isNightSession: false },
  { id: "14-15", startTime: "14:00", endTime: "15:00", price: 600, isNightSession: false },
  { id: "15-16", startTime: "15:00", endTime: "16:00", price: 600, isNightSession: false },
  { id: "16-17", startTime: "16:00", endTime: "17:00", price: 600, isNightSession: false },
  { id: "17-18", startTime: "17:00", endTime: "18:00", price: 600, isNightSession: false },
  
  // Evening slots with lights (higher price)
  { id: "18-19", startTime: "18:00", endTime: "19:00", price: 700, isNightSession: true },
  { id: "19-20", startTime: "19:00", endTime: "20:00", price: 700, isNightSession: true },
  { id: "20-21", startTime: "20:00", endTime: "21:00", price: 700, isNightSession: true },
];

export function formatSlotTime(slot: SlotTime): string {
  const formatTimeString = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return `${formatTimeString(slot.startTime)} - ${formatTimeString(slot.endTime)}`;
}

export function isSlotExpired(slot: SlotTime, date: Date): boolean {
  if (!isToday(date)) {
    return false;
  }

  const now = new Date();
  const [hours, minutes] = slot.startTime.split(':');
  
  const slotTime = set(new Date(), {
    hours: parseInt(hours, 10),
    minutes: parseInt(minutes, 10),
    seconds: 0,
    milliseconds: 0
  });

  return isBefore(slotTime, now);
}

export function generateWhatsAppBookingMessage(bookingData: any): string {
  const { name, mobileNumber, players, date, slot } = bookingData;
  const formattedDate = format(date, 'dd MMM yyyy');
  const formattedSlot = formatSlotTime(slot);
  
  return encodeURIComponent(
    `*New Booking at Raju Sixer Adda*\n\n` +
    `*Name:* ${name}\n` +
    `*Mobile:* ${mobileNumber}\n` +
    `*Players:* ${players}\n` +
    `*Date:* ${formattedDate}\n` +
    `*Time:* ${formattedSlot}\n` +
    `*Price:* ₹${slot.price}`
  );
}

export function formatDate(date: Date): string {
  return format(date, 'EEEE, MMMM d, yyyy');
}

export function formatPrice(price: number): string {
  return `₹${price}`;
}
