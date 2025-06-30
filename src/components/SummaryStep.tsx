
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { WizardData } from './SchoolWizard';
import { schoolSetupSteps } from '@/data/schoolData';
import StatisticsCards from './StatisticsCards';
import DataSummarySection from './DataSummarySection';
import UserInfoForm from './UserInfoForm';
import TimeDisplay from './TimeDisplay';
import ThankYouMessage from './ThankYouMessage';

interface SummaryStepProps {
  wizardData: WizardData;
  onEdit: (stepIndex: number) => void;
  onSave: () => void;
  onExport: (format: 'json' | 'excel' | 'pdf') => void;
  onSendEmail: (userInfo: {name: string, phone: string, email: string}) => void;
  onBack: () => void;
  startTime: number;
}

const SummaryStep = ({ wizardData, onEdit, onSave, onExport, onSendEmail, onBack, startTime }: SummaryStepProps) => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [setupRating, setSetupRating] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getTotalSelections = () => {
    return Object.values(wizardData).reduce((total, stepData) => total + stepData.length, 0);
  };

  const getCompletedSteps = () => {
    return Object.keys(wizardData).filter(stepId => wizardData[stepId].length > 0).length;
  };

  return (
    <div className="min-h-screen tanween-gradient p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
           <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
             تم إكمال إعداد بيانات المدرسة!
           </h1>
           <p className="text-xl text-white/80">
            مراجعة شاملة للبيانات المدخلة قبل الحفظ النهائي
          </p>
        </div>

        {/* Statistics */}
        <StatisticsCards 
          completedSteps={getCompletedSteps()}
          totalSelections={getTotalSelections()}
          totalSteps={schoolSetupSteps.length}
        />

        {/* Data Summary */}
        <DataSummarySection wizardData={wizardData} onEdit={onEdit} />

        <Separator className="my-8" />

        {/* Instructions */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h4 className="font-semibold text-blue-900 mb-3">💡 خطوات ما بعد الحفظ:</h4>
            <ul className="text-blue-800 space-y-2 text-sm">
              <li>• يمكنك تصدير البيانات بصيغة JSON للاستخدام في التطبيقات</li>
              <li>• استخدم خيار تصدير Excel لمشاركة البيانات مع الفريق</li>
              <li>• يمكنك العودة وتعديل أي قسم في أي وقت</li>
              <li>• تأكد من مراجعة جميع البيانات قبل الحفظ النهائي</li>
            </ul>
          </CardContent>
        </Card>

        {/* School Setup Rating */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="pt-6">
            <h4 className="font-semibold text-green-900 mb-4 text-xl text-center">تقييم سهولة إعداد المدرسة</h4>
            <p className="text-green-800 text-center mb-4">من 1 إلى 5، كيف تقيم سهولة استخدام هذا المعالج؟</p>
            <div className="flex justify-center gap-4 mb-4">
              {[1,2,3,4,5].map(num => (
                <button
                  key={num}
                  type="button"
                  className={`w-12 h-12 rounded-full border-2 transition-colors flex items-center justify-center font-semibold cursor-pointer ${
                    setupRating === num 
                      ? 'border-green-500 bg-green-500 text-white shadow-lg' 
                      : 'border-green-300 text-green-700 hover:bg-green-200 hover:border-green-500'
                  }`}
                  onClick={() => {
                    setSetupRating(num);
                    console.log(`تم اختيار التقييم: ${num}`);
                  }}
                >
                  {num}
                </button>
              ))}
            </div>
            {setupRating && (
              <p className="text-center text-sm text-gray-600">
                شكراً لك! تقييمك: {setupRating} من 5
              </p>
            )}
            <p className="text-xs text-green-600 text-center">1 = صعب جداً، 5 = سهل جداً</p>
          </CardContent>
        </Card>

        {/* Additional Notes */}
        <Card className="mb-8 bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <h4 className="font-semibold text-yellow-900 mb-4">ملاحظات إضافية</h4>
            <textarea 
              className="w-full px-3 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-right min-h-[100px]"
              placeholder="أضف أي ملاحظات أو تفاصيل إضافية حول المدرسة..."
              dir="rtl"
            />
          </CardContent>
        </Card>

        {/* User Information Form */}
        <UserInfoForm 
          wizardData={wizardData}
          onSendEmail={onSendEmail}
          onExport={onExport}
          onBack={onBack}
          startTime={startTime}
          currentTime={currentTime}
        />

        {/* Elapsed Time Display */}
        <TimeDisplay startTime={startTime} currentTime={currentTime} />

        {/* Thank You Message */}
        <ThankYouMessage />
      </div>
    </div>
  );
};

export default SummaryStep;
