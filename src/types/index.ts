
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
};

export type BookingData = BookingFormData & {
  id: string;
  createdAt: Date;
};
