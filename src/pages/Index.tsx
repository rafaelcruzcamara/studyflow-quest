
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import { Button } from "@/components/ui/button";
import { BookOpen, BarChart3, Target, Layout, Cloud, Lock } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <Hero />
        
        <Features />
        
        {/* How it works section */}
        <section className="section" id="how-it-works">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-6">
                Como funciona
              </span>
              <h2 className="heading-lg mb-6">Uma jornada de aprendizado personalizada</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Nosso sistema adapta-se às suas necessidades, criando uma experiência
                de estudo única que evolui com você
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">1. Defina seus objetivos</h3>
                <p className="text-muted-foreground">
                  Comece configurando seu perfil de estudo e estabelecendo
                  suas metas de aprendizado.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Layout className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">2. Obtenha seu plano</h3>
                <p className="text-muted-foreground">
                  Receba um plano de estudos personalizado, com horários e 
                  conteúdos adaptados ao seu perfil.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">3. Acompanhe seu progresso</h3>
                <p className="text-muted-foreground">
                  Visualize métricas detalhadas sobre seu desempenho e evolua 
                  continuamente.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials section */}
        <section className="section bg-secondary/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-6">
                Depoimentos
              </span>
              <h2 className="heading-lg mb-6">O que nossos usuários dizem</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Maria Silva</h4>
                    <p className="text-sm text-muted-foreground">Estudante de Medicina</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "O StudyFlow revolucionou minha preparação para o vestibular de medicina. 
                  A organização e o acompanhamento do progresso são excelentes!"
                </p>
              </div>
              
              <div className="glass-card p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                    P
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Pedro Oliveira</h4>
                    <p className="text-sm text-muted-foreground">Ensino Médio</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Finalmente encontrei uma forma de organizar meus estudos que realmente 
                  funciona. Minhas notas melhoraram significativamente."
                </p>
              </div>
              
              <div className="glass-card p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Ana Costa</h4>
                    <p className="text-sm text-muted-foreground">Professora</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Como professora, recomendo o StudyFlow para todos os meus alunos. 
                  A plataforma oferece recursos incríveis para otimizar o aprendizado."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="section">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Pronto para transformar seus estudos?</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Junte-se a milhares de estudantes que já estão aproveitando uma 
              experiência de aprendizado personalizada e eficiente.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-medium shadow-md hover:shadow-lg transition-all">
              <BookOpen className="mr-2 h-5 w-5" />
              Começar Gratuitamente
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="bg-secondary/80 pt-16 pb-8">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-display font-bold text-primary mb-4">StudyFlow</h3>
              <p className="text-muted-foreground mb-4">
                Transformando a maneira como você aprende, um estudo de cada vez.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Plataforma</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Recursos</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Planos de Estudo</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Para Professores</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Para Escolas</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Suporte</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contato</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Comunidade</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Tutoriais</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacidade</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Cookies</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Licenças</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} StudyFlow. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Cloud className="h-4 w-4 mr-1" />
                <span>Status: Online</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Lock className="h-4 w-4 mr-1" />
                <span>Seguro e Protegido</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
