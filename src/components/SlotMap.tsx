
import { useEffect, useState } from 'react';
import { SlotTime, SlotWithStatus } from '@/types';
import { formatSlotTime, isSlotExpired, getSlotColor, TIME_SLOTS } from '@/lib/utils';
import { getBookingsForDate } from '@/services/bookingService';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface SlotMapProps {
  date: Date;
  onSelectSlot: (slot: SlotTime) => void;
  selectedSlot: SlotTime | null;
}

const SlotMap = ({ date, onSelectSlot, selectedSlot }: SlotMapProps) => {
  const [slots, setSlots] = useState<SlotWithStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch bookings and update slot status
  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const bookings = await getBookingsForDate(date);
      
      // Map slots with their status
      const updatedSlots = TIME_SLOTS.map(slot => {
        // Check if slot is booked
        const isBooked = bookings.some(booking => booking.slot_id === slot.id);
        
        // Check if slot is expired
        const expired = isSlotExpired(slot, date);
        
        let status: 'available' | 'booked' | 'expired' = 'available';
        if (expired) status = 'expired';
        else if (isBooked) status = 'booked';
        
        return { ...slot, status };
      });
      
      setSlots(updatedSlots);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Subscribe to booking changes
  useEffect(() => {
    fetchBookings();
    
    // Set up realtime subscription
    const formattedDate = format(date, 'yyyy-MM-dd');
    const channel = supabase
      .channel('booking-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'bookings',
          filter: `booking_date=eq.${formattedDate}`
        }, 
        () => {
          // Refetch bookings when there are changes
          fetchBookings();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [date]);

  // Group slots by session type
  const morningSlots = slots.filter(slot => 
    !slot.isNightSession && parseInt(slot.startTime.split(':')[0]) < 12);
  
  const afternoonSlots = slots.filter(slot => 
    !slot.isNightSession && parseInt(slot.startTime.split(':')[0]) >= 12);
  
  const eveningSlots = slots.filter(slot => 
    slot.isNightSession);

  const renderSlotGroup = (title: string, slotGroup: SlotWithStatus[]) => (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">{title}</h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {slotGroup.map((slot) => (
          <button
            key={slot.id}
            onClick={() => slot.status === 'available' && onSelectSlot(slot)}
            disabled={slot.status !== 'available'}
            className={`
              ${getSlotColor(slot.status)}
              ${selectedSlot?.id === slot.id ? 'ring-2 ring-blue-500' : ''}
              px-3 py-2 text-xs md:text-sm rounded border flex flex-col items-center justify-center h-20
              transition-all duration-200 ease-in-out
            `}
          >
            <span className="font-semibold">{formatSlotTime(slot)}</span>
            {slot.status === 'booked' && <span className="text-xs mt-1">Booked</span>}
            {slot.status === 'expired' && <span className="text-xs mt-1">Expired</span>}
            {slot.status === 'available' && (
              <span className="text-xs mt-1">₹{slot.price}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <p>Loading slots...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Available Slots for {format(date, 'EEEE, MMMM d')}</h2>
      
      {morningSlots.length > 0 && renderSlotGroup('Morning', morningSlots)}
      {afternoonSlots.length > 0 && renderSlotGroup('Afternoon', afternoonSlots)}
      {eveningSlots.length > 0 && renderSlotGroup('Evening (with Lights)', eveningSlots)}
      
      {slots.every(slot => slot.status !== 'available') && (
        <div className="text-center py-4 bg-yellow-50 rounded-lg">
          <p className="text-yellow-800">No available slots for this date.</p>
          <p className="text-sm text-yellow-700">Please select another date.</p>
        </div>
      )}
    </div>
  );
};

export default SlotMap;
