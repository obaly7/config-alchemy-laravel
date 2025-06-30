
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit3 } from 'lucide-react';
import { schoolSetupSteps } from '@/data/schoolData';
import { WizardData } from './SchoolWizard';

interface DataSummarySectionProps {
  wizardData: WizardData;
  onEdit: (stepIndex: number) => void;
}

const DataSummarySection = ({ wizardData, onEdit }: DataSummarySectionProps) => {
  const getStepData = (stepId: string) => {
    return wizardData[stepId] || [];
  };

  const getOptionLabel = (stepId: string, optionId: string) => {
    const step = schoolSetupSteps.find(s => s.id === stepId);
    
    if (step?.options) {
      const option = step.options.find(opt => opt.id === optionId);
      return option ? { label: option.label, icon: option.icon } : { label: optionId, icon: null };
    }
    
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
    
    return { label: optionId, icon: null };
  };

  return (
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

      {/* Curriculum Data Summary */}
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
  );
};

export default DataSummarySection;
