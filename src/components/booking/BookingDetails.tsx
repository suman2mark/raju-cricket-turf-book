
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SlotTime } from '@/types';
import { formatSlotTime, formatDate } from '@/lib/utils';

interface BookingDetailsProps {
  name: string;
  setName: (name: string) => void;
  mobileNumber: string;
  setMobileNumber: (number: string) => void;
  players: number;
  setPlayers: (players: number) => void;
  date: Date;
  selectedSlot: SlotTime | null;
  couponCode?: string;
  setCouponCode?: (code: string) => void;
  isFirstBooking?: boolean;
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
  couponCode,
  setCouponCode,
  isFirstBooking,
  errors,
  isSubmitting,
  translate,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">{translate('booking_details')}</h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            {translate('name')}
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={translate('enter_name')}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="mobileNumber" className="block text-sm font-medium mb-1">
            {translate('mobile_number')}
          </label>
          <Input
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder={translate('enter_mobile')}
            className={errors.mobileNumber ? "border-red-500" : ""}
          />
          {errors.mobileNumber && <p className="mt-1 text-xs text-red-500">{errors.mobileNumber}</p>}
        </div>

        <div>
          <label htmlFor="players" className="block text-sm font-medium mb-1">
            {translate('players_count')}
          </label>
          <Input
            id="players"
            type="number"
            min="2"
            max="16"
            value={players}
            onChange={(e) => setPlayers(parseInt(e.target.value, 10))}
            className={errors.players ? "border-red-500" : ""}
          />
          {errors.players && <p className="mt-1 text-xs text-red-500">{errors.players}</p>}
          <p className="mt-1 text-xs text-gray-500">{translate('players_range')}</p>
        </div>

        {setCouponCode && (
          <div>
            <label htmlFor="couponCode" className="block text-sm font-medium mb-1">
              {translate('coupon_code')}
            </label>
            <Input
              id="couponCode"
              value={couponCode || ''}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code (e.g. WELCOME10)"
              className={errors.couponCode ? "border-red-500" : ""}
            />
            {isFirstBooking && (
              <p className="mt-1 text-xs text-green-600">First-time booking! Use code WELCOME10 for 10% off</p>
            )}
            {errors.couponCode && <p className="mt-1 text-xs text-red-500">{errors.couponCode}</p>}
          </div>
        )}

        <div className="rounded-md bg-gray-50 p-4">
          <h4 className="font-medium mb-2">{translate('booking_summary')}</h4>
          <div className="text-sm text-gray-600">
            <p>
              {translate('date')}: {formatDate(date)}
            </p>
            {selectedSlot ? (
              <>
                <p className="mt-1">
                  {translate('time')}: {formatSlotTime(selectedSlot)}
                </p>
                <p className="mt-1">
                  {translate('price')}: 
                  {isFirstBooking && couponCode === 'WELCOME10' ? (
                    <>
                      <span className="line-through ml-1">₹{selectedSlot.price}</span>
                      <span className="text-green-600 font-medium ml-1">₹{selectedSlot.price * 0.9}</span>
                      <span className="ml-1 text-xs text-green-600">(10% off)</span>
                    </>
                  ) : (
                    <span className="ml-1">₹{selectedSlot.price}</span>
                  )}
                </p>
              </>
            ) : (
              <p className="mt-1 text-amber-600">{translate('no_slot_selected')}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button
          type="submit"
          disabled={isSubmitting || !selectedSlot}
          className="w-full"
        >
          {isSubmitting ? translate('confirming') : translate('confirm_booking')}
        </Button>
      </div>
    </form>
  );
};

export default BookingDetails;
