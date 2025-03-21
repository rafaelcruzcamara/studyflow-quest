
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { Material } from './StudyMaterials';

interface VideoPlayerProps {
  material: Material;
  markMaterialAsCompleted: (materialId: number) => void;
  currentSession: any;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ material, markMaterialAsCompleted, currentSession }) => {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleVideoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleVideoMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const increaseVideoProgress = () => {
    // Simulating video progress for demonstration
    setVideoProgress(prev => Math.min(prev + 10, 100));
  };

  useEffect(() => {
    // Update video progress periodically for demonstration
    const interval = setInterval(() => {
      if (isPlaying) {
        increaseVideoProgress();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!material || material.type !== 'video' || !('src' in material)) {
    return null;
  }

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
};

export default VideoPlayer;
