
import React from 'react';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, Clock, BarChart3 } from 'lucide-react';

const Course: React.FC = () => {
  const availableCourses = [
    {
      id: 1,
      title: "Matemática",
      topics: [
        { id: 101, title: "Geometria Analítica", duration: 60, videos: 5, exercises: 12 },
        { id: 102, title: "Cálculo Diferencial", duration: 75, videos: 7, exercises: 15 },
        { id: 103, title: "Álgebra Linear", duration: 90, videos: 8, exercises: 20 },
      ]
    },
    {
      id: 2,
      title: "Física",
      topics: [
        { id: 201, title: "Eletromagnetismo", duration: 45, videos: 4, exercises: 10 },
        { id: 202, title: "Mecânica Clássica", duration: 60, videos: 6, exercises: 12 },
      ]
    },
    {
      id: 3,
      title: "Química",
      topics: [
        { id: 301, title: "Ligações Químicas", duration: 60, videos: 5, exercises: 8 },
        { id: 302, title: "Química Orgânica", duration: 90, videos: 9, exercises: 15 },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="py-6">
            <h1 className="text-2xl md:text-3xl font-bold font-display mb-4">
              Cursos Disponíveis
            </h1>
            <p className="text-muted-foreground mb-8">
              Explore nossos cursos organizados por disciplina e tema
            </p>
            
            <div className="space-y-10">
              {availableCourses.map((course) => (
                <div key={course.id} className="space-y-6">
                  <h2 className="text-xl font-semibold flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    {course.title}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {course.topics.map((topic) => (
                      <Card key={topic.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle>{topic.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{topic.duration} min</span>
                            </div>
                            <div className="flex items-center">
                              <Video className="h-4 w-4 mr-1" />
                              <span>{topic.videos} vídeos</span>
                            </div>
                            <div className="flex items-center">
                              <BarChart3 className="h-4 w-4 mr-1" />
                              <span>{topic.exercises} exercícios</span>
                            </div>
                          </div>
                          
                          <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                            <div 
                              className="bg-primary h-full rounded-full" 
                              style={{ width: '0%' }}
                            ></div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Novo curso
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Link to="/study" className="w-full">
                            <Button className="w-full">
                              Iniciar estudo
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Course;
