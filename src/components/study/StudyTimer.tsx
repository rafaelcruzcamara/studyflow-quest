
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const StudyTimer: React.FC = () => {
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

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

  return (
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
  );
};

export default StudyTimer;
