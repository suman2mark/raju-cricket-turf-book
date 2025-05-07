
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
  hasBookedBefore
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
  const [couponCode, setCouponCode] = useState<string>('');
  const [isFirstBooking, setIsFirstBooking] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);

  useEffect(() => {
    // Clear selected slot when date changes
    setSelectedSlot(null);
  }, [date]);

  // Check if user is making their first booking when mobile number changes
  useEffect(() => {
    const checkFirstBooking = async () => {
      if (mobileNumber && mobileNumber.length === 10) {
        try {
          const hadPreviousBooking = await hasBookedBefore(mobileNumber);
          setIsFirstBooking(!hadPreviousBooking);
          
          // Auto-fill coupon code for first-time users
          if (!hadPreviousBooking && !couponCode) {
            setCouponCode('WELCOME10');
          }
        } catch (error) {
          console.error("Error checking booking history:", error);
        }
      }
    };
    
    checkFirstBooking();
  }, [mobileNumber]);

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
    
    // Validate coupon code if provided
    if (couponCode && couponCode !== 'WELCOME10') {
      newErrors.couponCode = 'Invalid coupon code';
    }
    
    // Check if user is eligible for the coupon
    if (couponCode === 'WELCOME10' && !isFirstBooking) {
      newErrors.couponCode = 'This coupon is for first-time customers only';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitLoading(true);
      
      const formData: BookingFormData = {
        name,
        mobileNumber,
        players,
        date,
        slot: selectedSlot,
        couponCode: couponCode || undefined
      };
      
      try {
        console.log("Creating booking with data:", formData);
        
        // Create booking in database
        await createBooking(formData);
        
        // Store booking data for success screen
        setBookingData(formData);
        
        // Call the original onSubmit if needed
        onSubmit(formData);
        
        // Show success message with WhatsApp notification info
        toast.success('Booking Successful!', {
          description: `Your slot has been booked for ${formatDate(date)}. A confirmation has been sent to your WhatsApp.`,
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
    setCouponCode('');
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
        couponCode={couponCode}
        setCouponCode={setCouponCode}
        isFirstBooking={isFirstBooking}
        errors={errors}
        isSubmitting={submitLoading || isLoading}
        translate={translate}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default BookingForm;
