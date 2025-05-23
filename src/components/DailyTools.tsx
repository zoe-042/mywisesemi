
import React from 'react';
import { Utensils, FileBox, CalendarDays } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const getIcon = (type: string) => {
  switch (type) {
    case 'lunch':
      return <Utensils className="h-4 w-4 mr-2 text-orange-500" />;
    case 'leave':
      return <FileBox className="h-4 w-4 mr-2 text-wisesemi" />;
    default:
      return <CalendarDays className="h-4 w-4 mr-2 text-blue-500" />;
  }
};

const DailyTools = () => {
  const { t, language } = useLanguage();
  
  const dailyTools = [
    {
      id: 1,
      name: language === 'zh' ? '午餐訂購' : 'Lunch Box Selection',
      type: 'lunch',
      path: 'https://www.dinbendon.net/do/'
    },
    {
      id: 2,
      name: language === 'zh' ? '個人請假管理' : 'Personal Leave Management',
      type: 'leave',
      path: 'https://ap11.ragic.com/sims/reg/login.jsp?a=wisesemi202401'
    }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-wisesemi-dark flex items-center">
          <CalendarDays className="h-5 w-5 mr-2 text-wisesemi" />
          {t('home.daily_tools')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {dailyTools.map((tool) => (
            <li key={tool.id}>
              <a
                href={tool.path}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors group"
              >
                {getIcon(tool.type)}
                <span className="text-gray-700 group-hover:text-wisesemi-dark">
                  {tool.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default DailyTools;
