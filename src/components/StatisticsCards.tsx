
import { Card, CardContent } from '@/components/ui/card';

interface StatisticsCardsProps {
  completedSteps: number;
  totalSelections: number;
  totalSteps: number;
}

const StatisticsCards = ({ completedSteps, totalSelections, totalSteps }: StatisticsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="text-center">
        <CardContent className="pt-6">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {completedSteps}
          </div>
          <p className="text-gray-600">خطوات مكتملة</p>
        </CardContent>
      </Card>
      
      <Card className="text-center">
        <CardContent className="pt-6">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {totalSelections}
          </div>
          <p className="text-gray-600">إجمالي الخيارات المختارة</p>
        </CardContent>
      </Card>
      
      <Card className="text-center">
        <CardContent className="pt-6">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {Math.round((completedSteps / totalSteps) * 100)}%
          </div>
          <p className="text-gray-600">نسبة الإكمال</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsCards;
