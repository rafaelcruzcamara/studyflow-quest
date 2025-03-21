
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { StudySession } from './StudyMaterials';

interface ExerciseContentProps {
  currentSession: StudySession;
}

const ExerciseContent: React.FC<ExerciseContentProps> = ({ currentSession }) => {
  const [showAnswer, setShowAnswer] = useState<{[key: number]: boolean}>({});

  const toggleShowAnswer = (exerciseId: number) => {
    setShowAnswer(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };

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

export default ExerciseContent;
