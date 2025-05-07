
import { BookingFormData } from '@/types';
import { formatDate, formatSlotTime } from './utils';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function generateInvoicePDF(bookingData: BookingFormData): void {
  if (!bookingData.slot) return;
  
  // Initialize PDF document
  const doc = new jsPDF();
  
  // Define colors
  const primaryColor = '#4CAF50';
  const accentColor = '#1A237E';
  const lightGray = '#f3f3f3';
  const darkGray = '#555555';
  
  // Add header with background
  doc.setFillColor(primaryColor);
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), 40, 'F');
  
  // Add title
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text("Raju Sixer Adda", 105, 20, { align: 'center' });
  doc.setFontSize(14);
  doc.text("Booking Confirmation", 105, 30, { align: 'center' });
  
  // Add booking reference and date
  doc.setFontSize(10);
  doc.setTextColor(darkGray);
  
  // Add decorative element
  doc.setDrawColor(accentColor);
  doc.setLineWidth(0.5);
  doc.line(20, 50, 190, 50);
  
  const bookingId = Math.random().toString(36).substr(2, 9).toUpperCase();
  
  // Add reference section with better design
  doc.setFillColor(lightGray);
  doc.roundedRect(20, 55, 170, 20, 3, 3, 'F');
  doc.setTextColor(darkGray);
  doc.setFontSize(11);
  doc.text(`Booking ID: ${bookingId}`, 25, 65);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 25, 72);
  
  // Add customer details
  doc.setFontSize(14);
  doc.setTextColor(primaryColor);
  doc.text("Customer Information", 20, 90);
  
  doc.setDrawColor(primaryColor);
  doc.setLineWidth(0.3);
  doc.line(20, 92, 95, 92);
  
  doc.setFontSize(11);
  doc.setTextColor(darkGray);
  doc.text(`Name: ${bookingData.name}`, 20, 100);
  doc.text(`Mobile: ${bookingData.mobileNumber}`, 20, 108);
  doc.text(`Players: ${bookingData.players}`, 20, 116);
  
  // Add booking details
  doc.setFontSize(14);
  doc.setTextColor(primaryColor);
  doc.text("Booking Details", 20, 130);
  
  doc.setDrawColor(primaryColor);
  doc.setLineWidth(0.3);
  doc.line(20, 132, 85, 132);
  
  doc.setFontSize(11);
  doc.setTextColor(darkGray);
  doc.text(`Date: ${formatDate(bookingData.date)}`, 20, 140);
  doc.text(`Time: ${formatSlotTime(bookingData.slot)}`, 20, 148);
  doc.text(`Type: ${bookingData.slot.isNightSession ? 'Night Session (with lights)' : 'Day Session'}`, 20, 156);
  
  // Add payment information
  doc.setFontSize(14);
  doc.setTextColor(primaryColor);
  doc.text("Payment Details", 20, 170);
  
  doc.setDrawColor(primaryColor);
  doc.setLineWidth(0.3);
  doc.line(20, 172, 85, 172);
  
  const subtotal = bookingData.slot.price;
  
  // Calculate discount if coupon is applied
  let discountAmount = 0;
  if (bookingData.couponCode === 'WELCOME10') {
    discountAmount = subtotal * 0.1;
  }
  
  const total = subtotal - discountAmount;
  
  // Create a table for payment details using autoTable with improved styling
  const tableBody = [
    ['Slot Charge', `₹${subtotal.toFixed(2)}`]
  ];
  
  // Add discount row if applicable
  if (discountAmount > 0) {
    tableBody.push([`Discount (${bookingData.couponCode})`, `-₹${discountAmount.toFixed(2)}`]);
  }
  
  tableBody.push(['Total Amount', `₹${total.toFixed(2)}`]);
  
  // Create the table with improved styling
  autoTable(doc, {
    startY: 180,
    head: [['Description', 'Amount']],
    body: tableBody,
    theme: 'grid',
    headStyles: { 
      fillColor: [74, 175, 80], 
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'center'
    },
    alternateRowStyles: {
      fillColor: [240, 248, 240]
    },
    foot: [['Payment Status', 'To be paid at venue']],
    footStyles: { 
      fillColor: [26, 35, 126], 
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'center'
    }
  });
  
  // Add terms and conditions with better formatting
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  
  // Add a background for terms section
  doc.setFillColor(lightGray);
  doc.roundedRect(20, finalY, 170, 50, 3, 3, 'F');
  
  doc.setFontSize(12);
  doc.setTextColor(accentColor);
  doc.text("Terms & Conditions", 105, finalY + 8, { align: 'center' });
  
  doc.setFontSize(9);
  doc.setTextColor(darkGray);
  doc.text("1. Please arrive 15 minutes before your scheduled time.", 25, finalY + 18);
  doc.text("2. Bring your own cricket equipment. We provide the pitch and stumps.", 25, finalY + 26);
  doc.text("3. In case of cancellation, please inform us 2 hours in advance.", 25, finalY + 34);
  doc.text("4. Payment to be made at the venue before starting the game.", 25, finalY + 42);
  
  // Add footer with contact info and decorative element
  doc.setFillColor(primaryColor);
  doc.rect(0, doc.internal.pageSize.getHeight() - 25, doc.internal.pageSize.getWidth(), 25, 'F');
  
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text("Raju Sixer Adda - Dwarapudi, Vizianagaram", 105, doc.internal.pageSize.getHeight() - 15, { align: 'center' });
  doc.text("Contact: 9701399366", 105, doc.internal.pageSize.getHeight() - 9, { align: 'center' });
  
  // Save the PDF with a filename based on booking details
  const fileName = `RajuSixerAdda_Booking_${bookingData.date.toISOString().split('T')[0]}_${bookingData.slot.id}.pdf`;
  doc.save(fileName);
}
