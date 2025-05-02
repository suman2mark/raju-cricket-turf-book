
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";

// The main content component using language context
const NotFoundContent = () => {
  const location = useLocation();
  const { translate } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <div className="w-24 h-24 mx-auto mb-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! This page doesn't exist.
        </p>
        <Button asChild className="bg-primary hover:bg-primary/90 text-white">
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

// Wrapper component that provides the language context
const NotFound = () => {
  return (
    <LanguageProvider>
      <NotFoundContent />
    </LanguageProvider>
  );
};

export default NotFound;
