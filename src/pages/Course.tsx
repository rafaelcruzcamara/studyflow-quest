
import React from 'react';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, Clock, BarChart3, GraduationCap, Brain, ChevronRight, PlayCircle } from 'lucide-react';

const Course: React.FC = () => {
  const availableCourses = [
    {
      id: 1,
      title: "Matemática",
      description: "Aprenda conceitos fundamentais de matemática de forma clara e objetiva",
      videoUrl: "https://www.youtube.com/embed/videoseries?list=PLAudUnJeNg4trL7IcV7pN4fiIrx7SBjL8", // Matemática Básica
      curriculum: "Base Nacional Comum Curricular (BNCC)",
      topics: [
        { id: 101, title: "Geometria Analítica", duration: 60, videos: 5, exercises: 12 },
        { id: 102, title: "Cálculo Diferencial", duration: 75, videos: 7, exercises: 15 },
        { id: 103, title: "Álgebra Linear", duration: 90, videos: 8, exercises: 20 },
      ]
    },
    {
      id: 2,
      title: "Física",
      description: "Estude os princípios que governam o universo de forma interativa",
      videoUrl: "https://www.youtube.com/embed/videoseries?list=PL1ELCTiItg0Nri25ONSYEjzqfQmcXFOi6", // Curso de Física
      curriculum: "Parâmetros Curriculares Nacionais (PCN)",
      topics: [
        { id: 201, title: "Eletromagnetismo", duration: 45, videos: 4, exercises: 10 },
        { id: 202, title: "Mecânica Clássica", duration: 60, videos: 6, exercises: 12 },
      ]
    },
    {
      id: 3,
      title: "Química",
      description: "Explore os elementos e reações que compõem nosso mundo",
      videoUrl: "https://www.youtube.com/embed/videoseries?list=PLf1lowbdbFIAGzn9OQPD97Da9TOoZddOF", // Curso de Química
      curriculum: "Base Nacional Comum Curricular (BNCC)",
      topics: [
        { id: 301, title: "Ligações Químicas", duration: 60, videos: 5, exercises: 8 },
        { id: 302, title: "Química Orgânica", duration: 90, videos: 9, exercises: 15 },
      ]
    },
    {
      id: 4,
      title: "Programação",
      description: "Aprenda a programar do zero ao avançado com cursos completos",
      videoUrl: "https://www.youtube.com/embed/videoseries?list=PLHz_AreHm4dkZ9-atkcmcBaMZdmLHft8n", // Curso de Python
      curriculum: "Itinerários Formativos - Novo Ensino Médio",
      topics: [
        { id: 401, title: "Lógica de Programação", duration: 50, videos: 5, exercises: 10 },
        { id: 402, title: "Python Básico", duration: 80, videos: 8, exercises: 16 },
        { id: 403, title: "Desenvolvimento Web", duration: 100, videos: 10, exercises: 20 },
      ]
    },
    {
      id: 5,
      title: "Inglês",
      description: "Domine o idioma mais falado no mundo dos negócios",
      videoUrl: "https://www.youtube.com/embed/videoseries?list=PL41dMNqXopt85RhRgFp_jdoI5Bz7DUG-l", // Curso de Inglês
      curriculum: "Base Nacional Comum Curricular (BNCC) - Línguas Estrangeiras",
      topics: [
        { id: 501, title: "Gramática Básica", duration: 40, videos: 4, exercises: 10 },
        { id: 502, title: "Conversação", duration: 60, videos: 6, exercises: 12 },
        { id: 503, title: "Business English", duration: 70, videos: 7, exercises: 14 },
      ]
    },
    {
      id: 6,
      title: "História do Brasil",
      description: "Entenda a formação histórica e cultural do Brasil",
      videoUrl: "https://www.youtube.com/embed/videoseries?list=PLHz_AreHm4dlKP6QQCekuIPky1CiwmdI6",
      curriculum: "Base Nacional Comum Curricular (BNCC) - Ciências Humanas",
      topics: [
        { id: 601, title: "Brasil Colônia", duration: 55, videos: 5, exercises: 10 },
        { id: 602, title: "Período Imperial", duration: 65, videos: 6, exercises: 12 },
        { id: 603, title: "República Velha", duration: 70, videos: 7, exercises: 15 },
      ]
    },
    {
      id: 7,
      title: "Geografia",
      description: "Explore a geografia física e humana do Brasil e do mundo",
      videoUrl: "https://www.youtube.com/embed/videoseries?list=PLnGI1S-odeaYjQTe0trBYzbCfkVKsINVQ",
      curriculum: "Base Nacional Comum Curricular (BNCC) - Ciências Humanas",
      topics: [
        { id: 701, title: "Geografia do Brasil", duration: 60, videos: 6, exercises: 12 },
        { id: 702, title: "Geopolítica Mundial", duration: 75, videos: 7, exercises: 14 },
        { id: 703, title: "Meio Ambiente e Sustentabilidade", duration: 65, videos: 6, exercises: 10 },
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
              Explore nossos cursos completos alinhados com o currículo escolar brasileiro, 
              com videoaulas, material de leitura e exercícios interativos
            </p>
            
            <div className="space-y-12">
              {availableCourses.map((course) => (
                <div key={course.id} className="space-y-6">
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/20 rounded-lg p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <h2 className="text-2xl font-semibold flex items-center mb-3">
                          <GraduationCap className="h-6 w-6 mr-2 text-primary" />
                          {course.title}
                        </h2>
                        <p className="text-muted-foreground mb-4">{course.description}</p>
                        
                        <div className="bg-secondary/20 p-2 rounded-md inline-block mb-4">
                          <span className="text-xs font-medium">Currículo: {course.curriculum}</span>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="bg-background/80 p-3 rounded-lg flex items-center">
                            <Video className="h-5 w-5 mr-2 text-primary" />
                            <div>
                              <p className="text-xs text-muted-foreground">Vídeos</p>
                              <p className="font-medium">{course.topics.reduce((acc, topic) => acc + topic.videos, 0)}</p>
                            </div>
                          </div>
                          <div className="bg-background/80 p-3 rounded-lg flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-primary" />
                            <div>
                              <p className="text-xs text-muted-foreground">Horas</p>
                              <p className="font-medium">{Math.round(course.topics.reduce((acc, topic) => acc + topic.duration, 0) / 60)}h</p>
                            </div>
                          </div>
                          <div className="bg-background/80 p-3 rounded-lg flex items-center">
                            <Brain className="h-5 w-5 mr-2 text-primary" />
                            <div>
                              <p className="text-xs text-muted-foreground">Exercícios</p>
                              <p className="font-medium">{course.topics.reduce((acc, topic) => acc + topic.exercises, 0)}</p>
                            </div>
                          </div>
                        </div>
                        
                        <Link to="/study" className="inline-flex">
                          <Button className="group">
                            Iniciar curso completo
                            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </Link>
                      </div>
                      
                      <div className="rounded-lg overflow-hidden bg-black aspect-video relative h-full max-h-[200px]">
                        <iframe 
                          className="w-full h-full" 
                          src={course.videoUrl}
                          title={`Curso de ${course.title}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-colors">
                          <PlayCircle className="h-16 w-16 text-white opacity-80" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    Tópicos do curso de {course.title}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {course.topics.map((topic) => (
                      <Card key={topic.id} className="hover:shadow-lg transition-shadow border border-primary/10">
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
