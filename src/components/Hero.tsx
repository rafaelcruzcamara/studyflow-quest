
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronRight, BookOpen, Target, BarChart } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const childElements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    childElements?.forEach((el) => observer.observe(el));

    return () => {
      childElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="min-h-screen relative flex flex-col items-center justify-center pt-20 pb-16 px-4 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-block animate-on-scroll opacity-0">
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-6">
            Transforme sua maneira de estudar
          </span>
        </div>
        
        <h1 className="heading-xl animate-on-scroll opacity-0 mb-6 max-w-4xl mx-auto text-balance">
          Estude com <span className="text-primary">eficiência</span>, aprenda com <span className="text-primary">inteligência</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-on-scroll opacity-0 text-balance">
          Planeje, estude e acompanhe seu progresso em uma plataforma intuitiva
          e personalizada para maximizar seu potencial de aprendizado.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-on-scroll opacity-0">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-medium shadow-md hover:shadow-lg transition-all group">
            <Link to="/dashboard">
              Começar agora
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="border-primary/20 text-primary hover:bg-primary/5">
            <Link to="/about">Saiba mais</Link>
          </Button>
        </div>
      </div>
      
      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-24">
        <div className="glass-card p-6 animate-on-scroll opacity-0">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Plano Personalizado</h3>
          <p className="text-muted-foreground">
            Estude com um plano adaptado ao seu ritmo e objetivos específicos.
          </p>
        </div>
        
        <div className="glass-card p-6 animate-on-scroll opacity-0">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Conteúdo Interativo</h3>
          <p className="text-muted-foreground">
            Aprenda com recursos dinâmicos que tornam o estudo mais engajador.
          </p>
        </div>
        
        <div className="glass-card p-6 animate-on-scroll opacity-0">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <BarChart className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Progresso Visível</h3>
          <p className="text-muted-foreground">
            Acompanhe seu desenvolvimento com métricas claras e visualizações.
          </p>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-pulse">
        <div className="w-8 h-14 rounded-full border-2 border-primary/20 flex items-center justify-center">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-[slide-down_1.5s_infinite]"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
