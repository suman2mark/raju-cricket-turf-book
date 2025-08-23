import React, { useState, useEffect } from 'react';
import { Trophy, Target, Clock, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface CricketFact {
  id: number;
  fact: string;
  category: 'record' | 'fun' | 'history' | 'stats';
  icon: React.ElementType;
}

const cricketFacts: CricketFact[] = [
  {
    id: 1,
    fact: "The highest individual score in Test cricket is 400* by Brian Lara",
    category: 'record',
    icon: Trophy
  },
  {
    id: 2,
    fact: "A cricket ball can travel at speeds of over 100 mph (160 km/h)",
    category: 'fun',
    icon: Target
  },
  {
    id: 3,
    fact: "The longest Test match lasted 12 days between England and South Africa in 1939",
    category: 'history',
    icon: Clock
  },
  {
    id: 4,
    fact: "Cricket is played by over 2.5 billion fans worldwide",
    category: 'stats',
    icon: Users
  },
  {
    id: 5,
    fact: "The fastest recorded delivery was 161.3 km/h by Shoaib Akhtar",
    category: 'record',
    icon: Target
  },
  {
    id: 6,
    fact: "Cricket was once an Olympic sport (1900 Olympics in Paris)",
    category: 'history',
    icon: Trophy
  },
  {
    id: 7,
    fact: "A cricket bat can't be wider than 4.25 inches (10.8 cm)",
    category: 'fun',
    icon: Target
  },
  {
    id: 8,
    fact: "The first recorded cricket match was in 1697 in Sussex, England",
    category: 'history',
    icon: Clock
  }
];

const CricketFacts: React.FC = () => {
  const [currentFact, setCurrentFact] = useState<CricketFact>(cricketFacts[0]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFact(prev => {
        const currentIndex = cricketFacts.findIndex(fact => fact.id === prev.id);
        const nextIndex = (currentIndex + 1) % cricketFacts.length;
        return cricketFacts[nextIndex];
      });
    }, 5000); // Change fact every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getCategoryColor = (category: CricketFact['category']) => {
    switch (category) {
      case 'record': return 'text-yellow-600 bg-yellow-50';
      case 'fun': return 'text-blue-600 bg-blue-50';
      case 'history': return 'text-purple-600 bg-purple-50';
      case 'stats': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const IconComponent = currentFact.icon;

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Cricket Facts & Records</h2>
          <p className="text-lg text-gray-600">Discover amazing cricket trivia while you book your session</p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card className={`transition-all duration-500 hover:shadow-lg ${isVisible ? 'animate-fade-in' : ''}`}>
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className={`p-3 rounded-full ${getCategoryColor(currentFact.category)} flex-shrink-0`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${getCategoryColor(currentFact.category)}`}>
                      {currentFact.category}
                    </span>
                  </div>
                  
                  <p className="text-lg text-gray-800 leading-relaxed font-medium">
                    {currentFact.fact}
                  </p>
                </div>
              </div>
              
              {/* Progress indicator */}
              <div className="mt-6 flex gap-2 justify-center">
                {cricketFacts.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 w-8 rounded-full transition-all duration-300 ${
                      cricketFacts.findIndex(fact => fact.id === currentFact.id) === index
                        ? 'bg-primary'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CricketFacts;