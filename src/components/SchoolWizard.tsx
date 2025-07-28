import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle, Download, Save, Facebook, Instagram } from 'lucide-react';
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
  const [startTime] = useState(Date.now());
  const [currentTime, setCurrentTime] = useState(Date.now());
  const {
    toast
  } = useToast();

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const totalSteps = schoolSetupSteps.length;
  const progress = (currentStep + 1) / totalSteps * 100;
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
    toast({
      title: "تم الحفظ بنجاح",
      description: "تم حفظ بيانات المدرسة بنجاح"
    });
  };
  const handleSendEmail = (userInfo: {
    name: string;
    phone: string;
    email: string;
  }) => {
    // Here we would typically send the data to an API endpoint
    // For now, we'll just show a success message
    toast({
      title: "تم الإرسال بنجاح",
      description: `تم إرسال البيانات إلى ${userInfo.email} بنجاح`
    });
  };
  const handleExportData = (format: 'json' | 'excel' | 'pdf') => {
    if (format === 'json') {
      const dataStr = JSON.stringify(wizardData, null, 2);
      const dataBlob = new Blob([dataStr], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'school_data.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else if (format === 'excel') {
      handleExportToExcel();
    } else if (format === 'pdf') {
      window.print();
    }
    toast({
      title: "تم التصدير",
      description: `تم تصدير البيانات بصيغة ${format === 'json' ? 'JSON' : format === 'excel' ? 'Excel' : 'PDF'}`
    });
  };
  const handleExportToExcel = async () => {
    try {
      const XLSX = await import('xlsx');

      // Create workbook
      const workbook = XLSX.utils.book_new();

      // Prepare data for Excel
      const excelData: any[] = [];
      schoolSetupSteps.forEach((step, stepIndex) => {
        const stepData = wizardData[step.id] || [];
        if (stepData.length > 0) {
          excelData.push({
            'رقم الخطوة': step.stepNumber,
            'اسم الخطوة': step.title,
            'الخيارات المختارة': stepData.map(valueId => {
              const option = step.options?.find(opt => opt.id === valueId);
              return option ? option.label : valueId;
            }).join(', '),
            'عدد الخيارات': stepData.length
          });
        }
      });

      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(excelData);

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'بيانات المدرسة');

      // Generate Excel file and download
      XLSX.writeFile(workbook, 'school_data.xlsx');
    } catch (error) {
      toast({
        title: "خطأ في التصدير",
        description: "حدث خطأ أثناء تصدير البيانات إلى Excel"
      });
    }
  };
  if (isCompleted) {
    return <SummaryStep wizardData={wizardData} onEdit={goToStep} onSave={handleSaveData} onExport={handleExportData} onSendEmail={handleSendEmail} onBack={() => setIsCompleted(false)} startTime={startTime} />;
  }
  const currentStepData = schoolSetupSteps[currentStep];
  const elapsedMinutes = Math.floor((currentTime - startTime) / 60000);
  const elapsedSeconds = Math.floor((currentTime - startTime) % 60000 / 1000);
  return <div className="min-h-screen tanween-gradient p-4">
      <div className="max-w-6xl mx-auto">
        {/* Timer - Top Corner */}
        <div className="fixed top-4 left-4 z-50 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
          <span className="text-white font-medium text-sm">
            ⏱️ {elapsedMinutes.toString().padStart(2, '0')}:{elapsedSeconds.toString().padStart(2, '0')}
          </span>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="mb-3">
            <img alt="Tanween Logo" className="w-48 h-auto mx-auto bg-white/10 backdrop-blur-sm rounded-full p-4" src="/lovable-uploads/241e5ea5-39e8-43d1-9dd4-9c2ba7790aed.jpg" />
          </div>
          <p className="text-lg text-white/90 mb-2 font-medium italic">
            Driving Impact in EdTech
          </p>
          <h2 className="text-xl font-semibold text-white/90 mb-3">
            معالج إعداد بيانات المدرسة التفاعلي
          </h2>
          <p className="text-lg text-white/80">
            مرحباً بك! سنقوم معاً بإعداد بيانات مدرستك خطوة بخطوة بطريقة سهلة وممتعة فلنبدأ
          </p>
        </div>

        {/* Progress Section */}
        <Card className="mb-8 bg-white/95 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-tanween-primary">
                <span className="text-2xl">{currentStepData.icon}</span>
                <div>
                  <div className="text-lg font-bold">خطوة {currentStepData.stepNumber} من {totalSteps}</div>
                  <div className="text-sm text-tanween-secondary font-medium">
                    {currentStepData.title}
                  </div>
                </div>
              </CardTitle>
              <div className="text-left">
                <span className="text-sm text-tanween-primary font-medium">
                  {Math.round(progress)}% مكتمل
                </span>
                <div className="text-xs text-gray-500 mt-1">
                  {totalSteps - currentStep - 1} خطوة متبقية
                </div>
              </div>
            </div>
            <Progress value={progress} className="mt-3 h-3 bg-tanween-secondary/20" />
          </CardHeader>
        </Card>

        {/* Steps Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 mb-8">
          {schoolSetupSteps.map((step, index) => <button key={step.id} onClick={() => goToStep(index)} className={`p-3 rounded-lg border-2 transition-all text-center ${index === currentStep ? 'border-blue-500 bg-blue-100' : isStepCompleted(index) ? 'border-green-500 bg-green-100 hover:bg-green-200' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
              <div className="text-lg mb-1">
                {isStepCompleted(index) ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : step.icon}
              </div>
              <div className="text-xs font-medium text-gray-700 line-clamp-2">
                {step.title}
              </div>
            </button>)}
        </div>

        {/* Current Step Content */}
        <Card className="mb-8 bg-white shadow-xl border-0">
          <CardHeader className="bg-gradient-to-l from-tanween-secondary/10 to-tanween-primary/10">
            <CardTitle className="flex items-center gap-3 text-2xl text-tanween-primary">
              <span className="text-4xl">{currentStepData.icon}</span>
              <div>
                <div className="text-2xl font-bold">{currentStepData.title}</div>
                <p className="text-tanween-secondary text-lg font-normal mt-1">
                  {currentStepData.description}
                </p>
              </div>
            </CardTitle>
            <div className="mt-4 p-3 bg-tanween-primary/5 rounded-lg border-r-4 border-tanween-primary">
              <p className="text-tanween-primary text-sm font-medium">
                💡 نصيحة: يمكنك اختيار {currentStepData.multiSelect ? 'عدة خيارات' : 'خيار واحد'} في هذه الخطوة
              </p>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <StepContent step={currentStepData} selectedValues={wizardData[currentStepData.id] || []} onSelectionChange={values => handleStepDataChange(currentStepData.id, values)} wizardData={wizardData} />
            
            {/* School Images Upload - Show only on first step */}
            {currentStep === 0}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button onClick={goToPreviousStep} disabled={currentStep === 0} variant="outline" size="lg" className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4" />
            السابق
          </Button>

          <div className="text-center">
            <p className="text-sm text-white mb-2">
              {canProceed() ? "يمكنك المتابعة للخطوة التالية" : "يرجى اختيار خيار واحد على الأقل للمتابعة"}
            </p>
          </div>

          {currentStep === totalSteps - 1 ? <Button onClick={goToNextStep} disabled={!canProceed()} size="lg" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              إنهاء وعرض الملخص
            </Button> : <Button onClick={goToNextStep} disabled={!canProceed()} size="lg" className="flex items-center gap-2">
              التالي
              <ArrowLeft className="w-4 h-4" />
            </Button>}
        </div>

        {/* Footer with WhatsApp and Company Info */}
        <div className="border-t border-white/20 pt-8 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <a href="https://wa.me/963958555801" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
              <span>💬</span>
              مساعدة على الواتساب
            </a>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/tanweenapp" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors flex items-center gap-1">
                <Facebook className="w-4 h-4" />
                فيسبوك
              </a>
              <a href="https://www.instagram.com/tanweenapp/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-300 transition-colors flex items-center gap-1">
                <Instagram className="w-4 h-4" />
                انستغرام
              </a>
            </div>
            <div className="text-center text-sm text-white">
              <p>جميع الحقوق محفوظة لشركة AutoZone - 2025</p>
              <p>رقم هاتف الشركة: +963-11-4349</p>
              <p>الموقع الإلكتروني: <a href="https://www.tanween.net/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200">www.tanween.net</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default SchoolWizard;