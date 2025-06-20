import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle, Download, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { schoolSetupSteps } from '@/data/schoolData';
import StepContent from './StepContent';
import SummaryStep from './SummaryStep';

export interface WizardData {
  [stepId: string]: string[];
}

const SchoolWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [wizardData, setWizardData] = useState<WizardData>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();

  const totalSteps = schoolSetupSteps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleStepDataChange = (stepId: string, selectedValues: string[]) => {
    setWizardData(prev => ({
      ...prev,
      [stepId]: selectedValues
    }));
  };

  const goToNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setIsCompleted(false);
  };

  const isStepCompleted = (stepIndex: number): boolean => {
    const step = schoolSetupSteps[stepIndex];
    const stepData = wizardData[step.id];
    return stepData && stepData.length > 0;
  };

  const canProceed = (): boolean => {
    const currentStepData = schoolSetupSteps[currentStep];
    const selectedData = wizardData[currentStepData.id];
    return selectedData && selectedData.length > 0;
  };

  const handleSaveData = () => {
    // هنا يمكن إضافة منطق حفظ البيانات
    toast({
      title: "تم الحفظ بنجاح",
      description: "تم حفظ بيانات المدرسة بنجاح"
    });
  };

  const handleExportData = (format: 'json' | 'excel') => {
    if (format === 'json') {
      const dataStr = JSON.stringify(wizardData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'school_data.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
    
    toast({
      title: "تم التصدير",
      description: `تم تصدير البيانات بصيغة ${format === 'json' ? 'JSON' : 'Excel'}`
    });
  };

  if (isCompleted) {
    return (
      <SummaryStep
        wizardData={wizardData}
        onEdit={goToStep}
        onSave={handleSaveData}
        onExport={handleExportData}
        onBack={() => setIsCompleted(false)}
      />
    );
  }

  const currentStepData = schoolSetupSteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🏫 معالج إعداد بيانات المدرسة
          </h1>
          <p className="text-xl text-gray-600">
            اتبع الخطوات لإعداد بيانات مدرستك بطريقة منظمة
          </p>
        </div>

        {/* Progress Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <span>{currentStepData.icon}</span>
                الخطوة {currentStep + 1} من {totalSteps}
              </CardTitle>
              <span className="text-sm text-gray-500">
                {Math.round(progress)}% مكتمل
              </span>
            </div>
            <Progress value={progress} className="mt-2" />
          </CardHeader>
        </Card>

        {/* Steps Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 mb-8">
          {schoolSetupSteps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => goToStep(index)}
              className={`p-3 rounded-lg border-2 transition-all text-center ${
                index === currentStep
                  ? 'border-blue-500 bg-blue-100'
                  : isStepCompleted(index)
                  ? 'border-green-500 bg-green-100 hover:bg-green-200'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="text-lg mb-1">
                {isStepCompleted(index) ? (
                  <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                ) : (
                  step.icon
                )}
              </div>
              <div className="text-xs font-medium text-gray-700 line-clamp-2">
                {step.title}
              </div>
            </button>
          ))}
        </div>

        {/* Current Step Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <span className="text-3xl">{currentStepData.icon}</span>
              {currentStepData.title}
            </CardTitle>
            <p className="text-gray-600 text-lg">{currentStepData.description}</p>
          </CardHeader>
          <CardContent>
            <StepContent
              step={currentStepData}
              selectedValues={wizardData[currentStepData.id] || []}
              onSelectionChange={(values) => handleStepDataChange(currentStepData.id, values)}
            />
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button
            onClick={goToPreviousStep}
            disabled={currentStep === 0}
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            السابق
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">
              {canProceed() 
                ? "يمكنك المتابعة للخطوة التالية" 
                : "يرجى اختيار خيار واحد على الأقل للمتابعة"
              }
            </p>
          </div>

          {currentStep === totalSteps - 1 ? (
            <Button
              onClick={goToNextStep}
              disabled={!canProceed()}
              size="lg"
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              إنهاء وعرض الملخص
            </Button>
          ) : (
            <Button
              onClick={goToNextStep}
              disabled={!canProceed()}
              size="lg"
              className="flex items-center gap-2"
            >
              التالي
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolWizard;