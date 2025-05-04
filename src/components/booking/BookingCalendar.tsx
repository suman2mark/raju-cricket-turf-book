
import React from 'react';
import { Calendar } from '@/components/ui/calendar';

interface BookingCalendarProps {
  date: Date;
  onDateSelect: (date: Date | undefined) => void;
  translate: (key: string) => string;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ date, onDateSelect, translate }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">{translate('select_date')}</h3>
      <Calendar
        mode="single"
        selected={date}
        onSelect={(newDate) => {
          if (newDate) {
            onDateSelect(newDate);
          }
        }}
        disabled={{ before: new Date() }}
        className="rounded-md border shadow-sm p-3 pointer-events-auto"
      />
    </div>
  );
};

export default BookingCalendar;
