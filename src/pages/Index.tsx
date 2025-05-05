
import { useState } from 'react';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import { BookingFormData } from '@/types';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BookingForm from '@/components/BookingForm';
import Pricing from '@/components/Pricing';
import ContactSection from '@/components/ContactSection';
import LocationSection from '@/components/LocationSection';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import GroundGallery from '@/components/GroundGallery';
import Memorial from '@/components/Memorial';
import DailyBookingDashboard from '@/components/DailyBookingDashboard';
import { Toaster } from 'sonner';

// The main component that uses the language context
const MainContent = () => {
  const { translate } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle booking form submission
  const handleBookingSubmit = async (data: BookingFormData) => {
    // This is now handled in the BookingForm component
    setIsLoading(true);
    try {
      console.log('Booking data:', data);
      // Delay to simulate process completion
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Error submitting booking:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-center" />
      <Header scrollToSection={scrollToSection} />
      
      {/* Memorial placed at the top right */}
      <Memorial />
      
      <main className="flex-grow">
        {/* Hero section with the banner images */}
        <Hero scrollToSection={scrollToSection} />
        
        {/* Ground gallery section moved after hero */}
        <GroundGallery />

        {/* Add the Daily Booking Dashboard after the ground gallery */}
        <DailyBookingDashboard />
        
        <section id="booking" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{translate('booking_title')}</h2>
              <p className="text-xl text-gray-600">{translate('booking_subtitle')}</p>
            </div>
            
            <BookingForm onSubmit={handleBookingSubmit} isLoading={isLoading} />
          </div>
        </section>
        
        <Pricing />
        <ContactSection />
        <LocationSection />
      </main>
      
      <Footer scrollToSection={scrollToSection} />
      <ScrollToTop />
    </div>
  );
};

// Wrapper component that provides the language context
const Index = () => {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
};

export default Index;
