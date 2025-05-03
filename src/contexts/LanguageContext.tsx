
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'english' | 'telugu';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  translate: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  "home": {
    english: "Home",
    telugu: "హోమ్"
  },
  "book": {
    english: "Book Now",
    telugu: "బుక్ చేయండి"
  },
  "pricing": {
    english: "Pricing",
    telugu: "ధరలు"
  },
  "contact": {
    english: "Contact",
    telugu: "సంప్రదించండి"
  },
  "location": {
    english: "Location",
    telugu: "స్థానం"
  },
  // Hero section
  "hero_title": {
    english: "Raju Sixer Adda",
    telugu: "రాజు సిక్సర్ అడ్డా"
  },
  "hero_subtitle": {
    english: "Premium Cricket Turf in Dwarapudi",
    telugu: "ద్వారపూడిలో ప్రీమియం క్రికెట్ టర్ఫ్"
  },
  "book_now": {
    english: "Book Now",
    telugu: "ఇప్పుడే బుక్ చేయండి"
  },
  "view_slots": {
    english: "View Available Slots",
    telugu: "అందుబాటులో ఉన్న స్లాట్లను వీక్షించండి"
  },
  // Booking section
  "booking_title": {
    english: "Book Your Slot",
    telugu: "మీ స్లాట్‌ని బుక్ చేయండి"
  },
  "booking_subtitle": {
    english: "Select date and time to book the cricket turf",
    telugu: "క్రికెట్ టర్ఫ్‌ని బుక్ చేయడానికి తేదీ మరియు సమయాన్ని ఎంచుకోండి"
  },
  "select_date": {
    english: "Select Date",
    telugu: "తేదీని ఎంచుకోండి"
  },
  "available_slots": {
    english: "Available Slots",
    telugu: "అందుబాటులో ఉన్న స్లాట్‌లు"
  },
  "no_slots": {
    english: "No available slots for selected date",
    telugu: "ఎంచుకున్న తేదీకి అందుబాటులో స్లాట్‌లు లేవు"
  },
  "daytime": {
    english: "Daytime",
    telugu: "పగటిపూట"
  },
  "nighttime": {
    english: "Nighttime",
    telugu: "రాత్రిపూట"
  },
  // Form fields
  "name": {
    english: "Name",
    telugu: "పేరు"
  },
  "mobile_number": {
    english: "Mobile Number",
    telugu: "మొబైల్ నంబర్"
  },
  "players": {
    english: "Number of Players",
    telugu: "ప్లేయర్ల సంఖ్య"
  },
  "date": {
    english: "Date",
    telugu: "తేదీ"
  },
  "time": {
    english: "Time",
    telugu: "సమయం"
  },
  "confirm_booking": {
    english: "Confirm Booking",
    telugu: "బుకింగ్‌ని నిర్ధారించండి"
  },
  "booking_details": {
    english: "Booking Details",
    telugu: "బుకింగ్ వివరాలు"
  },
  // Pricing section
  "pricing_title": {
    english: "Our Pricing",
    telugu: "మా ధరలు"
  },
  "pricing_subtitle": {
    english: "Affordable rates for all cricket enthusiasts",
    telugu: "అందరికీ అందుబాటులో ఉండే ధరలు"
  },
  "hourly_booking": {
    english: "Hourly Booking",
    telugu: "గంటకు బుకింగ్"
  },
  "daytime_rate": {
    english: "Daytime (6 AM – 6 PM): ₹600/hour",
    telugu: "పగటిపూట (ఉదయం 6 - సాయంత్రం 6): ₹600/గంట"
  },
  "nighttime_rate": {
    english: "Nighttime with lights (6 PM – 9 PM): ₹700/hour",
    telugu: "లైట్లతో రాత్రిపూట (సాయంత్రం 6 - రాత్రి 9): ₹700/గంట"
  },
  "tournament_title": {
    english: "Tournament Booking",
    telugu: "టోర్నమెంట్ బుకింగ్"
  },
  "tournament_rate": {
    english: "9 AM – 6 PM: ₹7,999",
    telugu: "ఉదయం 9 - సాయంత్రం 6: ₹7,999"
  },
  "tournament_contact": {
    english: "For Tournament Bookings, please contact: 9701399366",
    telugu: "టోర్నమెంట్ బుకింగ్ల కోసం, దయచేసి సంప్రదించండి: 9701399366"
  },
  "student_title": {
    english: "Student Specials!",
    telugu: "విద్యార్థులకు ప్రత్యేక ఆఫర్లు!"
  },
  "student_discount": {
    english: "10% off on bookings with a valid student ID",
    telugu: "చెల్లుబాటు అయ్యే విద్యార్థి ID తో బుకింగ్‌లపై 10% తగ్గింపు"
  },
  "student_hours": {
    english: "Student Hours: Weekdays, 12 PM – 4 PM",
    telugu: "విద్యార్థి గంటలు: వారపు రోజుల్లో, మధ్యాహ్నం 12 - సాయంత్రం 4"
  },
  "loyalty_card": {
    english: "Loyalty Card: After 5 paid bookings, get 1 hour FREE!",
    telugu: "లాయల్టీ కార్డ్: 5 చెల్లింపు బుకింగ్‌ల తర్వాత, 1 గంట ఉచితంగా పొందండి!"
  },
  "show_id": {
    english: "Show your college ID at the venue to claim your discount.",
    telugu: "మీ డిస్కౌంట్‌ని పొందడానికి వేదిక వద్ద మీ కళాశాల IDని చూపించండి."
  },
  // Contact section
  "contact_title": {
    english: "Contact Us",
    telugu: "మమ్మల్ని సంప్రదించండి"
  },
  "contact_subtitle": {
    english: "Have questions? Feel free to reach out to us.",
    telugu: "ప్రశ్నలు ఉన్నాయా? మాకు తెలియజేయండి."
  },
  "phone": {
    english: "Phone",
    telugu: "ఫోన్"
  },
  "whatsapp": {
    english: "WhatsApp",
    telugu: "వాట్సాప్"
  },
  "location_title": {
    english: "Our Location",
    telugu: "మా స్థానం"
  },
  "location_subtitle": {
    english: "Find us in Dwarapudi, Vizianagaram district, Andhra Pradesh",
    telugu: "ద్వారపూడి, విజయనగరం జిల్లా, ఆంధ్రప్రదేశ్‌లో మాకు కనుగొనండి"
  },
  "payment_info": {
    english: "UPI: 9701399366@ybl",
    telugu: "UPI: 9701399366@ybl"
  },
  // Form validation
  "required": {
    english: "This field is required",
    telugu: "ఈ ఫీల్డ్ అవసరం"
  },
  "invalid_mobile": {
    english: "Please enter a valid 10-digit mobile number",
    telugu: "దయచేసి చెల్లుబాటు అయ్యే 10-అంకెల మొబైల్ నంబర్‌ని నమోదు చేయండి"
  },
  "min_players": {
    english: "Minimum 2 players required",
    telugu: "కనీసం 2 మంది ఆటగాళ్లు అవసరం"
  },
  "max_players": {
    english: "Maximum 16 players allowed",
    telugu: "గరిష్టంగా 16 మంది ఆటగాళ్లు అనుమతించబడతారు"
  },
  // Success messages
  "booking_success": {
    english: "Booking confirmed! A confirmation has been sent to your WhatsApp.",
    telugu: "బుకింగ్ నిర్ధారించబడింది! నిర్ధారణ మీ WhatsAppకి పంపబడింది."
  },
  // Footer
  "copyright": {
    english: "© 2023 Raju Sixer Adda. All rights reserved.",
    telugu: "© 2023 రాజు సిక్సర్ అడ్డా. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి."
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'english',
  toggleLanguage: () => {},
  translate: () => '',
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('english');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'telugu' : 'english');
  };

  const translate = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};
