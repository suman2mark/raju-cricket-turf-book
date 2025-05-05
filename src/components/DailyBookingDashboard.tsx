
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatSlotTime } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Calendar, RefreshCw } from 'lucide-react';

// Define the booking data type
type DailyBooking = {
  id: string;
  name: string;
  mobile_number: string;
  players: number;
  booking_date: string;
  start_time: string;
  end_time: string;
  is_night_session: boolean;
  slot_id: string;
};

const DailyBookingDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<DailyBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const isMobile = useIsMobile();
  
  const fetchTodayBookings = async () => {
    try {
      setRefreshing(true);
      // Get today's date in YYYY-MM-DD format
      const today = format(new Date(), 'yyyy-MM-dd');
      
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('booking_date', today)
        .order('start_time', { ascending: true });
      
      if (error) {
        console.error('Error fetching today\'s bookings:', error);
        return;
      }
      
      setBookings(data as DailyBooking[]);
    } catch (error) {
      console.error('Exception fetching today\'s bookings:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  useEffect(() => {
    fetchTodayBookings();
    
    // Set up a refresh interval (every hour)
    const refreshInterval = setInterval(fetchTodayBookings, 3600000);
    
    return () => clearInterval(refreshInterval);
  }, []);
  
  const handleRefresh = () => {
    fetchTodayBookings();
  };
  
  const formatTimeDisplay = (startTime: string, endTime: string) => {
    return `${startTime} - ${endTime}`;
  };
  
  return (
    <section id="daily-bookings" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <Calendar className="mr-2 h-8 w-8 text-primary" />
              Today's Slot Bookings
            </h2>
            <p className="text-gray-600 mt-1">
              {format(new Date(), 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
          
          <button 
            onClick={handleRefresh} 
            className="flex items-center justify-center px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-md transition-colors"
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : bookings.length > 0 ? (
          isMobile ? (
            <div className="grid grid-cols-1 gap-4">
              {bookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                  <CardHeader className="bg-white pb-2">
                    <CardTitle className="text-lg">{booking.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                        {booking.players} players
                      </span>
                      {booking.is_night_session && (
                        <span className="ml-2 inline-block px-2 py-1 text-xs rounded-full bg-accent/10 text-accent">
                          Night Session
                        </span>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="text-sm text-gray-500 mb-1">
                      <strong>Time:</strong> {formatTimeDisplay(booking.start_time, booking.end_time)}
                    </div>
                    <div className="text-sm text-gray-500">
                      <strong>Contact:</strong> {booking.mobile_number}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Time Slot</TableHead>
                    <TableHead>Players</TableHead>
                    <TableHead>Session Type</TableHead>
                    <TableHead>Contact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.name}</TableCell>
                      <TableCell>{formatTimeDisplay(booking.start_time, booking.end_time)}</TableCell>
                      <TableCell>{booking.players}</TableCell>
                      <TableCell>
                        {booking.is_night_session ? (
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-accent/10 text-accent">
                            Night Session
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Day Session
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{booking.mobile_number}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )
        ) : (
          <Card className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-500 mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Bookings Today</h3>
              <p className="text-gray-500">
                There are no bookings scheduled for today. Check back later!
              </p>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};

export default DailyBookingDashboard;
