import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save, Download, Edit3, FileText, FileJson } from 'lucide-react';
import { schoolSetupSteps } from '@/data/schoolData';
import { WizardData } from './SchoolWizard';

interface SummaryStepProps {
  wizardData: WizardData;
  onEdit: (stepIndex: number) => void;
  onSave: () => void;
  onExport: (format: 'json' | 'excel') => void;
  onBack: () => void;
}

const SummaryStep = ({ wizardData, onEdit, onSave, onExport, onBack }: SummaryStepProps) => {
  const getStepData = (stepId: string) => {
    return wizardData[stepId] || [];
  };

  const getOptionLabel = (stepId: string, optionId: string) => {
    const step = schoolSetupSteps.find(s => s.id === stepId);
    const option = step?.options.find(opt => opt.id === optionId);
    return option ? { label: option.label, icon: option.icon } : { label: optionId, icon: null };
  };

  const getTotalSelections = () => {
    return Object.values(wizardData).reduce((total, stepData) => total + stepData.length, 0);
  };

  const getCompletedSteps = () => {
    return Object.keys(wizardData).filter(stepId => wizardData[stepId].length > 0).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            تم إكمال إعداد بيانات المدرسة!
          </h1>
          <p className="text-xl text-gray-600">
            مراجعة شاملة للبيانات المدخلة قبل الحفظ النهائي
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {getCompletedSteps()}
              </div>
              <p className="text-gray-600">خطوات مكتملة</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {getTotalSelections()}
              </div>
              <p className="text-gray-600">إجمالي الخيارات المختارة</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {Math.round((getCompletedSteps() / schoolSetupSteps.length) * 100)}%
              </div>
              <p className="text-gray-600">نسبة الإكمال</p>
            </CardContent>
          </Card>
        </div>

        {/* Data Summary */}
        <div className="space-y-6 mb-8">
          {schoolSetupSteps.map((step, index) => {
            const stepData = getStepData(step.id);
            
            if (stepData.length === 0) return null;

            return (
              <Card key={step.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <span className="text-2xl">{step.icon}</span>
                      <div>
                        <h3 className="text-xl">{step.title}</h3>
                        <p className="text-sm text-gray-600 font-normal">
                          {step.description}
                        </p>
                      </div>
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(index)}
                      className="flex items-center gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      تعديل
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {stepData.map((optionId) => {
                      const { label, icon } = getOptionLabel(step.id, optionId);
                      return (
                        <Badge 
                          key={optionId}
                          variant="secondary"
                          className="flex items-center gap-1 py-2 px-3"
                        >
                          {icon && <span>{icon}</span>}
                          {label}
                        </Badge>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Separator className="my-8" />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={onBack}
            variant="outline"
            size="lg"
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            العودة للتعديل
          </Button>

          <div className="flex gap-4">
            <Button
              onClick={() => onExport('json')}
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
            >
              <FileJson className="w-4 h-4" />
              تصدير JSON
            </Button>

            <Button
              onClick={() => onExport('excel')}
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              تصدير Excel
            </Button>
          </div>

          <Button
            onClick={onSave}
            size="lg"
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <Save className="w-4 h-4" />
            حفظ البيانات
          </Button>
        </div>

        {/* Instructions */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
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
      </div>
    </div>
  );
};

export default SummaryStep;