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
  // Records
  {
    id: 1,
    fact: "The highest individual score in Test cricket is 400* by Brian Lara",
    category: 'record',
    icon: Trophy
  },
  {
    id: 2,
    fact: "The fastest recorded delivery was 161.3 km/h by Shoaib Akhtar",
    category: 'record',
    icon: Target
  },
  {
    id: 3,
    fact: "Muttiah Muralitharan holds the record for most Test wickets with 800",
    category: 'record',
    icon: Trophy
  },
  {
    id: 4,
    fact: "The highest team score in Test cricket is 952/6 declared by Sri Lanka",
    category: 'record',
    icon: Trophy
  },
  {
    id: 5,
    fact: "Rohit Sharma holds the record for highest ODI score: 264",
    category: 'record',
    icon: Trophy
  },
  {
    id: 6,
    fact: "Jim Laker took 19 wickets in a single Test match",
    category: 'record',
    icon: Trophy
  },
  {
    id: 7,
    fact: "Chris Gayle hit the fastest T20 century in just 30 balls",
    category: 'record',
    icon: Target
  },
  {
    id: 8,
    fact: "The lowest Test score ever is 26 by New Zealand",
    category: 'record',
    icon: Trophy
  },
  {
    id: 9,
    fact: "Sachin Tendulkar scored 100 international centuries",
    category: 'record',
    icon: Trophy
  },
  {
    id: 10,
    fact: "AB de Villiers scored the fastest ODI century in 31 balls",
    category: 'record',
    icon: Target
  },
  
  // History
  {
    id: 11,
    fact: "The first recorded cricket match was in 1697 in Sussex, England",
    category: 'history',
    icon: Clock
  },
  {
    id: 12,
    fact: "Cricket was once an Olympic sport (1900 Olympics in Paris)",
    category: 'history',
    icon: Trophy
  },
  {
    id: 13,
    fact: "The longest Test match lasted 12 days between England and South Africa in 1939",
    category: 'history',
    icon: Clock
  },
  {
    id: 14,
    fact: "The first Test match was played in 1877 between Australia and England",
    category: 'history',
    icon: Clock
  },
  {
    id: 15,
    fact: "The Ashes urn contains the ashes of burnt bails from 1882",
    category: 'history',
    icon: Trophy
  },
  {
    id: 16,
    fact: "Women's cricket dates back to 1745",
    category: 'history',
    icon: Clock
  },
  {
    id: 17,
    fact: "The first World Cup was held in England in 1975",
    category: 'history',
    icon: Trophy
  },
  {
    id: 18,
    fact: "Day/night Test cricket began in 2015",
    category: 'history',
    icon: Clock
  },
  {
    id: 19,
    fact: "The first T20 match was played in 2003",
    category: 'history',
    icon: Clock
  },
  {
    id: 20,
    fact: "County cricket started in England in 1890",
    category: 'history',
    icon: Clock
  },
  
  // Fun Facts
  {
    id: 21,
    fact: "A cricket ball can travel at speeds of over 100 mph (160 km/h)",
    category: 'fun',
    icon: Target
  },
  {
    id: 22,
    fact: "A cricket bat can't be wider than 4.25 inches (10.8 cm)",
    category: 'fun',
    icon: Target
  },
  {
    id: 23,
    fact: "Cricket balls are made with a cork center wrapped in leather",
    category: 'fun',
    icon: Target
  },
  {
    id: 24,
    fact: "The stumps are 28 inches tall and 9 inches wide",
    category: 'fun',
    icon: Target
  },
  {
    id: 25,
    fact: "A cricket pitch is exactly 22 yards long",
    category: 'fun',
    icon: Target
  },
  {
    id: 26,
    fact: "The term 'duck' comes from 'duck's egg' (shaped like zero)",
    category: 'fun',
    icon: Target
  },
  {
    id: 27,
    fact: "Leg Before Wicket (LBW) was introduced in 1774",
    category: 'fun',
    icon: Target
  },
  {
    id: 28,
    fact: "Cricket whites were traditionally made to reflect sunlight",
    category: 'fun',
    icon: Target
  },
  {
    id: 29,
    fact: "The sight screen helps batsmen see the ball clearly",
    category: 'fun',
    icon: Target
  },
  {
    id: 30,
    fact: "Cricket is the only sport where you can score without hitting the ball",
    category: 'fun',
    icon: Target
  },
  
  // Statistics
  {
    id: 31,
    fact: "Cricket is played by over 2.5 billion fans worldwide",
    category: 'stats',
    icon: Users
  },
  {
    id: 32,
    fact: "India has the most cricket fans with over 900 million",
    category: 'stats',
    icon: Users
  },
  {
    id: 33,
    fact: "The IPL is worth over $6 billion",
    category: 'stats',
    icon: Users
  },
  {
    id: 34,
    fact: "Over 100 countries play cricket officially",
    category: 'stats',
    icon: Users
  },
  {
    id: 35,
    fact: "Cricket World Cup reaches 1 billion viewers",
    category: 'stats',
    icon: Users
  },
  {
    id: 36,
    fact: "England has played the most Test matches (over 1000)",
    category: 'stats',
    icon: Users
  },
  {
    id: 37,
    fact: "Australia has won the most World Cups (5 times)",
    category: 'stats',
    icon: Users
  },
  {
    id: 38,
    fact: "West Indies dominated cricket for 20 years (1970-1990)",
    category: 'stats',
    icon: Users
  },
  {
    id: 39,
    fact: "Pakistan has produced the most fast bowlers per capita",
    category: 'stats',
    icon: Users
  },
  {
    id: 40,
    fact: "Sri Lanka invented the reverse sweep shot",
    category: 'stats',
    icon: Users
  },
  
  // More Records
  {
    id: 41,
    fact: "Don Bradman's Test average of 99.94 may never be beaten",
    category: 'record',
    icon: Trophy
  },
  {
    id: 42,
    fact: "Garfield Sobers was the first to hit 6 sixes in an over",
    category: 'record',
    icon: Trophy
  },
  {
    id: 43,
    fact: "The most expensive over cost 77 runs (including no-balls)",
    category: 'record',
    icon: Trophy
  },
  {
    id: 44,
    fact: "Hanif Mohammad batted for 16 hours and 10 minutes",
    category: 'record',
    icon: Trophy
  },
  {
    id: 45,
    fact: "The highest partnership is 624 runs by Mahela and Samaraweera",
    category: 'record',
    icon: Trophy
  },
  {
    id: 46,
    fact: "Bert Sutcliffe scored a century with a broken nose",
    category: 'record',
    icon: Trophy
  },
  {
    id: 47,
    fact: "The fastest hat-trick took just 4 balls by Lasith Malinga",
    category: 'record',
    icon: Trophy
  },
  {
    id: 48,
    fact: "MS Dhoni has the most dismissals as wicket-keeper (634)",
    category: 'record',
    icon: Trophy
  },
  {
    id: 49,
    fact: "The most runs in a single day of Test cricket is 588",
    category: 'record',
    icon: Trophy
  },
  {
    id: 50,
    fact: "Yuvraj Singh hit 6 sixes in an over in T20 World Cup",
    category: 'record',
    icon: Trophy
  },
  
  // More Fun Facts
  {
    id: 51,
    fact: "Cricket is called the 'Gentleman's Game'",
    category: 'fun',
    icon: Target
  },
  {
    id: 52,
    fact: "The term 'googly' was coined in 1903",
    category: 'fun',
    icon: Target
  },
  {
    id: 53,
    fact: "Rain can completely change the outcome of a cricket match",
    category: 'fun',
    icon: Target
  },
  {
    id: 54,
    fact: "Cricket grounds come in all shapes and sizes",
    category: 'fun',
    icon: Target
  },
  {
    id: 55,
    fact: "The boundary rope was introduced in 1920s",
    category: 'fun',
    icon: Target
  },
  {
    id: 56,
    fact: "Chinaman bowling is named after Ellis Achong",
    category: 'fun',
    icon: Target
  },
  {
    id: 57,
    fact: "The 'corridor of uncertainty' is between 4th-6th stump",
    category: 'fun',
    icon: Target
  },
  {
    id: 58,
    fact: "A maiden over means no runs were scored",
    category: 'fun',
    icon: Target
  },
  {
    id: 59,
    fact: "The Duckworth-Lewis method calculates rain-affected targets",
    category: 'fun',
    icon: Target
  },
  {
    id: 60,
    fact: "Cricket balls swing more in humid conditions",
    category: 'fun',
    icon: Target
  },
  
  // More History
  {
    id: 61,
    fact: "The first cricket club was formed in Hambledon in 1750",
    category: 'history',
    icon: Clock
  },
  {
    id: 62,
    fact: "Overarm bowling was legalized in 1864",
    category: 'history',
    icon: Clock
  },
  {
    id: 63,
    fact: "The first cricket match under lights was in 1952",
    category: 'history',
    icon: Clock
  },
  {
    id: 64,
    fact: "Protective gear became mandatory after serious injuries",
    category: 'history',
    icon: Clock
  },
  {
    id: 65,
    fact: "The third umpire system started in 1992",
    category: 'history',
    icon: Clock
  },
  {
    id: 66,
    fact: "DRS (Decision Review System) was introduced in 2008",
    category: 'history',
    icon: Clock
  },
  {
    id: 67,
    fact: "The first cricket telecast was in 1938",
    category: 'history',
    icon: Clock
  },
  {
    id: 68,
    fact: "Colored clothing in cricket started in 1977",
    category: 'history',
    icon: Clock
  },
  {
    id: 69,
    fact: "The first cricket video game was released in 1983",
    category: 'history',
    icon: Clock
  },
  {
    id: 70,
    fact: "Cricket commentary began in 1927 on BBC Radio",
    category: 'history',
    icon: Clock
  },
  
  // More Statistics
  {
    id: 71,
    fact: "Test cricket has been played for over 145 years",
    category: 'stats',
    icon: Users
  },
  {
    id: 72,
    fact: "The shortest Test match lasted just 2 days",
    category: 'stats',
    icon: Users
  },
  {
    id: 73,
    fact: "Australia's MCG can hold 100,024 spectators",
    category: 'stats',
    icon: Users
  },
  {
    id: 74,
    fact: "The longest cricket match lasted 43 hours of play",
    category: 'stats',
    icon: Users
  },
  {
    id: 75,
    fact: "Over 40 different dismissal types exist in cricket",
    category: 'stats',
    icon: Users
  },
  {
    id: 76,
    fact: "The average Test match lasts about 30 hours",
    category: 'stats',
    icon: Users
  },
  {
    id: 77,
    fact: "Cricket is the 2nd most popular sport globally",
    category: 'stats',
    icon: Users
  },
  {
    id: 78,
    fact: "Women's cricket World Cup started in 1973",
    category: 'stats',
    icon: Users
  },
  {
    id: 79,
    fact: "The youngest Test cricketer was 14 years old",
    category: 'stats',
    icon: Users
  },
  {
    id: 80,
    fact: "The oldest Test cricketer was 52 years old",
    category: 'stats',
    icon: Users
  },
  
  // Bonus Facts
  {
    id: 81,
    fact: "A cricket ball loses its shine after about 80 overs",
    category: 'fun',
    icon: Target
  },
  {
    id: 82,
    fact: "The heaviest cricket bat ever used weighed 4.5 kg",
    category: 'fun',
    icon: Target
  },
  {
    id: 83,
    fact: "Cricket stumps are made from ash wood",
    category: 'fun',
    icon: Target
  },
  {
    id: 84,
    fact: "The red cherry gets its color from leather dye",
    category: 'fun',
    icon: Target
  },
  {
    id: 85,
    fact: "Night watchmen are sent to protect better batsmen",
    category: 'fun',
    icon: Target
  },
  {
    id: 86,
    fact: "The coin toss can significantly impact match outcomes",
    category: 'fun',
    icon: Target
  },
  {
    id: 87,
    fact: "Cricket field positions have unique names like silly point",
    category: 'fun',
    icon: Target
  },
  {
    id: 88,
    fact: "The follow-on rule prevents time wasting in Tests",
    category: 'fun',
    icon: Target
  },
  {
    id: 89,
    fact: "Powerplay restrictions change batting strategies",
    category: 'fun',
    icon: Target
  },
  {
    id: 90,
    fact: "The Super Over decides tied matches in limited overs",
    category: 'fun',
    icon: Target
  }
];

const CricketFacts: React.FC = () => {
  const [currentFact, setCurrentFact] = useState<CricketFact>(cricketFacts[0]);
  const [isVisible, setIsVisible] = useState(false);

  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * cricketFacts.length);
    return cricketFacts[randomIndex];
  };

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      let newFact;
      do {
        newFact = getRandomFact();
      } while (newFact.id === currentFact.id && cricketFacts.length > 1); // Ensure different fact
      setCurrentFact(newFact);
    }, 4000); // Change fact every 4 seconds

    return () => clearInterval(interval);
  }, [currentFact]);

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
              
              {/* Fact counter */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Fact {currentFact.id} of {cricketFacts.length} • Updates every 4 seconds
                </p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                  <div 
                    className="bg-primary h-1 rounded-full transition-all duration-4000 animate-pulse" 
                    style={{ width: '100%' }}
                  />
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