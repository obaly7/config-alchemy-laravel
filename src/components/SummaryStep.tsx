import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ArrowRight, Save, Download, Edit3, FileText, FileJson, Facebook, Instagram } from 'lucide-react';
import { schoolSetupSteps } from '@/data/schoolData';
import { WizardData } from './SchoolWizard';
import * as XLSX from 'xlsx';

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

  const getStepData = (stepId: string) => {
    return wizardData[stepId] || [];
  };

  const getOptionLabel = (stepId: string, optionId: string) => {
    const step = schoolSetupSteps.find(s => s.id === stepId);
    
    // Check if step has options array
    if (step?.options) {
      const option = step.options.find(opt => opt.id === optionId);
      return option ? { label: option.label, icon: option.icon } : { label: optionId, icon: null };
    }
    
    // Check if step has fields with options
    if (step?.fields) {
      for (const field of step.fields) {
        if (field.options) {
          const option = field.options.find(opt => opt.id === optionId);
          if (option) {
            return { label: option.label, icon: option.icon };
          }
        }
      }
    }
    
    // Fallback to optionId as label
    return { label: optionId, icon: null };
  };

  const getTotalSelections = () => {
    return Object.values(wizardData).reduce((total, stepData) => total + stepData.length, 0);
  };

  const getCompletedSteps = () => {
    return Object.keys(wizardData).filter(stepId => wizardData[stepId].length > 0).length;
  };

  // Enhanced export function to include all data including form fields
  const handleExportExcel = () => {
    console.log('Starting Excel export with all data including form fields...');
    
    const workbook = XLSX.utils.book_new();
    
    // Main summary sheet
    const summaryData = [];
    summaryData.push(['ملخص إعداد المدرسة', '']);
    summaryData.push(['إجمالي الخطوات المكتملة', getCompletedSteps()]);
    summaryData.push(['إجمالي الخيارات المختارة', getTotalSelections()]);
    summaryData.push(['نسبة الإكمال', `${Math.round((getCompletedSteps() / schoolSetupSteps.length) * 100)}%`]);
    summaryData.push(['وقت الإعداد (دقائق)', Math.floor((currentTime - startTime) / 60000)]);
    summaryData.push(['']);

    // Add data from all steps - including form fields
    schoolSetupSteps.forEach((step) => {
      const stepData = getStepData(step.id);
      if (stepData.length > 0) {
        summaryData.push([step.title, '']);
        
        // Handle form fields data (like general school information)
        if (step.fields) {
          step.fields.forEach((field) => {
            const fieldData = stepData.find(data => data.startsWith(`${field.id}:`));
            if (fieldData) {
              // Extract the value after the colon
              const value = fieldData.substring(fieldData.indexOf(':') + 1).trim();
              summaryData.push([field.label, value]);
            }
          });
        } else {
          // Handle option-based data
          stepData.forEach((optionId) => {
            const { label } = getOptionLabel(step.id, optionId);
            summaryData.push(['', label]);
          });
        }
        summaryData.push(['']);
      }
    });

    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'ملخص البيانات');

    // General School Information detailed sheet
    const generalInfoStep = schoolSetupSteps.find(step => step.id === 'general_info');
    const generalInfoData = getStepData('general_info');
    
    if (generalInfoStep && generalInfoData.length > 0) {
      const generalInfoSheetData = [];
      generalInfoSheetData.push(['المعلومات العامة حول المدرسة', '']);
      generalInfoSheetData.push(['']);
      
      if (generalInfoStep.fields) {
        generalInfoStep.fields.forEach((field) => {
          const fieldData = generalInfoData.find(data => data.startsWith(`${field.id}:`));
          if (fieldData) {
            const value = fieldData.substring(fieldData.indexOf(':') + 1).trim();
            generalInfoSheetData.push([field.label, value]);
          } else {
            generalInfoSheetData.push([field.label, 'لم يتم الإدخال']);
          }
        });
      }
      
      const generalInfoSheet = XLSX.utils.aoa_to_sheet(generalInfoSheetData);
      XLSX.utils.book_append_sheet(workbook, generalInfoSheet, 'المعلومات العامة');
    }

    // Teaching Plans and Curriculum Sheet
    const curriculumData = wizardData.curriculumData || [];
    console.log('Curriculum data found:', curriculumData);
    
    if (curriculumData.length > 0) {
      const teachingPlansData = [];
      teachingPlansData.push(['الخطط الدراسية والمناهج', '', '', '', '', '', '']);
      teachingPlansData.push(['']);
      
      curriculumData.forEach((gradeCurriculum: any) => {
        teachingPlansData.push([`الصف: ${gradeCurriculum.gradeId}`, '', '', '', '', '', '']);
        teachingPlansData.push(['']);
        
        if (gradeCurriculum.subjects && gradeCurriculum.subjects.length > 0) {
          // Headers for subjects
          teachingPlansData.push([
            'اسم المادة',
            'الحصص الأسبوعية', 
            'الدرجة العظمى',
            'درجة النجاح',
            'نوع المادة',
            'مادة مرسبة',
            'مكونات التقييم'
          ]);
          
          gradeCurriculum.subjects.forEach((subject: any) => {
            const assessmentComponents = subject.assessmentComponents || [];
            const componentsText = assessmentComponents
              .map((comp: any) => `${comp.name} (${comp.percentage}%)`)
              .join(', ');
            
            teachingPlansData.push([
              subject.name || 'غير محدد',
              subject.weeklyHours || 0,
              subject.maxGrade || 100,
              subject.passingGrade || 50,
              subject.type || 'أساسية',
              subject.isFailureSubject ? 'نعم' : 'لا',
              componentsText || 'لا توجد مكونات'
            ]);
          });
          
          teachingPlansData.push(['']);
        } else {
          teachingPlansData.push(['لا توجد مواد محددة لهذا الصف']);
          teachingPlansData.push(['']);
        }
      });
      
      const teachingPlansSheet = XLSX.utils.aoa_to_sheet(teachingPlansData);
      XLSX.utils.book_append_sheet(workbook, teachingPlansSheet, 'الخطط الدراسية');
    }

    // Detailed breakdown sheet for each step
    const detailedData = [];
    detailedData.push(['التفاصيل الكاملة لإعداد المدرسة', '']);
    detailedData.push(['']);

    schoolSetupSteps.forEach((step, index) => {
      const stepData = getStepData(step.id);
      
      detailedData.push([`${index + 1}. ${step.title}`, '']);
      detailedData.push(['الوصف:', step.description]);
      detailedData.push(['الحالة:', stepData.length > 0 ? 'مكتمل' : 'غير مكتمل']);
      
      if (stepData.length > 0) {
        detailedData.push(['البيانات المدخلة:', '']);
        
        if (step.fields) {
          // Handle form fields
          step.fields.forEach((field) => {
            const fieldData = stepData.find(data => data.startsWith(`${field.id}:`));
            if (fieldData) {
              const value = fieldData.substring(fieldData.indexOf(':') + 1).trim();
              detailedData.push(['', `${field.label}: ${value}`]);
            }
          });
        } else {
          // Handle options
          stepData.forEach((optionId) => {
            const { label } = getOptionLabel(step.id, optionId);
            detailedData.push(['', `• ${label}`]);
          });
        }
      }
      
      detailedData.push(['']);
    });

    const detailedSheet = XLSX.utils.aoa_to_sheet(detailedData);
    XLSX.utils.book_append_sheet(workbook, detailedSheet, 'التفاصيل الكاملة');

    // Export the workbook
    const fileName = `إعداد_المدرسة_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
    
    console.log('Excel export completed with all data including general school information');
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
                    {stepData.map((dataItem, idx) => {
                      // Handle form field data
                      if (step.fields && dataItem.includes(':')) {
                        const [fieldId, value] = dataItem.split(':');
                        const field = step.fields.find(f => f.id === fieldId);
                        return (
                          <Badge 
                            key={idx}
                            variant="secondary"
                            className="flex items-center gap-1 py-2 px-3"
                          >
                            {field?.label}: {value}
                          </Badge>
                        );
                      } else {
                        // Handle option-based data
                        const { label, icon } = getOptionLabel(step.id, dataItem);
                        return (
                          <Badge 
                            key={idx}
                            variant="secondary"
                            className="flex items-center gap-1 py-2 px-3"
                          >
                            {icon && <span>{icon}</span>}
                            {label}
                          </Badge>
                        );
                      }
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Display Curriculum Data Summary */}
          {wizardData.curriculumData && wizardData.curriculumData.length > 0 && (
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3">
                  <span className="text-2xl">📚</span>
                  <div>
                    <h3 className="text-xl">الخطط الدراسية والمناهج</h3>
                    <p className="text-sm text-gray-600 font-normal">
                      تفاصيل المواد والمناهج لكل صف دراسي
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {wizardData.curriculumData.map((gradeCurriculum: any) => (
                    <div key={gradeCurriculum.gradeId} className="border rounded-lg p-4 bg-blue-50">
                      <h4 className="font-semibold text-blue-900 mb-2">
                        الصف: {gradeCurriculum.gradeId}
                      </h4>
                      <div className="text-sm text-blue-800">
                        عدد المواد: {gradeCurriculum.subjects?.length || 0}
                      </div>
                      {gradeCurriculum.subjects && gradeCurriculum.subjects.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {gradeCurriculum.subjects.map((subject: any, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {subject.name} ({subject.weeklyHours} حصة)
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

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
        <Card className="mb-8 bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <h4 className="font-semibold text-green-900 mb-4 text-xl">معلومات الشخص المسؤول</h4>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const userInfo = {
                name: formData.get('name') as string,
                phone: formData.get('phone') as string,
                email: formData.get('email') as string
              };
              onSendEmail(userInfo);
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-green-900 mb-2">الاسم الكامل</label>
                  <input 
                    name="name"
                    type="text" 
                    required
                    className="w-full px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-right bg-white" 
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-900 mb-2">رقم الهاتف</label>
                  <input 
                    name="phone"
                    type="tel" 
                    required
                    className="w-full px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-right bg-white" 
                    dir="rtl"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-green-900 mb-2">البريد الإلكتروني الخاص بالشخص المسؤول</label>
                  <input 
                    name="email"
                    type="email" 
                    required
                    className="w-full px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-right bg-white" 
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    onClick={onBack}
                    type="button"
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-2 w-full sm:w-auto border-green-300 text-green-700"
                  >
                    <ArrowRight className="w-4 h-4" />
                    العودة للتعديل
                  </Button>

                <div className="flex gap-2">
                  <Button
                    onClick={() => onExport('json')}
                    type="button"
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-2 border-green-300 text-green-700"
                  >
                    <FileJson className="w-4 h-4" />
                    تصدير JSON
                  </Button>

                  <Button
                    onClick={handleExportExcel}
                    type="button"
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-2 border-green-300 text-green-700"
                  >
                    <FileText className="w-4 h-4" />
                    تصدير Excel
                  </Button>

                  <Button
                    onClick={() => onExport('pdf')}
                    type="button"
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-2 border-green-300 text-green-700"
                  >
                    <FileText className="w-4 h-4" />
                    تصدير كـ PDF
                  </Button>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="flex items-center gap-2 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
                >
                  <Save className="w-4 h-4" />
                  حفظ وإرسال إلى: info@tanween.net
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Elapsed Time Display */}
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

        {/* Thank You Message */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-green-900 mb-3">شكراً لكم من شركة تنوين</h3>
            <p className="text-green-800 text-lg mb-4">
              نتمنى لمؤسستكم التعليمية كل التوفيق والنجاح في رحلتها التعليمية
            </p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
              size="lg"
            >
              بدء تسجيل جديد (إعداد مدرسة جديدة)
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="border-t border-white/20 pt-8 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <a 
              href="https://wa.me/963958555801" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <span>💬</span>
              مساعدة على الواتساب
            </a>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.facebook.com/tanweenapp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-blue-300 transition-colors flex items-center gap-1"
              >
                <Facebook className="w-4 h-4" />
                فيسبوك
              </a>
              <a 
                href="https://www.instagram.com/tanweenapp/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-pink-300 transition-colors flex items-center gap-1"
              >
                <Instagram className="w-4 h-4" />
                انستغرام
              </a>
            </div>
            <div className="text-center text-sm text-white">
              <p>جميع الحقوق محفوظة لشركة AutoZone - 2025</p>
              <p>رقم هاتف الشركة: +963-11-4349</p>
              <p className="hover:text-blue-200">الموقع الإلكتروني: <a href="https://www.tanween.net/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200">www.tanween.net</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryStep;
