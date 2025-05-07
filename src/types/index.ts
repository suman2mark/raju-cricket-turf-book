
export type SlotTime = {
  id: string;
  startTime: string;
  endTime: string;
  price: number;
  isNightSession: boolean;
};

export type BookingFormData = {
  name: string;
  mobileNumber: string;
  players: number;
  date: Date;
  slot: SlotTime | null;
  couponCode?: string;
};

export type BookingData = BookingFormData & {
  id: string;
  createdAt: Date;
};

export type SlotStatus = 'available' | 'booked' | 'expired';

export type SlotWithStatus = SlotTime & {
  status: SlotStatus;
};
