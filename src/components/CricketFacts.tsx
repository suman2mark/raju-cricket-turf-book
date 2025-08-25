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
  // World Cricket Records
  {
    id: 11,
    fact: "Brian Lara holds the record for highest individual score in Test cricket (400*) and First-class cricket (501*)",
    category: 'record',
    icon: Trophy
  },
  {
    id: 12,
    fact: "Jim Laker took 19 wickets in a match for England vs Australia in 1956 - still unbeaten",
    category: 'record',
    icon: Target
  },
  {
    id: 13,
    fact: "The West Indies dominated world cricket for 15 years, remaining unbeaten in Test series from 1980-1995",
    category: 'history',
    icon: Trophy
  },
  {
    id: 14,
    fact: "Don Bradman's Test batting average of 99.94 is considered statistically impossible to beat",
    category: 'record',
    icon: Trophy
  },
  {
    id: 15,
    fact: "Muttiah Muralitharan took 800 Test wickets - 92 more than the second-highest wicket-taker",
    category: 'record',
    icon: Target
  },
  {
    id: 16,
    fact: "The shortest completed Test match lasted only 5.5 hours (England vs Australia, 1932)",
    category: 'fun',
    icon: Clock
  },
  {
    id: 17,
    fact: "AB de Villiers scored the fastest ODI century in just 31 balls against the West Indies",
    category: 'record',
    icon: Target
  },
  {
    id: 18,
    fact: "Shahid Afridi hit the longest six in cricket history - measured at 158 meters",
    category: 'record',
    icon: Target
  },
  {
    id: 19,
    fact: "The Melbourne Cricket Ground (MCG) holds the record for highest attendance - 93,013 in the 2015 World Cup final",
    category: 'stats',
    icon: Users
  },
  {
    id: 20,
    fact: "West Indies' Clive Lloyd was the first captain to win back-to-back World Cups (1975 & 1979)",
    category: 'history',
    icon: Trophy
  },
  // Modern Cricket Milestones
  {
    id: 21,
    fact: "Chris Gayle holds the record for most sixes in international cricket (553)",
    category: 'record',
    icon: Target
  },
  {
    id: 22,
    fact: "Lasith Malinga is the only bowler to take 4 wickets in 4 balls in both ODI and T20I cricket",
    category: 'record',
    icon: Target
  },
  {
    id: 23,
    fact: "Australia has won the Cricket World Cup 5 times - more than any other nation",
    category: 'record',
    icon: Trophy
  },
  {
    id: 24,
    fact: "The first-ever Test match was played between England and Australia in 1877 at the MCG",
    category: 'history',
    icon: Clock
  },
  {
    id: 25,
    fact: "Pakistan's Babar Azam became the fastest to score 1000 runs as T20I captain (26 innings)",
    category: 'record',
    icon: Target
  },
  {
    id: 26,
    fact: "New Zealand's Martin Guptill scored the highest World Cup individual score (237*) in 2015",
    category: 'record',
    icon: Trophy
  },
  {
    id: 27,
    fact: "England scored 498/4 in an ODI against Netherlands - the highest team total ever",
    category: 'record',
    icon: Trophy
  },
  {
    id: 28,
    fact: "The Ashes urn is only 15cm tall and contains the ashes of burnt cricket bails",
    category: 'fun',
    icon: Trophy
  },
  {
    id: 29,
    fact: "Afghanistan achieved full ICC membership in just 12 years from Associate status",
    category: 'history',
    icon: Users
  },
  {
    id: 30,
    fact: "Bangladesh's Shakib Al Hasan is the only player to score 3000+ runs and take 200+ wickets in ODIs",
    category: 'record',
    icon: Trophy
  },
  // Fascinating Cricket Trivia
  {
    id: 31,
    fact: "A cricket ball can reach speeds of 160+ km/h and weighs exactly 163 grams",
    category: 'fun',
    icon: Target
  },
  {
    id: 32,
    fact: "The cricket bat can be maximum 96.52cm long and 10.8cm wide",
    category: 'fun',
    icon: Target
  },
  {
    id: 33,
    fact: "Lord's Cricket Ground has a 8-degree slope from north to south across the pitch",
    category: 'fun',
    icon: Users
  },
  {
    id: 34,
    fact: "The word 'cricket' possibly comes from the Old French 'criquet' meaning stick",
    category: 'history',
    icon: Clock
  },
  {
    id: 35,
    fact: "A cricket match can theoretically last forever if no wickets fall and no declarations are made",
    category: 'fun',
    icon: Clock
  },
  {
    id: 36,
    fact: "Zimbabwe's Andy Flower is the only wicket-keeper to score centuries in both innings of a Test match",
    category: 'record',
    icon: Trophy
  },
  {
    id: 37,
    fact: "The pink ball used in day-night Tests was invented in 2009 and first used internationally in 2015",
    category: 'history',
    icon: Target
  },
  {
    id: 38,
    fact: "Sri Lanka's Kumar Sangakkara scored 4 consecutive ODI centuries in the 2015 World Cup",
    category: 'record',
    icon: Trophy
  },
  {
    id: 39,
    fact: "The Super Over was introduced in 2008 and first used in international cricket in 2009",
    category: 'history',
    icon: Clock
  },
  {
    id: 40,
    fact: "South Africa's Jacques Kallis scored 13,289 Test runs and took 292 wickets - cricket's greatest all-rounder",
    category: 'record',
    icon: Trophy
  },
  // Recent Records and Achievements
  {
    id: 41,
    fact: "Jos Buttler holds the record for fastest T20I century (35 balls) and fastest T20I fifty (18 balls)",
    category: 'record',
    icon: Target
  },
  {
    id: 42,
    fact: "Nepal's Dipendra Singh Airee hit 6 sixes in an over during a T20I match in 2024",
    category: 'record',
    icon: Target
  },
  {
    id: 43,
    fact: "The ICC Women's T20 World Cup 2020 final was watched by 86 million viewers",
    category: 'stats',
    icon: Users
  },
  {
    id: 44,
    fact: "Dubai International Cricket Stadium has hosted the most T20Is (over 80 matches)",
    category: 'stats',
    icon: Users
  },
  {
    id: 45,
    fact: "Glenn Maxwell's 201* off 128 balls is the highest individual score in a World Cup chase",
    category: 'record',
    icon: Trophy
  },
  {
    id: 46,
    fact: "Trent Boult was the first bowler to take 4 wickets in the first over of a T20I match",
    category: 'record',
    icon: Target
  },
  {
    id: 47,
    fact: "The Decision Review System (DRS) was first used in Test cricket in 2008",
    category: 'history',
    icon: Target
  },
  {
    id: 48,
    fact: "Ireland's Kevin O'Brien scored the fastest World Cup century (50 balls) in 2011",
    category: 'record',
    icon: Target
  },
  {
    id: 49,
    fact: "The ICC now has 104 member countries, with cricket played on every continent",
    category: 'stats',
    icon: Users
  },
  {
    id: 50,
    fact: "Yuvraj Singh hit 6 sixes in an over against England's Stuart Broad in the 2007 T20 World Cup",
    category: 'record',
    icon: Trophy
  },
  // Unique Cricket Facts
  {
    id: 51,
    fact: "The highest cricket ground is in Chail, India, at 2,444 meters above sea level",
    category: 'fun',
    icon: Users
  },
  {
    id: 52,
    fact: "Cricket was part of the Olympics only once, in 1900, where England won gold",
    category: 'history',
    icon: Trophy
  },
  {
    id: 53,
    fact: "The bail must be completely removed from the stumps for a batsman to be run out or bowled",
    category: 'fun',
    icon: Target
  },
  {
    id: 54,
    fact: "Bowling underarm was legal until 1981 when Australia used it controversially against New Zealand",
    category: 'history',
    icon: Clock
  },
  {
    id: 55,
    fact: "The longest cricket match lasted 12 days (including rest days) between England and South Africa in 1939",
    category: 'record',
    icon: Clock
  },
  {
    id: 56,
    fact: "Herschelle Gibbs was the first player to hit 6 sixes in an over in ODI cricket (2007 World Cup)",
    category: 'record',
    icon: Target
  },
  {
    id: 57,
    fact: "The term 'hat-trick' originated from cricket and referred to a bowler getting a hat for taking 3 wickets",
    category: 'history',
    icon: Trophy
  },
  {
    id: 58,
    fact: "Women's cricket has been played since the 18th century, with the first recorded match in 1745",
    category: 'history',
    icon: Users
  },
  {
    id: 59,
    fact: "The Dubai International Stadium was built on reclaimed land from the Persian Gulf",
    category: 'fun',
    icon: Users
  },
  {
    id: 60,
    fact: "Garfield Sobers was the first player to hit 6 sixes in an over in first-class cricket (1968)",
    category: 'record',
    icon: Target
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