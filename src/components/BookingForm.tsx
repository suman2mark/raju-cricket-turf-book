
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SlotTime, BookingFormData } from '@/types';
import { formatSlotTime, ADMIN_WHATSAPP_NUMBER, formatDate } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { toast } from '@/components/ui/sonner';
import SlotMap from './SlotMap';
import { 
  createBooking, 
  isSlotBooked, 
  sendWhatsAppNotification
} from '@/services/bookingService';
import { generateInvoicePDF } from '@/lib/invoiceGenerator';
import { BookingCalendar, BookingDetails, BookingSuccess } from './booking';

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
    try {
      const booked = await isSlotBooked(slot.id, date);
      if (booked) {
        toast.error("This slot has already been booked by someone else.");
        return;
      }
      setSelectedSlot(slot);
    } catch (error) {
      console.error("Error checking slot availability:", error);
      toast.error("Failed to check slot availability");
    }
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
        console.log("Creating booking with data:", formData);
        
        // Create booking in database
        await createBooking(formData);
        
        // Store booking data for success screen
        setBookingData(formData);
        
        // Send WhatsApp message to admin
        try {
          const adminMessageText = getConfirmationMessage(formData);
          sendWhatsAppNotification(ADMIN_WHATSAPP_NUMBER, adminMessageText);
        } catch (whatsappError) {
          console.error("Error sending WhatsApp notification:", whatsappError);
        }
        
        try {
          // Generate and download PDF invoice
          generateInvoicePDF(formData);
        } catch (pdfError) {
          console.error("Error generating PDF:", pdfError);
        }
        
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
        console.error("Booking error:", error);
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

  const resetForm = () => {
    setBookingSuccess(false);
    setSelectedSlot(null);
    setName('');
    setMobileNumber('');
    setPlayers(2);
  };

  // Show success screen if booking was successful
  if (bookingSuccess && bookingData) {
    return <BookingSuccess bookingData={bookingData} onResetForm={resetForm} />;
  }

  // Show booking form if no successful booking yet
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BookingCalendar 
          date={date} 
          onDateSelect={(newDate) => newDate && setDate(newDate)} 
          translate={translate}
        />
        
        <SlotMap 
          date={date}
          onSelectSlot={handleSelectSlot}
          selectedSlot={selectedSlot}
        />
      </div>
      
      <BookingDetails 
        name={name}
        setName={setName}
        mobileNumber={mobileNumber}
        setMobileNumber={setMobileNumber}
        players={players}
        setPlayers={setPlayers}
        date={date}
        selectedSlot={selectedSlot}
        errors={errors}
        isSubmitting={submitLoading || isLoading}
        translate={translate}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default BookingForm;
