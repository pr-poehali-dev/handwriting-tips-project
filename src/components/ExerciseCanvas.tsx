import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface ExerciseCanvasProps {
  exerciseId: string;
  template: string;
  onComplete: () => void;
}

const ExerciseCanvas = ({ exerciseId, template, onComplete }: ExerciseCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState([3]);
  const [showGuides, setShowGuides] = useState(true);
  const [strokeCount, setStrokeCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    drawBackground(ctx, canvas.width / 2, canvas.height / 2);
    drawTemplate(ctx, template, canvas.width / 2, canvas.height / 2);
  }, [template, showGuides]);

  const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    if (showGuides) {
      ctx.strokeStyle = '#e0e7ff';
      ctx.lineWidth = 1;

      const lineSpacing = 40;
      for (let y = lineSpacing; y < height; y += lineSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        if (y % (lineSpacing * 2) === 0) {
          ctx.strokeStyle = '#c7d2fe';
          ctx.stroke();
          ctx.strokeStyle = '#e0e7ff';
        }
      }

      ctx.strokeStyle = '#ddd6fe';
      ctx.setLineDash([5, 5]);
      for (let x = 50; x < width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      ctx.setLineDash([]);
    }
  };

  const drawTemplate = (ctx: CanvasRenderingContext2D, template: string, width: number, height: number) => {
    if (template === 'lines') {
      ctx.strokeStyle = '#a5b4fc';
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 5]);
      
      for (let i = 0; i < 5; i++) {
        const x = 50 + i * 100;
        const startY = 50;
        const endY = height - 50;
        
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x + 20, endY);
        ctx.stroke();
      }
      ctx.setLineDash([]);
    } else if (template === 'circles') {
      ctx.strokeStyle = '#a5b4fc';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 3]);
      
      for (let i = 0; i < 6; i++) {
        const x = 60 + i * 80;
        const y = height / 4;
        
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.setLineDash([]);
    } else if (template === 'letters') {
      ctx.font = 'bold 48px serif';
      ctx.strokeStyle = '#a5b4fc';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 4]);
      
      const letters = ['а', 'о', 'с', 'е', 'и'];
      letters.forEach((letter, i) => {
        const x = 60 + i * 90;
        const y = 100;
        ctx.strokeText(letter, x, y);
      });
      ctx.setLineDash([]);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
    setStrokeCount(prev => prev + 1);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing && e.type !== 'mousedown') return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = brushSize[0];
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1e293b';

    if (e.type === 'mousedown') {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    drawBackground(ctx, canvas.width / 2, canvas.height / 2);
    drawTemplate(ctx, template, canvas.width / 2, canvas.height / 2);
    setStrokeCount(0);
  };

  const saveWork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `exercise-${exerciseId}-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <Card className="border-none shadow-xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="font-heading flex items-center gap-2">
            <Icon name="PenTool" size={24} className="text-indigo-600" />
            Холст для практики
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowGuides(!showGuides)}
            >
              <Icon name={showGuides ? 'EyeOff' : 'Eye'} size={16} className="mr-2" />
              {showGuides ? 'Скрыть' : 'Показать'} сетку
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-slate-200 rounded-lg overflow-hidden bg-white shadow-inner">
          <canvas
            ref={canvasRef}
            className="w-full h-[400px] cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onMouseLeave={stopDrawing}
          />
        </div>

        <div className="space-y-3 bg-slate-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium flex items-center gap-2">
              <Icon name="Pencil" size={16} />
              Толщина линии: {brushSize[0]}px
            </label>
          </div>
          <Slider
            value={brushSize}
            onValueChange={setBrushSize}
            min={1}
            max={10}
            step={1}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Icon name="Activity" size={16} />
            <span>Штрихов: {strokeCount}</span>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={clearCanvas}
            >
              <Icon name="Eraser" size={18} className="mr-2" />
              Очистить
            </Button>
            <Button
              variant="outline"
              onClick={saveWork}
            >
              <Icon name="Download" size={18} className="mr-2" />
              Сохранить
            </Button>
            <Button
              className="bg-indigo-500 hover:bg-indigo-600"
              onClick={onComplete}
            >
              <Icon name="CheckCircle" size={18} className="mr-2" />
              Завершить
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExerciseCanvas;
