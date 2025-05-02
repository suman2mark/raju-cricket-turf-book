
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SlotTime, BookingFormData } from '@/types';
import { TIME_SLOTS, formatSlotTime, isSlotExpired, formatDate, generateWhatsAppBookingMessage } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => void;
  isLoading: boolean;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, isLoading }) => {
  const { translate } = useLanguage();
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<SlotTime | null>(null);
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [players, setPlayers] = useState<number>(2);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const formData: BookingFormData = {
        name,
        mobileNumber,
        players,
        date,
        slot: selectedSlot
      };
      
      onSubmit(formData);
      
      // Send WhatsApp message to admin
      const whatsappNumber = '8919878315';
      const messageText = generateWhatsAppBookingMessage(formData);
      window.open(`https://wa.me/${whatsappNumber}?text=${messageText}`, '_blank');
      
      // Show success toast
      toast({
        title: translate('booking_success'),
        description: `${translate('date')}: ${formatDate(date)}, ${translate('time')}: ${selectedSlot ? formatSlotTime(selectedSlot) : ''}`,
        duration: 5000,
      });
      
      // Clear form
      setName('');
      setMobileNumber('');
      setPlayers(2);
      setSelectedSlot(null);
    }
  };

  // Filter slots based on expiration for today
  const availableSlots = TIME_SLOTS.filter(slot => !isSlotExpired(slot, date));
  
  // Group slots by daytime/nighttime
  const daytimeSlots = availableSlots.filter(slot => !slot.isNightSession);
  const nighttimeSlots = availableSlots.filter(slot => slot.isNightSession);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">{translate('select_date')}</h3>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            if (newDate) {
              setDate(newDate);
              setSelectedSlot(null);
            }
          }}
          disabled={{ before: new Date() }}
          className="rounded-md border shadow-sm p-3 pointer-events-auto"
        />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">{translate('available_slots')}</h3>
        {availableSlots.length === 0 ? (
          <p className="text-gray-500">{translate('no_slots')}</p>
        ) : (
          <div className="space-y-4">
            {daytimeSlots.length > 0 && (
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-2">{translate('daytime')}</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {daytimeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      className={`time-slot ${
                        selectedSlot?.id === slot.id ? 'selected' : 'available'
                      }`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {formatSlotTime(slot)}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {nighttimeSlots.length > 0 && (
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-2">{translate('nighttime')}</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {nighttimeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      className={`time-slot ${
                        selectedSlot?.id === slot.id ? 'selected' : 'available'
                      }`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {formatSlotTime(slot)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Booking form */}
      <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
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
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : translate('confirm_booking')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
