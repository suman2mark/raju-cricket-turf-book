
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatDate, formatSlotTime } from '@/lib/utils';

interface BookingDetailsProps {
  name: string;
  setName: (name: string) => void;
  mobileNumber: string;
  setMobileNumber: (number: string) => void;
  players: number;
  setPlayers: (players: number) => void;
  date: Date;
  selectedSlot: any;
  errors: Record<string, string>;
  isSubmitting: boolean;
  translate: (key: string) => string;
  onSubmit: (e: React.FormEvent) => void;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
  name,
  setName,
  mobileNumber,
  setMobileNumber,
  players,
  setPlayers,
  date,
  selectedSlot,
  errors,
  isSubmitting,
  translate,
  onSubmit
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">{translate('booking_details')}</h3>
      <form onSubmit={onSubmit} className="space-y-4">
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
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Loading...' : translate('confirm_booking')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingDetails;
