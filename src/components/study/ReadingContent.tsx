
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';
import { Material, StudySession } from './StudyMaterials';

interface ReadingContentProps {
  material: Material;
  currentSession: StudySession;
  markMaterialAsCompleted: (materialId: number) => void;
}

const ReadingContent: React.FC<ReadingContentProps> = ({ 
  material, 
  currentSession, 
  markMaterialAsCompleted 
}) => {
  if (!material || material.type !== 'reading') {
    return null;
  }

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
};

export default ReadingContent;
