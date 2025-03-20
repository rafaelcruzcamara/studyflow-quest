
import React from 'react';
import { 
  BookOpen, 
  BarChart3, 
  Video, 
  Users, 
  Calendar, 
  Award, 
  CheckCircle2
} from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      title: "Plano de Estudos Inteligente",
      description: "Cronograma personalizado baseado nos seus objetivos e tempo disponível.",
      icon: <Calendar className="h-7 w-7 text-primary" />,
    },
    {
      title: "Conteúdo Multimídia",
      description: "Videaulas, podcasts e material interativo para diferentes estilos de aprendizado.",
      icon: <Video className="h-7 w-7 text-primary" />,
    },
    {
      title: "Grupos de Estudo",
      description: "Conecte-se com outros estudantes para compartilhar conhecimento e tirar dúvidas.",
      icon: <Users className="h-7 w-7 text-primary" />,
    },
    {
      title: "Avaliações Periódicas",
      description: "Simulados e exercícios para testar seu conhecimento e identificar pontos a melhorar.",
      icon: <CheckCircle2 className="h-7 w-7 text-primary" />,
    },
    {
      title: "Recursos Educativos",
      description: "Biblioteca de materiais organizados por disciplina e nível de dificuldade.",
      icon: <BookOpen className="h-7 w-7 text-primary" />,
    },
    {
      title: "Estatísticas Detalhadas",
      description: "Acompanhe seu progresso com gráficos e métricas de desempenho.",
      icon: <BarChart3 className="h-7 w-7 text-primary" />,
    },
  ];

  return (
    <section id="features" className="section bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-6">
            Recursos
          </span>
          <h2 className="heading-lg mb-6">Tudo o que você precisa para estudar melhor</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Ferramentas desenvolvidas para maximizar sua eficiência e elevar sua experiência de aprendizado
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-6 hover:translate-y-[-4px] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 bg-primary/5 border border-primary/10 rounded-2xl p-8 md:p-10 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-primary/10 blur-3xl rounded-full transform translate-x-1/4 translate-y-1/4"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
            <div className="md:max-w-xl">
              <div className="flex items-center mb-4">
                <Award className="h-6 w-6 text-primary mr-2" />
                <span className="text-sm font-medium text-primary">Premium</span>
              </div>
              <h3 className="heading-md mb-4">Eleve seu potencial com recursos exclusivos</h3>
              <p className="text-muted-foreground mb-6">
                Desbloqueie todo o potencial da plataforma com acesso a tutores online, 
                exercícios avançados e ferramentas de estudos personalizadas.
              </p>
            </div>
            
            <div className="flex flex-col justify-center items-center">
              <span className="text-4xl font-bold font-display mb-2">Gratuito</span>
              <span className="text-muted-foreground mb-4">Neste lançamento</span>
              <button className="bg-primary hover:bg-primary/90 text-white font-medium rounded-lg px-6 py-3 shadow-sm hover:shadow-md transition-all">
                Criar conta
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
