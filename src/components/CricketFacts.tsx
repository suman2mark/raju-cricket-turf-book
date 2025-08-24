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
  // Indian Cricket Legends
  {
    id: 1,
    fact: "Sachin Tendulkar scored 100 international centuries - the only player to achieve this feat",
    category: 'record',
    icon: Trophy
  },
  {
    id: 2,
    fact: "MS Dhoni is the only captain to win all three ICC tournaments (World Cup, T20 World Cup, Champions Trophy)",
    category: 'record',
    icon: Trophy
  },
  {
    id: 3,
    fact: "Virat Kohli has the highest batting average in successful ODI run chases (91.73)",
    category: 'record',
    icon: Target
  },
  {
    id: 4,
    fact: "Kapil Dev's 175* against Zimbabwe in 1983 World Cup is considered one of the greatest ODI innings",
    category: 'history',
    icon: Trophy
  },
  {
    id: 5,
    fact: "India won their first Cricket World Cup in 1983 under Kapil Dev's captaincy",
    category: 'history',
    icon: Trophy
  },
  {
    id: 6,
    fact: "Rohit Sharma holds the record for highest individual score in ODIs (264)",
    category: 'record',
    icon: Target
  },
  {
    id: 7,
    fact: "Anil Kumble took all 10 wickets in an innings against Pakistan at Delhi in 1999",
    category: 'record',
    icon: Trophy
  },
  {
    id: 8,
    fact: "IPL is the most-attended cricket league in the world with over 100 million viewers",
    category: 'stats',
    icon: Users
  },
  {
    id: 9,
    fact: "Jasprit Bumrah has the best bowling average for an Indian pacer in Test cricket",
    category: 'record',
    icon: Target
  },
  {
    id: 10,
    fact: "Rahul Dravid faced 31,258 balls in Test cricket - the most by any batsman",
    category: 'stats',
    icon: Clock
  },
  {
    id: 11,
    fact: "VVS Laxman's 281 against Australia at Eden Gardens is called the greatest Test innings by an Indian",
    category: 'history',
    icon: Trophy
  },
  {
    id: 12,
    fact: "Sunil Gavaskar was the first batsman to score 10,000 runs in Test cricket",
    category: 'history',
    icon: Trophy
  },
  {
    id: 13,
    fact: "India has never lost a Test series at home to Australia since 1969",
    category: 'stats',
    icon: Trophy
  },
  {
    id: 14,
    fact: "Harbhajan Singh is the only Indian spinner to take a hat-trick in Test cricket",
    category: 'record',
    icon: Target
  },
  {
    id: 15,
    fact: "The 2011 World Cup final was watched by 700 million people worldwide",
    category: 'stats',
    icon: Users
  },
  {
    id: 16,
    fact: "Rishabh Pant became the fastest Indian wicket-keeper to score 1000 Test runs",
    category: 'record',
    icon: Target
  },
  {
    id: 17,
    fact: "Mohammed Shami has the best strike rate among Indian fast bowlers in World Cups",
    category: 'stats',
    icon: Target
  },
  {
    id: 18,
    fact: "Sourav Ganguly transformed Indian cricket's aggressive approach in overseas conditions",
    category: 'history',
    icon: Trophy
  },
  {
    id: 19,
    fact: "India is the only team to win the World Cup at home after England (1975) and Australia (2015)",
    category: 'record',
    icon: Trophy
  },
  {
    id: 20,
    fact: "The Eden Gardens in Kolkata can hold 66,000 spectators - one of cricket's largest venues",
    category: 'fun',
    icon: Users
  }
];

const CricketFacts: React.FC = () => {
  const [currentFact, setCurrentFact] = useState<CricketFact>(cricketFacts[0]);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentFact(prev => {
          const currentIndex = cricketFacts.findIndex(fact => fact.id === prev.id);
          const nextIndex = (currentIndex + 1) % cricketFacts.length;
          return cricketFacts[nextIndex];
        });
        setIsSliding(false);
      }, 300);
    }, 4000);

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
        
        <div className="max-w-3xl mx-auto">
          <Card className="transition-all duration-500 hover:shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className={`transform transition-all duration-300 ease-in-out ${
                isSliding ? 'translate-x-[-100%] opacity-0' : 'translate-x-0 opacity-100'
              }`}>
                <div className="p-8">
                  <div className="flex items-start gap-6">
                    <div className={`p-4 rounded-full ${getCategoryColor(currentFact.category)} flex-shrink-0`}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide ${getCategoryColor(currentFact.category)}`}>
                          {currentFact.category}
                        </span>
                      </div>
                      
                      <p className="text-xl text-gray-800 leading-relaxed font-medium">
                        {currentFact.fact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CricketFacts;