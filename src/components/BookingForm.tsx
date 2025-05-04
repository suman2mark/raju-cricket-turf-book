
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SlotTime, BookingFormData } from '@/types';
import { formatDate, 
         formatSlotTime, 
         ADMIN_WHATSAPP_NUMBER } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { toast } from '@/components/ui/sonner';
import SlotMap from './SlotMap';
import { 
  createBooking, 
  isSlotBooked, 
  sendWhatsAppNotification, 
  formatWhatsAppNumber 
} from '@/services/bookingService';
import { generateInvoicePDF } from '@/lib/invoiceGenerator';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => void;
  isLoading: boolean;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, isLoading }) => {
  const { translate } = useLanguage();
  const { toast: hookToast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<SlotTime | null>(null);
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [players, setPlayers] = useState<number>(2);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);

  useEffect(() => {
    // Clear selected slot when date changes
    setSelectedSlot(null);
  }, [date]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = translate('required');
    }
    
    if (!mobileNumber.trim()) {
      newErrors.mobileNumber = translate('required');
    } else if (!/^\d{10}$/.test(mobileNumber)) {
      newErrors.mobileNumber = translate('invalid_mobile');
    }
    
    if (!players) {
      newErrors.players = translate('required');
    } else if (players < 2) {
      newErrors.players = translate('min_players');
    } else if (players > 16) {
      newErrors.players = translate('max_players');
    }
    
    if (!selectedSlot) {
      newErrors.slot = translate('required');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSelectSlot = async (slot: SlotTime) => {
    // Double-check if the slot is already booked
    const booked = await isSlotBooked(slot.id, date);
    if (booked) {
      toast.error("This slot has already been booked by someone else.");
      return;
    }
    setSelectedSlot(slot);
  };

  const generateWhatsAppBookingMessage = (formData: BookingFormData): string => {
    const { name, mobileNumber, players, date, slot } = formData;
    if (!slot) return '';
    
    const formattedDate = formatDate(date);
    const formattedSlot = formatSlotTime(slot);
    
    return `*New Booking at Raju Sixer Adda*\n\n` +
      `*Name:* ${name}\n` +
      `*Mobile:* ${mobileNumber}\n` +
      `*Players:* ${players}\n` +
      `*Date:* ${formattedDate}\n` +
      `*Time:* ${formattedSlot}\n` +
      `*Price:* ₹${slot.price}`;
  };

  const getConfirmationMessage = (formData: BookingFormData): string => {
    if (!formData.slot) return '';
    
    const { name, date, slot } = formData;
    const formattedDate = formatDate(date);
    const formattedSlot = formatSlotTime(slot);

    return `*Booking Confirmation - Raju Sixer Adda*\n\n` +
      `Hello ${name},\n\n` +
      `Your booking has been confirmed!\n\n` +
      `*Date:* ${formattedDate}\n` +
      `*Time:* ${formattedSlot}\n` +
      `*Price:* ₹${slot.price}\n\n` +
      `Thank you for choosing Raju Sixer Adda!\n` +
      `For any queries, please contact: ${ADMIN_WHATSAPP_NUMBER}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitLoading(true);
      
      const formData: BookingFormData = {
        name,
        mobileNumber,
        players,
        date,
        slot: selectedSlot
      };
      
      try {
        // Create booking in database
        await createBooking(formData);
        
        // Store booking data for success screen
        setBookingData(formData);
        
        // Send WhatsApp message to admin
        const adminMessageText = generateWhatsAppBookingMessage(formData);
        sendWhatsAppNotification(ADMIN_WHATSAPP_NUMBER, adminMessageText);
        
        // Generate and download PDF invoice
        generateInvoicePDF(formData);
        
        // Call the original onSubmit if needed
        onSubmit(formData);
        
        // Show success message
        toast.success('Booking Successful!', {
          description: `Your slot has been booked for ${formatDate(date)}`,
          duration: 5000,
        });
        
        hookToast({
          title: translate('booking_success'),
          description: `${translate('date')}: ${formatDate(date)}, ${translate('time')}: ${selectedSlot ? formatSlotTime(selectedSlot) : ''}`,
          duration: 5000,
        });
        
        setBookingSuccess(true);
        
      } catch (error: any) {
        // Show error message
        toast.error('Booking Failed', {
          description: error.message || 'Failed to create booking. Please try again.',
          duration: 5000,
        });
      } finally {
        setSubmitLoading(false);
      }
    }
  };

  const handleDownloadInvoice = () => {
    if (bookingData) {
      generateInvoicePDF(bookingData);
    }
  };

  // Show success screen if booking was successful
  if (bookingSuccess && bookingData) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        
        <h3 className="text-2xl font-medium text-gray-900 mb-2">{translate('booking_success')}</h3>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-gray-800 mb-2">
            Your booking has been confirmed for:
          </p>
          <p className="text-lg font-bold mb-1">{formatDate(date)}</p>
          <p className="text-lg font-bold">{selectedSlot ? formatSlotTime(selectedSlot) : ''}</p>
          
          {bookingData && bookingData.slot && (
            <p className="mt-2 font-medium">Amount: ₹{bookingData.slot.price}</p>
          )}
        </div>
        
        <Alert className="mb-6 text-left">
          <AlertTitle>Next steps:</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>A confirmation has been sent to the admin via WhatsApp.</li>
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
            onClick={() => setBookingSuccess(false)}
            variant="outline"
          >
            Make Another Booking
          </Button>
        </div>
      </div>
    );
  }

  // Show booking form if no successful booking yet
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">{translate('select_date')}</h3>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              if (newDate) {
                setDate(newDate);
              }
            }}
            disabled={{ before: new Date() }}
            className="rounded-md border shadow-sm p-3 pointer-events-auto"
          />
        </div>
        
        <SlotMap 
          date={date}
          onSelectSlot={handleSelectSlot}
          selectedSlot={selectedSlot}
        />
      </div>
      
      {/* Booking form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">{translate('booking_details')}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{translate('name')}</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={translate('name')}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mobileNumber">{translate('mobile_number')}</Label>
              <Input
                id="mobileNumber"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="10-digit mobile number"
                type="tel"
              />
              {errors.mobileNumber && <p className="text-sm text-red-500">{errors.mobileNumber}</p>}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="players">{translate('players')}</Label>
            <Input
              id="players"
              value={players}
              onChange={(e) => setPlayers(parseInt(e.target.value) || 0)}
              type="number"
              min={2}
              max={16}
            />
            {errors.players && <p className="text-sm text-red-500">{errors.players}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{translate('date')}</Label>
              <p className="p-2 border rounded-md bg-gray-50">{formatDate(date)}</p>
            </div>
            
            <div className="space-y-2">
              <Label>{translate('time')}</Label>
              {selectedSlot ? (
                <p className="p-2 border rounded-md bg-gray-50">
                  {formatSlotTime(selectedSlot)} - {formatDate(date)}
                </p>
              ) : (
                <p className="p-2 border rounded-md bg-gray-50 text-gray-400">
                  {translate('select_date')}
                </p>
              )}
              {errors.slot && <p className="text-sm text-red-500">{errors.slot}</p>}
            </div>
          </div>
          
          <div className="pt-4">
            <p className="text-sm text-gray-600 mb-4">
              {translate('payment_info')}
            </p>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white py-6"
              disabled={submitLoading || isLoading}
            >
              {submitLoading || isLoading ? 'Loading...' : translate('confirm_booking')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
