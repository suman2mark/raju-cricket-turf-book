
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  const { translate } = useLanguage();

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{translate('pricing_title')}</h2>
          <p className="text-xl text-gray-600">{translate('pricing_subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Hourly booking card */}
          <Card className="border-2 border-primary/20 transform hover:scale-105 transition-transform">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl font-bold text-gray-900">
                {translate('hourly_booking')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="p-6 space-y-4">
                <div className="text-4xl font-bold text-center text-gray-900">
                  <span className="text-2xl">₹</span>600
                  <span className="text-base font-normal text-gray-500">/{translate('daytime')}</span>
                </div>
                <div className="text-4xl font-bold text-center text-gray-900">
                  <span className="text-2xl">₹</span>700
                  <span className="text-base font-normal text-gray-500">/{translate('nighttime')}</span>
                </div>
                <ul className="space-y-3 mt-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">{translate('daytime_rate')}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">{translate('nighttime_rate')}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">UPI: 8919878315@ybl</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          {/* Tournament booking card */}
          <Card className="border-2 border-primary/20 transform hover:scale-105 transition-transform">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl font-bold text-gray-900">
                {translate('tournament_title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="p-6 space-y-4">
                <div className="text-4xl font-bold text-center text-gray-900">
                  <span className="text-2xl">₹</span>7,999
                  <span className="text-base font-normal text-gray-500">/day</span>
                </div>
                <ul className="space-y-3 mt-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">{translate('tournament_rate')}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">{translate('tournament_contact')}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">UPI: 8919878315@ybl</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          {/* Student specials card */}
          <Card className="border-2 border-primary/20 transform hover:scale-105 transition-transform bg-gradient-to-br from-white to-green-50">
            <CardHeader className="text-center pb-2">
              <div className="bg-yellow-400 text-blue-900 font-bold py-1 px-3 rounded-full inline-block mb-2">
                Special Offer
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">
                {translate('student_title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="p-6 space-y-4">
                <div className="text-4xl font-bold text-center text-gray-900">
                  <span className="text-2xl">10%</span>
                  <span className="text-base font-normal text-gray-500"> {translate('student_discount')}</span>
                </div>
                <ul className="space-y-3 mt-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">{translate('student_hours')}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">{translate('loyalty_card')}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">{translate('show_id')}</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
