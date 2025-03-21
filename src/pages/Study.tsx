import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, CheckCircle, FileText, Video, BookOpenCheck, ChevronDown, ChevronUp, Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, Lock, CheckSquare } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Educational content organized by academic level, grade, and subject
const studyMaterials = {
  fundamental: {
    '1': [
      {
        subject: 'Matemática',
        topic: 'Adição e Subtração',
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PLAudUnJeNg4trL7IcV7pN4fiIrx7SBjL8",
        materials: [
          { id: 1, type: 'reading', title: 'Aprendendo a Somar e Subtrair', icon: <FileText className="h-5 w-5" />, completed: false },
          { id: 2, type: 'video', title: 'Vídeo: Números e Operações', icon: <Video className="h-5 w-5" />, completed: false, 
            src: "https://www.youtube.com/embed/0OmTlT4rrE4", 
            description: "Este vídeo ensina os conceitos básicos de adição e subtração para crianças, usando exemplos visuais e divertidos." },
          { id: 3, type: 'exercises', title: 'Exercícios de Adição e Subtração', icon: <BookOpenCheck className="h-5 w-5" />, completed: false },
        ]
      },
      {
        subject: 'Português',
        topic: 'Alfabetização',
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PLnGI1S-odeaYMeIhEMhkGHQ0Fq0wKQSvy",
        materials: [
          { id: 4, type: 'reading', title: 'Vogais e Consoantes', icon: <FileText className="h-5 w-5" />, completed: false },
          { id: 5, type: 'video', title: 'Vídeo: Alfabeto Completo', icon: <Video className="h-5 w-5" />, completed: false, 
            src: "https://www.youtube.com/embed/V8hHU-0mNQ8", 
            description: "Aula completa sobre o alfabeto, com pronúncia e exemplos de palavras para cada letra." },
          { id: 6, type: 'exercises', title: 'Atividades de Alfabetização', icon: <BookOpenCheck className="h-5 w-5" />, completed: false },
        ]
      }
    ],
    '2': [
      {
        subject: 'Matemática',
        topic: 'Multiplicação e Divisão',
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PLAudUnJeNg4trL7IcV7pN4fiIrx7SBjL8",
        materials: [
          { id: 7, type: 'reading', title: 'Entendendo a Multiplicação', icon: <FileText className="h-5 w-5" />, completed: false },
          { id: 8, type: 'video', title: 'Vídeo: Aprendendo a Multiplicar', icon: <Video className="h-5 w-5" />, completed: false, 
            src: "https://www.youtube.com/embed/oF-29kGcwqc", 
            description: "Aula sobre multiplicação para crianças do 2º ano do ensino fundamental." },
          { id: 9, type: 'exercises', title: 'Exercícios de Multiplicação', icon: <BookOpenCheck className="h-5 w-5" />, completed: false },
        ]
      }
    ],
    '3': [
      {
        subject: 'Ciências',
        topic: 'O Corpo Humano',
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-8d0vXc7xnrGiKdGKlh34FiG-GKsQqy3",
        materials: [
          { id: 10, type: 'reading', title: 'Conhecendo o Corpo Humano', icon: <FileText className="h-5 w-5" />, completed: false },
          { id: 11, type: 'video', title: 'Vídeo: Os Sistemas do Corpo', icon: <Video className="h-5 w-5" />, completed: false, 
            src: "https://www.youtube.com/embed/yYAw79zXDYI", 
            description: "Aula sobre os principais sistemas do corpo humano para crianças." },
          { id: 12, type: 'exercises', title: 'Atividades sobre o Corpo Humano', icon: <BookOpenCheck className="h-5 w-5" />, completed: false },
        ]
      }
    ],
    '4': [
      {
        subject: 'Geografia',
        topic: 'Regiões do Brasil',
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PLEv1VduFnHQEZ9QmPlZunUk4heuaDKbIJ",
        materials: [
          { id: 13, type: 'reading', title: 'Conhecendo as Regiões Brasileiras', icon: <FileText className="h-5 w-5" />, completed: false },
          { id: 14, type: 'video', title: 'Vídeo: As 5 Regiões do Brasil', icon: <Video className="h-5 w-5" />, completed: false, 
            src: "https://www.youtube.com/embed/HnN4nIWjxFE", 
            description: "Aula detalhada sobre as cinco regiões do Brasil e suas características." },
          { id: 15, type: 'exercises', title: 'Exercícios sobre Regiões do Brasil', icon: <BookOpenCheck className="h-5 w-5" />, completed: false },
        ]
      }
    ],
    '5': [
      {
        subject: 'História',
        topic: 'Povos Indígenas do Brasil',
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PLBsLLHVXzuOFyt-_tmACm0vRZkzrfIPH-",
        materials: [
          { id: 16, type: 'reading', title: 'Os Primeiros Habitantes do Brasil', icon: <FileText className="h-5 w-5" />, completed: false },
          { id: 17, type: 'video', title: 'Vídeo: Povos Indígenas Brasileiros', icon: <Video className="h-5 w-5" />, completed: false, 
            src: "https://www.youtube.com/embed/wHzBCOwo6qA", 
            description: "Aula sobre os principais povos indígenas que habitavam o Brasil antes da colonização." },
          { id: 18, type: 'exercises', title: 'Atividades sobre Povos Indígenas', icon: <BookOpenCheck className="h-5 w-5" />, completed: false },
        ]
      }
    ]
  },
  medio: {
    '1': [
      {
        subject: 'Matemática',
        topic: 'Geometria Analítica',
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PLAudUnJeNg4trL7IcV7pN4fiIrx7SBjL8",
        materials: [
          { id: 1, type: 'reading', title: 'Princípios de Geometria Analítica', icon: <FileText className="h-5 w-5" />, completed: false },
          { id: 2, type: 'video', title: 'Geometria Analítica na prática', icon: <Video className="h-5 w-5" />, completed: false, 
            src: "https://www.youtube.com/embed/q2vqE4Sv7-8", 
            description: "Esta aula aborda os conceitos fundamentais da geometria analítica, incluindo coordenadas cartesianas, equações de retas e cônicas." },
          { id: 3, type: 'exercises', title: 'Exercícios de fixação', icon: <BookOpenCheck className="h-5 w-5" />, completed: false },
        ]
      },
      {
        subject: 'Física',
        topic: 'Cinemática',
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL1ELCTiItg0Nri25ONSYEjzqfQmcXFOi6",
        materials: [
          { id: 4, type: 'reading', title: 'Movimento Retilíneo Uniforme', icon: <FileText className="h-5 w-5" />, completed: false },
          { id: 5, type: 'video', title: 'Vídeo: Conceitos de Cinemática', icon: <Video className="h-5 w-5" />, completed: false, 
            src: "https://www.youtube.com/embed/NPi_q4IoEtE", 
            description: "Aula completa sobre os princípios da cinemática, com exemplos práticos de movimento retilíneo uniforme e uniformemente variado." },
          { id: 6, type: 'exercises', title: 'Problemas de Cinemática', icon: <BookOpenCheck className="h-5 w-5" />, completed: false },
        ]
      }
    ],
    '2': [
      {
        subject: 'Química',
        topic: 'Reações Químicas',
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PLf1lowbdbFIAGzn9OQPD97Da9TOoZddOF",
        materials: [
          { id: 7, type: 'reading', title: 'Princípios das Reações Químicas', icon: <FileText className="h-5 w-5" />, completed: false },
          { id: 8, type: 'video', title: 'Vídeo: Balanceamento de Equações', icon: <Video className="h-5 w-5" />, completed: false, 
            src: "https://www.youtube.com/embed/eNmapILUgH4", 
            description: "Aula sobre como balancear equações químicas e os diferentes tipos de reações." },
          { id: 9, type: 'exercises', title: 'Exercícios sobre Reações Químicas', icon: <BookOpenCheck className="h-5 w-5" />, completed: false },
        ]
      }
    ],
    '3': [
      {
        subject: 'Biologia',
        topic: 'Genética',
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL3qONjKuaO2QWcMF1vivaYRg6O-P0GA4Y",
        materials: [
          { id: 10, type: 'reading', title: 'Leis de Mendel', icon: <FileText className="h-5 w-5" />, completed: false },
          { id: 11, type: 'video', title: 'Vídeo: Genética Básica', icon: <Video className="h-5 w-5" />, completed: false, 
            src: "https://www.youtube.com/embed/ROKxHIZqnho", 
            description: "Aula sobre as leis de Mendel e os princípios básicos da genética." },
          { id: 12, type: 'exercises', title: 'Exercícios de Genética', icon: <BookOpenCheck className="h-5 w-5" />, completed: false },
        ]
      }
    ]
  },
  superior: {
    '1': [
      {
        subject: 'Cálculo',
        topic: 'Limites e Derivadas',
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PLAudUnJeNg4trL7IcV7pN4fiIrx7SBjL8",
        materials: [
          { id: 1, type: 'reading', title: 'Introdução ao Cálculo Diferencial', icon: <FileText className="h-5 w-5" />, completed: false },
          { id: 2, type: 'video', title: 'Vídeo: Limites e Continuidade', icon: <Video className="h-5 w-5" />, completed: false, 
            src: "https://www.youtube.com/embed/riXcZT2ICjA", 
            description: "Esta aula aborda os conceitos fundamentais de limites, continuidade e introdução às derivadas no cálculo diferencial." },
          { id: 3, type: 'exercises', title: 'Exercícios de Derivadas', icon: <BookOpenCheck className="h-5 w-5" />, completed: false },
        ]
      },
      {
        subject: 'Programação',
        topic: 'Algoritmos e Estruturas de Dados',
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PLHz_AreHm4dkZ9-atkcmcBaMZdmLHft8n", // Curso de Python
        materials: [
          { id: 4, type: 'reading', title: 'Algoritmos Básicos', icon: <FileText className="h-5 w-5" />, completed: false },
          { id: 5, type: 'video', title: 'Vídeo: Introdução à Programação', icon: <Video className="h-5 w-5" />, completed: false, 
            src: "https://www.youtube.com/embed/8mei6uVttho", 
            description: "Aula introdutória sobre algoritmos e lógica de programação, abordando conceitos fundamentais para iniciantes." },
          { id: 6, type: 'exercises', title: 'Desafios de Programação', icon: <BookOpenCheck className="h-5 w-5" />, completed: false },
        ]
      }
    ],
    '2': [
      {
        subject: 'Física',
        topic: 'Mecânica Quântica',
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL1ELCTiItg0Nri25ONSYEjzqfQmcXFOi6",
        materials: [
          { id: 7, type: 'reading', title: 'Introdução à Mecânica Quântica', icon: <FileText className="h-5 w-5" />, completed: false },
          { id: 8, type: 'video', title: 'Vídeo: Fundamentos da Mecânica Quântica', icon: <Video className="h-5 w-5" />, completed: false, 
            src: "https://www.youtube.com/embed/WIyTZDHuarQ", 
            description: "Aula sobre os conceitos básicos da mecânica quântica e suas aplicações." },
          { id: 9, type: 'exercises', title: 'Exercícios de Mecânica Quântica', icon: <BookOpenCheck className="h-5 w-5" />, completed: false },
        ]
      }
    ],
    '3': [
      {
        subject: 'Engenharia',
        topic: 'Resistência dos Materiais',
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PLLPZCzxZLaIXXliHr-8c6p_xQ_mYpRRNQ",
        materials: [
          { id: 10, type: 'reading', title: 'Princípios de Resistência dos Materiais', icon: <FileText className="h-5 w-5" />, completed: false },
          { id: 11, type: 'video', title: 'Vídeo: Tensão e Deformação', icon: <Video className="h-5 w-5" />, completed: false, 
            src: "https://www.youtube.com/embed/PN13QMOpisw", 
            description: "Aula sobre tensão, deformação e as propriedades mecânicas dos materiais." },
          { id: 12, type: 'exercises', title: 'Exercícios de Resistência dos Materiais', icon: <BookOpenCheck className="h-5 w-5" />, completed: false },
        ]
      }
    ]
  }
};

const Study: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("conteudo");
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [showAnswer, setShowAnswer] = useState<{[key: number]: boolean}>({});
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<number | null>(null);
  const [availableSubjects, setAvailableSubjects] = useState<any[]>([]);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Get user's education level and grade from auth context
  const userLevel = user?.educationLevel || 'medio';  // Default to 'medio' if not set
  const userGrade = user?.grade || '1';  // Default to '1' if not set

  useEffect(() => {
    // Initialize available subjects based on user's education level and grade
    if (userLevel && userGrade && studyMaterials[userLevel as keyof typeof studyMaterials]?.[userGrade as any]) {
      const subjects = studyMaterials[userLevel as keyof typeof studyMaterials][userGrade as any];
      setAvailableSubjects(subjects);
      
      // Select first subject by default
      if (subjects.length > 0 && !selectedSubject) {
        setSelectedSubject(subjects[0].subject);
        setCurrentSession(subjects[0]);
        
        // Select first material by default
        if (subjects[0].materials.length > 0) {
          setSelectedMaterial(subjects[0].materials[0].id);
        }
      }
    }
  }, [userLevel, userGrade, selectedSubject]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timerActive) {
      interval = setInterval(() => {
        if (timerSeconds === 0) {
          if (timerMinutes === 0) {
            clearInterval(interval);
            setTimerActive(false);
            toast({
              title: "Tempo finalizado!",
              description: "Sua sessão de estudo foi concluída.",
            });
          } else {
            setTimerMinutes(timerMinutes - 1);
            setTimerSeconds(59);
          }
        } else {
          setTimerSeconds(timerSeconds - 1);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerMinutes, timerSeconds, timerActive]);

  const toggleTimer = () => {
    setTimerActive(!timerActive);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setTimerMinutes(25);
    setTimerSeconds(0);
  };

  const toggleShowAnswer = (exerciseId: number) => {
    setShowAnswer(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };

  const markMaterialAsCompleted = (materialId: number) => {
    if (!currentSession) return;
    
    const updatedMaterials = currentSession.materials.map((material: any) => 
      material.id === materialId ? { ...material, completed: true } : material
    );
    
    setCurrentSession({
      ...currentSession,
      materials: updatedMaterials
    });
    
    toast({
      title: "Material marcado como concluído",
      description: "Seu progresso foi atualizado!",
    });
  };

  const handleSubjectChange = (subject: string) => {
    setSelectedSubject(subject);
    const newSession = availableSubjects.find(s => s.subject === subject);
    setCurrentSession(newSession);
    
    // Select first material by default
    if (newSession && newSession.materials.length > 0) {
      setSelectedMaterial(newSession.materials[0].id);
      
      // Switch to the appropriate tab based on material type
      if (newSession.materials[0].type === 'reading' || newSession.materials[0].type === 'video') {
        setActiveTab('conteudo');
      } else if (newSession.materials[0].type === 'exercises') {
        setActiveTab('exercicios');
      }
    }
  };

  const handleSelectMaterial = (id: number) => {
    setSelectedMaterial(id);
    
    if (!currentSession) return;
    
    // Switch to the appropriate tab based on material type
    const material = currentSession.materials.find((m: any) => m.id === id);
    if (material) {
      if (material.type === 'reading' || material.type === 'video') {
        setActiveTab('conteudo');
      } else if (material.type === 'exercises') {
        setActiveTab('exercicios');
      }
    }
  };

  const toggleVideoPlay = () => {
    setIsPlaying(!isPlaying);
    // In a real application, you would control the video playback here
  };

  const toggleVideoMute = () => {
    setIsMuted(!isMuted);
    // In a real application, you would control the video volume here
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    // In a real application, you would set the video volume here
  };

  const increaseVideoProgress = () => {
    // Simulating video progress for demonstration
    setVideoProgress(prev => Math.min(prev + 10, 100));
  };

  useEffect(() => {
    // Update video progress periodically for demonstration
    const interval = setInterval(() => {
      if (isPlaying && activeTab === 'conteudo') {
        increaseVideoProgress();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, activeTab]);

  const renderSelectedContent = () => {
    if (!currentSession) return null;
    
    const material = currentSession.materials.find((m: any) => m.id === selectedMaterial);
    
    if (!material) return null;
    
    if (material.type === 'video' && 'src' in material) {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{material.title}</h2>
          
          {material.description && (
            <p className="text-muted-foreground mb-4">{material.description}</p>
          )}
          
          <div className="rounded-lg overflow-hidden bg-black aspect-video relative">
            <iframe 
              ref={videoRef}
              className="w-full h-full" 
              src={material.src}
              title={material.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            
            {/* Custom video controls overlay - note: these don't control the YouTube video but are for UI demonstration */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 transition-opacity opacity-100 hover:opacity-100">
              <div className="w-full mb-2">
                <Progress value={videoProgress} className="h-1 bg-gray-600" />
              </div>
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-3">
                  <button onClick={toggleVideoPlay} className="p-1 rounded-full hover:bg-white/20">
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </button>
                  <div className="flex items-center space-x-2">
                    <button onClick={toggleVideoMute} className="p-1 rounded-full hover:bg-white/20">
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                    <div className="w-20 hidden sm:block">
                      <Slider
                        value={[volume]}
                        max={100}
                        step={1}
                        onValueChange={handleVolumeChange}
                        className="h-1"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-xs opacity-90">
                  {Math.floor(videoProgress / 100 * 10)}:
                  {Math.floor((videoProgress / 100 * 10 * 60) % 60).toString().padStart(2, '0')} / 
                  10:00
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-medium">Sobre este vídeo</h3>
            <p className="text-muted-foreground">
              Este vídeo faz parte do curso de {currentSession.subject} sobre {currentSession.topic}.
              Assista com atenção e faça anotações para melhor compreensão do conteúdo.
            </p>
            
            <div className="p-4 bg-secondary/50 rounded-lg">
              <h4 className="font-medium mb-2">Pontos importantes:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Preste atenção aos conceitos fundamentais apresentados</li>
                <li>Pause o vídeo para fazer anotações quando necessário</li>
                <li>Tente resolver os exemplos antes de ver a solução</li>
                <li>Após assistir, faça os exercícios relacionados para fixação</li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={() => markMaterialAsCompleted(material.id)}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Marcar como concluído
            </Button>
          </div>
        </div>
      );
    }
    
    if (material.type === 'reading') {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {currentSession.subject}: {currentSession.topic}
          </h2>
          
          {currentSession.subject === 'Matemática' && currentSession.topic === 'Geometria Analítica' && (
            <>
              <p className="text-muted-foreground">
                A Geometria Analítica é um campo da matemática que une a álgebra e a geometria, 
                permitindo que problemas geométricos sejam estudados através de equações algébricas.
              </p>
              
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="text-lg font-medium mb-2">Objetivos de Aprendizagem</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Compreender o sistema de coordenadas cartesianas</li>
                  <li>Aprender a representar pontos, retas e figuras no plano</li>
                  <li>Aplicar fórmulas para calcular distâncias e áreas</li>
                  <li>Resolver problemas envolvendo equações de retas e cônicas</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 my-6">
                <h3 className="text-lg font-medium mt-2 mb-4 text-primary">Sistema de Coordenadas Cartesianas</h3>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <p>
                      O sistema de coordenadas cartesianas consiste em dois eixos perpendiculares:
                      o eixo horizontal (eixo x) e o eixo vertical (eixo y). Qualquer ponto no plano
                      pode ser localizado através de um par ordenado de números (x, y).
                    </p>
                    
                    <div className="p-4 bg-blue-50 rounded-lg mt-4 border border-blue-100">
                      <h4 className="font-medium text-blue-800">Exemplo:</h4>
                      <p className="mt-2">
                        O ponto A tem coordenadas (3, 4), significando que está localizado
                        3 unidades à direita da origem no eixo x e 4 unidades acima no eixo y.
                      </p>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 flex items-center justify-center">
                    <div className="relative w-48 h-48 border border-gray-300 rounded">
                      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-300"></div>
                      <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-300"></div>
                      <div className="absolute left-[calc(50%+3*8px)] top-[calc(50%-4*8px)] h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="absolute left-[calc(50%+3*8px+4px)] top-[calc(50%-4*8px-12px)] text-xs">A(3,4)</div>
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs">+x</div>
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs">+y</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mt-6">Distância entre dois pontos</h3>
              <p>
                Para calcular a distância entre dois pontos A(x₁, y₁) e B(x₂, y₂),
                utilizamos a fórmula:
              </p>
              
              <div className="p-4 bg-secondary/50 rounded-lg mt-2 flex flex-col items-center">
                <h4 className="font-medium text-center">Fórmula da distância:</h4>
                <div className="font-mono bg-white/70 p-3 rounded mt-2 text-center w-64">
                  d = √[(x₂ - x₁)² + (y₂ - y₁)²]
                </div>
                <div className="mt-4 w-full max-w-sm">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Distancia_entre_dois_pontos.svg/500px-Distancia_entre_dois_pontos.svg.png" 
                    alt="Representação gráfica da distância entre dois pontos"
                    className="w-full rounded-lg shadow-sm"
                  />
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border border-green-100 mt-4">
                <h4 className="font-medium mb-2 text-green-800">Exemplo resolvido:</h4>
                <p>Calcular a distância entre os pontos P(2, 3) e Q(5, 7):</p>
                <div className="font-mono mt-2 p-3 bg-white rounded">
                  d = √[(5 - 2)² + (7 - 3)²]<br/>
                  d = √[9 + 16]<br/>
                  d = √25<br/>
                  d = 5
                </div>
              </div>
              
              <h3 className="text-lg font-medium mt-6">Equação da Reta</h3>
              <p>
                A equação geral da reta é dada por: ax + by + c = 0. Existem várias formas de
                representar uma reta, como:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <h4 className="font-medium text-purple-800">Forma reduzida:</h4>
                  <div className="font-mono bg-white/70 p-2 rounded mt-2 text-center">
                    y = mx + n
                  </div>
                  <p className="mt-2 text-sm">
                    Onde m é o coeficiente angular (inclinação) e n é o coeficiente linear
                  </p>
                </div>
                
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <h4 className="font-medium text-amber-800">Equação segmentária:</h4>
                  <div className="font-mono bg-white/70 p-2 rounded mt-2 text-center">
                    x/a + y/b = 1
                  </div>
                  <p className="mt-2 text-sm">
                    Onde a e b são os interceptos nos eixos x e y
                  </p>
                </div>
              </div>
              
              <div className="p-4 bg-secondary/50 rounded-lg mt-4">
                <h4 className="font-medium">Coeficiente Angular (m):</h4>
                <div className="font-mono bg-white/70 p-2 rounded mt-2 text-center">
                  m = (y₂ - y₁) / (x₂ - x₁)
                </div>
                <p className="mt-2 text-sm">
                  O coeficiente angular representa a inclinação da reta em relação ao eixo x.
                </p>
                <div className="mt-3 w-full flex justify-center">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Coefficient-directeur.svg/500px-Coefficient-directeur.svg.png" 
                    alt="Coeficiente angular de uma reta"
                    className="w-2/3 rounded-lg shadow-sm"
                  />
                </div>
              </div>
            </>
          )}
          
          {currentSession.subject === 'Português' && currentSession.topic === 'Alfabetização' && (
            <>
              <p className="text-muted-foreground">
                A alfabetização é o processo de aprendizagem onde se desenvolve a habilidade de ler e escrever.
                É uma das etapas mais importantes na educação de uma criança.
              </p>
              
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="text-lg font-medium mb-2">Objetivos de Aprendizagem</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Conhecer todas as letras do alfabeto</li>
                  <li>Compreender a diferença entre vogais e consoantes</li>
                  <li>Formar sílabas e palavras simples</li>
                  <li>Desenvolver a leitura de pequenos textos</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 my-6">
                <h3 className="text-lg font-medium mt-2 mb-4 text-primary">O Alfabeto</h3>
                <p>
                  O alfabeto da língua portuguesa é composto por 26 letras:
                </p>
                
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map((letter) => (
                    <div key={letter} className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-100 text-blue-800 font-bold text-xl hover:bg-blue-200 transition-colors cursor-pointer">
                      {letter}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 w-full flex justify-center">
                  <img 
                    src="https://cdn.pixabay.com/photo/2016/08/07/11/05/school-1576128_1280.jpg" 
                    alt="Letras do alfabeto"
                    className="w-2/3 rounded-lg shadow-sm"
                  />
                </div>
              </div>
              
              <h3 className="text-lg font-medium mt-6">Vogais e Consoantes</h3>
              <p>
                As letras do alfabeto são divididas em vogais e consoantes:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                <div className="p-5 bg-blue-100/50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-3">Vogais</h4>
                  <div className="flex justify-between">
                    {['A', 'E', 'I', 'O', 'U'].map((letter) => (
                      <div key={letter} className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-200 font-bold text-xl text-blue-800 hover:bg-blue-300 transition-colors cursor-pointer">
                        {letter}
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-blue-900">
                    Vogais são os sons produzidos sem obstrução da passagem de ar pela boca.
                    Podem formar sílabas sozinhas.
                  </p>
                  <div className="mt-3 p-2 bg-white rounded-lg">
                    <h5 className="text-sm font-medium mb-1">Exemplos de palavras:</h5>
                    <div className="flex flex-wrap gap-2">
                      {['Água', 'Ema', 'Ilha', 'Ovo', 'Uva'].map((word) => (
                        <div key={word} className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-sm">
                          {word}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="p-5 bg-green-100/50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-3">Consoantes</h4>
                  <p className="text-green-900">
                    As consoantes são todas as outras letras do alfabeto que não são vogais.
                    Elas são produzidas com alguma obstrução da passagem de ar pela boca e
                    geralmente precisam de vogais para formar sílabas.
                  </p>
                  <div className="mt-3 p-2 bg-white rounded-lg">
                    <h5 className="text-sm font-medium mb-1">Exemplos de consoantes:</h5>
                    <div className="flex flex-wrap gap-2">
                      {['B', 'C', 'D', 'F', 'G', 'H', 'J', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'X', 'Z'].map((letter) => (
                        <div key={letter} className="flex items-center justify-center w-8 h-8 rounded-md bg-green-200 font-bold text-green-800">
                          {letter}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mt-6">Formação de Sílabas</h3>
              <p>
                Sílabas são unidades fonológicas que compõem as palavras. A maioria das sílabas
                em português é formada por uma consoante seguida de uma vogal (CV).
              </p>
              
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100 mt-3">
                <h4 className="font-medium mb-2 text-yellow-800">Exemplos de sílabas:</h4>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {['BA', 'BE', 'BI', 'BO', 'BU', 'CA', 'CE', 'CI', 'CO', 'CU', 'DA', 'DE', 'DI', 'DO', 'DU', 'FA', 'FE', 'FI'].map((syllable) => (
                    <div key={syllable} className="flex items-center justify-center h-10 rounded-md bg-yellow-200 font-bold text-yellow-800">
                      {syllable}
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-white rounded-lg">
                  <h5 className="text-sm font-medium mb-2">Experimente formar palavras com as sílabas:</h5>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['BO', 'LA', 'CA', 'SA', 'ME', 'NI', 'NO', 'PA', 'TO'].map((syllable) => (
                      <div key={syllable} className="px-2 py-1 bg-yellow-100 rounded cursor-pointer hover:bg-yellow-200 transition-colors">
                        {syllable}
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border border-dashed border-yellow-300 rounded-lg text-center min-h-[40px]">
                    Arraste as sílabas para formar palavras
                  </div>
                </div>
              </div>
            </>
          )}
          
          <div className="flex justify-end">
            <Button 
              onClick={() => markMaterialAsCompleted(material.id)}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Marcar como concluído
            </Button>
          </div>
        </div>
      );
    }
    
    return null;
  };

  const renderExercises = () => {
    if (!currentSession) return null;
    
    return (
      <div className="space-y-4 animate-fade-in">
        <h2 className="text-xl font-semibold">Exercícios de {currentSession.topic}</h2>
        <div className="space-y-6">
          {[1, 2, 3].map((exerciseId) => (
            <div key={exerciseId} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <p className="font-medium">Exercício {exerciseId}:</p>
                <span className="px-2 py-1 bg-secondary/70 text-xs rounded-full">
                  {currentSession.subject}
                </span>
              </div>
              
              <p className="mt-2">
                {currentSession.subject === 'Matemática' && exerciseId === 1 && "Calcule a distância entre os pontos A(3, 4) e B(7, 9)."}
                {currentSession.subject === 'Matemática' && exerciseId === 2 && "Determine a equação da reta que passa pelos pontos P(2, 3) e Q(-1, 5)."}
                {currentSession.subject === 'Matemática' && exerciseId === 3 && "Verifique se os pontos A(1, 2), B(4, 6) e C(7, 10) são colineares."}
                
                {currentSession.subject === 'Português' && exerciseId === 1 && "Separe as sílabas das palavras: casa, escola, professor, livro."}
                {currentSession.subject === 'Português' && exerciseId === 2 && "Circule as vogais nas palavras: computador, biblioteca, estudante."}
                {currentSession.subject === 'Português' && exerciseId === 3 && "Forme palavras com as sílabas: CA, SA, ME, NI, NO, LA."}
                
                {currentSession.subject === 'Física' && exerciseId === 1 && "Um carro viaja a 72 km/h. Calcule essa velocidade em m/s."}
                {currentSession.subject === 'Física' && exerciseId === 2 && "Um objeto é lançado verticalmente para cima com velocidade inicial de 20 m/s. Desprezando a resistência do ar e considerando g = 10 m/s², calcule a altura máxima atingida pelo objeto."}
                {currentSession.subject === 'Física' && exerciseId === 3 && "Um móvel parte do repouso e atinge a velocidade de 108 km/h em 15 segundos. Determine a aceleração do móvel em m/s²."}
              </p>
              
              <div className="mt-4 p-3 bg-secondary/20 rounded-lg">
                <p className="text-sm text-muted-foreground">Tente resolver o exercício antes de ver a resposta.</p>
                <textarea
                  className="w-full mt-2 p-2 rounded border min-h-[80px] focus:ring-1 focus:ring-primary"
                  placeholder="Digite sua resposta aqui..."
                ></textarea>
              </div>
              
              {showAnswer[exerciseId] && (
                <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="font-medium text-green-800">Resposta:</p>
                  <p className="mt-1 text-green-900">
                    {currentSession.subject === 'Matemática' && exerciseId === 1 && "d = √[(7-3)² + (9-4)²] = √[16 + 25] = √41 ≈ 6,40"}
                    {currentSession.subject === 'Matemática' && exerciseId === 2 && "Usando a fórmula (y - y₁) = m(x - x₁), onde m = (y₂ - y₁)/(x₂ - x₁) = (5-3)/(-1-2) = 2/(-3) = -2/3. Logo, (y - 3) = -2/3(x - 2), que resulta em y = -2x/3 + 11/3."}
                    {currentSession.subject === 'Matemática' && exerciseId === 3 && "Para verificar se os pontos são colineares, calculamos a inclinação entre A e B: (6-2)/(4-1) = 4/3, e entre B e C: (10-6)/(7-4) = 4/3. Como as inclinações são iguais, os pontos são colineares."}
                    
                    {currentSession.subject === 'Português' && exerciseId === 1 && "ca-sa, es-co-la, pro-fes-sor, li-vro"}
                    {currentSession.subject === 'Português' && exerciseId === 2 && "cOmputAdOr, bIblIOtEcA, EstUdAntE"}
                    {currentSession.subject === 'Português' && exerciseId === 3 && "CASA, CANO, MENO, MELA, SALA, CAMELO, CAMISA, MENINO"}
                    
                    {currentSession.subject === 'Física' && exerciseId === 1 && "72 km/h = 72 × (1000/3600) = 20 m/s"}
                    {currentSession.subject === 'Física' && exerciseId === 2 && "Usando a equação v² = v₀² - 2gh, temos: 0 = 20² - 2×10×h → h = 400/20 = 20 metros"}
                    {currentSession.subject === 'Física' && exerciseId === 3 && "a = (vf - v0)/t = (108 km/h - 0)/15s = (108 × 1000/3600)/15 = 30/15 = 2 m/s²"}
                  </p>
                </div>
              )}
              
              <div className="mt-4 flex space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => toggleShowAnswer(exerciseId)}
                >
                  {showAnswer[exerciseId] ? "Ocultar resposta" : "Ver resposta"}
                </Button>
                <Button size="sm" className="bg-primary/90 hover:bg-primary">
                  Enviar minha resposta
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Acesso Restrito</CardTitle>
            <CardDescription>
              Você precisa estar autenticado para acessar este conteúdo.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="mb-4 text-center">Faça login ou crie uma conta para continuar.</p>
            <div className="flex gap-4">
              <Button onClick={() => window.location.href = "/login"}>
                Login
              </Button>
              <Button variant="outline" onClick={() => window.location.href = "/register"}>
                Cadastrar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header com informações da sessão */}
          <div className="py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <div className="mb-4">
                  <Select value={selectedSubject || ''} onValueChange={handleSubjectChange}>
                    <SelectTrigger className="w-full md:w-[250px]">
                      <SelectValue placeholder="Selecione a matéria" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSubjects.map((subject) => (
                        <SelectItem key={subject.subject} value={subject.subject}>
                          {subject.subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {currentSession && (
                  <>
                    <h1 className="text-2xl md:text-3xl font-bold font-display">
                      {currentSession.subject}: {currentSession.topic}
                    </h1>
                    <p className="text-muted-foreground">
                      Conteúdo para {userLevel === 'fundamental' ? 'Ensino Fundamental' : 
                                    userLevel === 'medio' ? 'Ensino Médio' : 'Ensino Superior'} - 
                      {userLevel === 'superior' ? ` ${userGrade}º Período` : ` ${userGrade}º Ano`}
                    </p>
                  </>
                )}
              </div>
              
              <div className="mt-4 md:mt-0">
                <Card className="border-none bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                  <CardContent className="p-4 flex items-center space-x-4">
                    <div className="p-2 rounded-full bg-white/10">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Tempo de Estudo</p>
                      <p className="text-2xl font-mono">{timerMinutes.toString().padStart(2, '0')}:{timerSeconds.toString().padStart(2, '0')}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        onClick={toggleTimer}
                        className="bg-white/10 hover:bg-white/20 text-white"
                      >
                        {timerActive ? 'Pausar' : 'Iniciar'}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        onClick={resetTimer}
                        className="bg-white/10 hover:bg-white/20 text-white"
                      >
                        Reiniciar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          {/* Conteúdo principal */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar com materiais */}
            <div className="lg:col-span-1">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-lg">
                  <CardTitle className="flex items-center text-lg">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    Materiais de Estudo
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  {currentSession ? (
                    <div className="space-y-3">
                      {currentSession.materials.map((material: any) => (
                        <div 
                          key={material.id} 
                          className={cn(
                            "flex items-center p-3 rounded-lg border transition-all",
                            selectedMaterial === material.id 
                              ? 'bg-primary/10 border-primary/30 shadow-sm' 
                              : 'hover:bg-secondary/50 cursor-pointer'
                          )}
                          onClick={() => handleSelectMaterial(material.id)}
                        >
                          <div className="p-2 rounded-full bg-primary/10 mr-3">
                            {material.icon}
                          </div>
                          <div>
                            <p className="font-medium">{material.title}</p>
                            <p className="text-xs text-muted-foreground capitalize">{material.type}</p>
                          </div>
                          <div className="ml-auto">
                            <CheckCircle className={`h-5 w-5 ${material.completed ? 'text-green-500' : 'text-muted-foreground/30'}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Selecione uma matéria para ver os materiais disponíveis</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Progresso do Curso */}
              {currentSession && (
                <Card className="mt-6 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-t-lg">
                    <CardTitle className="text-lg">Seu Progresso</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Progresso geral</span>
                          <span>20%</span>
                        </div>
                        <Progress value={20} className="h-2.5" />
                      </div>
                      
                      <div className="p-4 bg-secondary/40 rounded-lg">
                        <p className="text-sm font-medium mb-2">Estatísticas</p>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="p-2 rounded-lg bg-secondary">
                            <p className="text-2xl font-bold">1</p>
                            <p className="text-xs text-muted-foreground">Concluídos</p>
                          </div>
                          <div className="p-2 rounded-lg bg-secondary">
                            <p className="text-2xl font-bold">2</p>
                            <p className="text-xs text-muted-foreground">Em andamento</p>
                          </div>
                          <div className="p-2 rounded-lg bg-secondary">
                            <p className="text-2xl font-bold">45</p>
                            <p className="text-xs text-muted-foreground">Minutos</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Área de conteúdo principal */}
            <div className="lg:col-span-3">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-t-lg">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="conteudo">Conteúdo</TabsTrigger>
                      <TabsTrigger value="exercicios">Exercícios</TabsTrigger>
                      <TabsTrigger value="anotacoes">Anotações</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="animate-fade-in">
                    {activeTab === "conteudo" && renderSelectedContent()}
                    {activeTab === "exercicios" && renderExercises()}
                    {activeTab === "anotacoes" && (
                      <div className="space-y-4 animate-fade-in">
                        <h2 className="text-xl font-semibold">Suas Anotações</h2>
                        <div className="p-4 border rounded-lg min-h-[300px] shadow-inner bg-white/50">
                          <textarea 
                            className="w-full h-full min-h-[250px] bg-transparent outline-none resize-none focus:ring-0 p-2"
                            placeholder="Digite suas anotações aqui..."
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button onClick={() => toast({
                            title: "Anotações salvas",
                            description: "Suas anotações foram salvas com sucesso!"
                          })}>
                            Salvar Anotações
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Study;
