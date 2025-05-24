
import React from 'react';
import { Link } from 'react-router-dom';
import { Folder } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { departmentsApi } from '@/services/api';
import { Department } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

const DepartmentsList = () => {
  const { t } = useLanguage();
  
  const { data: departments = [], isLoading, error } = useQuery({
    queryKey: ['departments'],
    queryFn: departmentsApi.getAll,
  });

  const getDepartmentName = (dept: Department) => {
    const deptKey = dept.path.split('/').pop(); // Extract department key from path
    const translationKey = `dept.${deptKey}`;
    return t(translationKey);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-wisesemi-dark">{t('home.departments')}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-pulse h-32 w-full bg-gray-200 rounded-md"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">
            Failed to load departments
          </div>
        ) : (
          <ul className="space-y-2">
            {departments.map((department: Department) => (
              <li key={department.id}>
                <Link 
                  to={department.path}
                  className="flex items-center p-2 rounded-md hover:bg-wisesemi-light transition-colors group"
                >
                  <Folder className="h-4 w-4 mr-2 text-wisesemi-dark group-hover:text-wisesemi" />
                  <span className="text-gray-700 group-hover:text-wisesemi-dark">
                    {getDepartmentName(department)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default DepartmentsList;
