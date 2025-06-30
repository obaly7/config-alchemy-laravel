
import { Card, CardContent } from '@/components/ui/card';

interface TimeDisplayProps {
  startTime: number;
  currentTime: number;
}

const TimeDisplay = ({ startTime, currentTime }: TimeDisplayProps) => {
  return (
    <Card className="mb-8 bg-blue-50 border-blue-200">
      <CardContent className="pt-6 text-center">
        <div className="text-3xl mb-3">⏱️</div>
        <h4 className="text-xl font-bold text-blue-900 mb-2">الوقت المستغرق في الإعداد</h4>
        <p className="text-2xl font-bold text-blue-700">
          {Math.floor((currentTime - startTime) / 60000).toString().padStart(2, '0')}:
          {Math.floor(((currentTime - startTime) % 60000) / 1000).toString().padStart(2, '0')}
        </p>
      </CardContent>
    </Card>
  );
};

export default TimeDisplay;
