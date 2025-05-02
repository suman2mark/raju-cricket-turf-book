
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
    // In a real application, this would save the data to Supabase
    setIsLoading(true);
    
    // Simulate API call with a delay
    try {
      // For demonstration purposes only
      console.log('Booking data:', data);
      
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (error) {
      console.error('Error submitting booking:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header scrollToSection={scrollToSection} />
      
      <main className="flex-grow">
        <Hero scrollToSection={scrollToSection} />
        
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
