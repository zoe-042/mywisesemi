
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Folder, ChevronDown, ChevronRight, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { projectsApi, isoDocumentsApi } from '@/services/api';
import { Project, ISODocument } from '@/types';

const ProjectsList = () => {
  const [expandedProjects, setExpandedProjects] = useState(true);
  const [expandedISO, setExpandedISO] = useState(true);
  
  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: projectsApi.getAll,
  });
  
  const { data: isoDocuments = [], isLoading: isoLoading } = useQuery({
    queryKey: ['isoDocuments'],
    queryFn: isoDocumentsApi.getAll,
  });

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-wisesemi-dark">Project Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div 
            className="flex items-center p-2 rounded-md cursor-pointer hover:bg-wisesemi-light transition-colors"
            onClick={() => setExpandedProjects(!expandedProjects)}
          >
            {expandedProjects ? (
              <ChevronDown className="h-4 w-4 mr-2 text-wisesemi-dark" />
            ) : (
              <ChevronRight className="h-4 w-4 mr-2 text-wisesemi-dark" />
            )}
            <span className="font-medium text-wisesemi-dark">Projects</span>
          </div>
          
          {expandedProjects && (
            <ul className="space-y-1 pl-6">
              {projectsLoading ? (
                <div className="animate-pulse h-16 bg-gray-200 rounded-md"></div>
              ) : (
                projects.map((project: Project) => (
                  <li key={project.id}>
                    <Link
                      to={project.path}
                      className="flex items-center p-2 rounded-md hover:bg-wisesemi-light transition-colors group"
                    >
                      <Folder className="h-4 w-4 mr-2 text-wisesemi-dark group-hover:text-wisesemi" />
                      <span className="text-gray-700 group-hover:text-wisesemi-dark">
                        {project.name}
                      </span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          )}

          <div 
            className="flex items-center p-2 rounded-md cursor-pointer hover:bg-wisesemi-light transition-colors mt-4"
            onClick={() => setExpandedISO(!expandedISO)}
          >
            {expandedISO ? (
              <ChevronDown className="h-4 w-4 mr-2 text-wisesemi-dark" />
            ) : (
              <ChevronRight className="h-4 w-4 mr-2 text-wisesemi-dark" />
            )}
            <span className="font-medium text-wisesemi-dark">ISO 9001</span>
          </div>
          
          {expandedISO && (
            <ul className="space-y-1 pl-6">
              {isoLoading ? (
                <div className="animate-pulse h-16 bg-gray-200 rounded-md"></div>
              ) : (
                isoDocuments.map((doc: ISODocument) => (
                  <li key={doc.id}>
                    <Link
                      to={doc.path}
                      className="flex items-center p-2 rounded-md hover:bg-wisesemi-light transition-colors group"
                    >
                      <FileText className="h-4 w-4 mr-2 text-wisesemi-dark group-hover:text-wisesemi" />
                      <span className="text-gray-700 group-hover:text-wisesemi-dark">
                        {doc.name}
                      </span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectsList;
