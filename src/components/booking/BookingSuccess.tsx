
import React from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { BookingFormData } from '@/types';
import { formatDate, formatSlotTime, ADMIN_WHATSAPP_NUMBER } from '@/lib/utils';
import { generateInvoicePDF } from '@/lib/invoiceGenerator';

interface BookingSuccessProps {
  bookingData: BookingFormData;
  onResetForm: () => void;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({ 
  bookingData, 
  onResetForm 
}) => {
  const handleDownloadInvoice = () => {
    try {
      console.log("Generating invoice for booking data:", bookingData);
      if (bookingData && bookingData.slot) {
        generateInvoicePDF(bookingData);
      } else {
        console.error("Cannot generate invoice: Invalid booking data");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="mb-6">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
          <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </div>
      
      <h3 className="text-2xl font-medium text-gray-900 mb-2">Booking Successful</h3>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-gray-800 mb-2">
          Your booking has been confirmed for:
        </p>
        <p className="text-lg font-bold mb-1">{formatDate(bookingData.date)}</p>
        <p className="text-lg font-bold">{bookingData.slot ? formatSlotTime(bookingData.slot) : ''}</p>
        
        {bookingData && bookingData.slot && (
          <p className="mt-2 font-medium">Amount: ₹{bookingData.slot.price}</p>
        )}
      </div>
      
      <Alert className="mb-6 text-left">
        <AlertTitle>Next steps:</AlertTitle>
        <AlertDescription>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>A confirmation has been sent to your WhatsApp.</li>
            <li>The admin has been notified of your booking via SMS.</li>
            <li>You'll receive a reminder 1 hour before your slot time.</li>
            <li>Your invoice has been downloaded automatically.</li>
            <li>Please arrive 15 minutes before your slot time.</li>
            <li>Payment to be made at the venue.</li>
          </ul>
        </AlertDescription>
      </Alert>
      
      <p className="text-gray-500 mb-6">
        For any queries, contact: {ADMIN_WHATSAPP_NUMBER}
      </p>
      
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 justify-center">
        <Button 
          onClick={handleDownloadInvoice}
          className="flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Invoice Again
        </Button>
        
        <Button 
          onClick={onResetForm}
          variant="outline"
        >
          Make Another Booking
        </Button>
      </div>
    </div>
  );
};

export default BookingSuccess;
