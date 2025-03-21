
import React from 'react';
import { BookOpen, Clock, CheckCircle, FileText, Video, BookOpenCheck, ChevronDown, ChevronUp, Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, Lock, CheckSquare } from 'lucide-react';

// Educational content organized by academic level, grade, and subject
export const studyMaterials = {
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

export type StudySession = {
  subject: string;
  topic: string;
  videoUrl: string;
  materials: Material[];
};

export type Material = {
  id: number;
  type: string;
  title: string;
  icon: React.ReactNode;
  completed: boolean;
  src?: string;
  description?: string;
};
