
import { BookingFormData } from '@/types';
import { formatDate, formatSlotTime } from './utils';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Extend the jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export function generateInvoicePDF(bookingData: BookingFormData): void {
  if (!bookingData.slot) return;
  
  // Initialize PDF document
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.text("Raju Sixer Adda - Booking Confirmation", 105, 20, { align: 'center' });
  
  // Add logo or header image if available
  // doc.addImage(logoBase64, 'PNG', 10, 10, 30, 30);
  
  // Add booking reference and date
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`Booking ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}`, 20, 40);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 48);
  
  // Add customer details
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("Customer Information", 20, 60);
  
  doc.setFontSize(12);
  doc.text(`Name: ${bookingData.name}`, 20, 70);
  doc.text(`Mobile: ${bookingData.mobileNumber}`, 20, 78);
  doc.text(`Players: ${bookingData.players}`, 20, 86);
  
  // Add booking details
  doc.setFontSize(14);
  doc.text("Booking Details", 20, 100);
  
  doc.setFontSize(12);
  doc.text(`Date: ${formatDate(bookingData.date)}`, 20, 110);
  doc.text(`Time: ${formatSlotTime(bookingData.slot)}`, 20, 118);
  doc.text(`Type: ${bookingData.slot.isNightSession ? 'Night Session (with lights)' : 'Day Session'}`, 20, 126);
  
  // Add payment information
  doc.setFontSize(14);
  doc.text("Payment Details", 20, 140);
  
  const subtotal = bookingData.slot.price;
  const gstRate = 18; // 18% GST
  const gstAmount = (subtotal * gstRate) / 100;
  const total = subtotal + gstAmount;
  
  // Create a table for payment details
  (doc as any).autoTable({
    startY: 150,
    head: [['Description', 'Amount']],
    body: [
      ['Slot Charge', `₹${subtotal.toFixed(2)}`],
      [`GST (${gstRate}%)`, `₹${gstAmount.toFixed(2)}`],
      ['Total', `₹${total.toFixed(2)}`]
    ],
    theme: 'striped',
    headStyles: { fillColor: [39, 174, 96] },
    foot: [['Payment Status', 'To be paid at venue']],
    footStyles: { fillColor: [255, 165, 0], textColor: [0, 0, 0] }
  });
  
  // Add terms and conditions
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.text("Terms & Conditions", 20, finalY);
  
  doc.setFontSize(10);
  doc.text("1. Please arrive 15 minutes before your scheduled time.", 20, finalY + 10);
  doc.text("2. Bring your own cricket equipment. We provide the pitch and stumps.", 20, finalY + 18);
  doc.text("3. In case of cancellation, please inform us 2 hours in advance.", 20, finalY + 26);
  doc.text("4. Payment to be made at the venue before starting the game.", 20, finalY + 34);
  
  // Add footer with contact
  doc.setFontSize(10);
  doc.text("Raju Sixer Adda - Dwarapudi, Vizianagaram", 105, 280, { align: 'center' });
  doc.text("Contact: 9701399366", 105, 286, { align: 'center' });
  
  // Save the PDF with a filename based on booking details
  const fileName = `RajuSixerAdda_Booking_${format(bookingData.date, 'yyyyMMdd')}_${bookingData.slot.id}.pdf`;
  doc.save(fileName);
}
