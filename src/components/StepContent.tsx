import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StepData, colorClasses, ClassroomData, GradeCurriculumData } from '@/data/schoolData';
import TeachingPlanStep from './TeachingPlanStep';
import ClassroomManagementStep from './ClassroomManagementStep';
import GradeCurriculumStep from './GradeCurriculumStep';

interface StepContentProps {
  step: StepData;
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  wizardData?: any; // For accessing other step data
}

const StepContent = ({ step, selectedValues, onSelectionChange, wizardData }: StepContentProps) => {
  const [customValues, setCustomValues] = useState<{ [key: string]: string }>({});
  const [otherValue, setOtherValue] = useState('');
  const [classrooms, setClassrooms] = useState<ClassroomData[]>([]);
  const [curriculumData, setCurriculumData] = useState<GradeCurriculumData[]>([]);

  // Handle teaching plans step specially
  if (step.id === 'teaching_plans_by_grade') {
    return (
      <TeachingPlanStep
        selectedGrades={selectedValues}
        onDataChange={(gradePlans) => {
          // Convert grade plans to simple array format for compatibility
          const gradeIds = gradePlans.map(plan => plan.gradeId);
          onSelectionChange(gradeIds);
        }}
      />
    );
  }

  // Handle halls and facilities step with classroom management
  if (step.id === 'halls_facilities') {
    return (
      <div className="space-y-8">
        {/* Original hall types selection */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">أنواع القاعات والمرافق المتوفرة</h3>
          
          {step.options && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {step.options.map((option) => {
                const isSelected = selectedValues.includes(option.id);
                const colorClasses_typed = colorClasses as { [key: string]: { card: string; selected: string; text: string } };
                const stepColors = step.color ? colorClasses_typed[step.color] : colorClasses_typed['blue'];
                
                return (
                  <Card
                    key={option.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      isSelected ? stepColors.selected : stepColors.card
                    }`}
                    onClick={() => handleOptionToggle(option.id)}
                  >
                    <CardContent className="p-4 text-center">
                      {option.icon && (
                        <div className="text-2xl mb-2">{option.icon}</div>
                      )}
                      <h3 className={`font-semibold ${isSelected ? stepColors.text : 'text-gray-800'}`}>
                        {option.label}
                      </h3>
                      {option.description && (
                        <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Add Other Option */}
          {step.allowOther && (
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-800 mb-3">إضافة خيار آخر:</h4>
                <div className="flex gap-2">
                  <Input
                    value={otherValue}
                    onChange={(e) => setOtherValue(e.target.value)}
                    placeholder="اكتب خيار جديد..."
                    className="flex-1 text-right"
                    dir="rtl"
                    onKeyPress={(e) => e.key === 'Enter' && handleOtherSubmit()}
                  />
                  <Button onClick={handleOtherSubmit} disabled={!otherValue.trim()}>
                    إضافة
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Classroom Management Section */}
        <ClassroomManagementStep
          selectedHallTypes={selectedValues}
          classrooms={classrooms}
          onClassroomsChange={setClassrooms}
        />
      </div>
    );
  }

  // Handle grade curriculum step
  if (step.id === 'grade_curriculum') {
    const selectedGrades = wizardData?.educational_levels || [];
    return (
      <GradeCurriculumStep
        selectedGrades={selectedGrades}
        curriculumData={curriculumData}
        onCurriculumChange={setCurriculumData}
      />
    );
  }

  const colorClasses_typed = colorClasses as { [key: string]: { card: string; selected: string; text: string } };
  const stepColors = step.color ? colorClasses_typed[step.color] : colorClasses_typed['blue'];

  const handleOptionToggle = (optionId: string) => {
    if (step.multiSelect) {
      const newSelection = selectedValues.includes(optionId)
        ? selectedValues.filter(id => id !== optionId)
        : [...selectedValues, optionId];
      onSelectionChange(newSelection);
    } else {
      onSelectionChange([optionId]);
    }
  };

  const handleCustomValueChange = (fieldId: string, value: string) => {
    setCustomValues(prev => ({ ...prev, [fieldId]: value }));
    
    // For form fields, we store the value directly
    const fieldKey = `${step.id}_${fieldId}`;
    const newSelection = selectedValues.includes(fieldKey)
      ? selectedValues.filter(id => id !== fieldKey)
      : [...selectedValues.filter(id => !id.startsWith(`${step.id}_${fieldId}`)), fieldKey];
    
    onSelectionChange(newSelection);
  };

  const handleOtherSubmit = () => {
    if (otherValue.trim()) {
      const otherId = `other_${Date.now()}`;
      const newSelection = step.multiSelect 
        ? [...selectedValues, otherId]
        : [otherId];
      onSelectionChange(newSelection);
      setCustomValues(prev => ({ ...prev, [otherId]: otherValue.trim() }));
      setOtherValue('');
    }
  };

  const removeCustomValue = (valueId: string) => {
    const newSelection = selectedValues.filter(id => id !== valueId);
    onSelectionChange(newSelection);
    setCustomValues(prev => {
      const newCustomValues = { ...prev };
      delete newCustomValues[valueId];
      return newCustomValues;
    });
  };

  // Form Fields
  if (step.fields) {
    return (
      <div className="space-y-6">
        {step.fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 mr-1">*</span>}
            </label>
            
            {field.type === 'text' && (
              <Input
                type="text"
                value={customValues[field.id] || ''}
                onChange={(e) => handleCustomValueChange(field.id, e.target.value)}
                className="text-right"
                dir="rtl"
                placeholder={`أدخل ${field.label}`}
              />
            )}
            
            {field.type === 'email' && (
              <Input
                type="email"
                value={customValues[field.id] || ''}
                onChange={(e) => handleCustomValueChange(field.id, e.target.value)}
                className="text-right"
                dir="rtl"
                placeholder={`أدخل ${field.label}`}
              />
            )}
            
            {field.type === 'phone' && (
              <Input
                type="tel"
                value={customValues[field.id] || ''}
                onChange={(e) => handleCustomValueChange(field.id, e.target.value)}
                className="text-right"
                dir="rtl"
                placeholder={`أدخل ${field.label}`}
              />
            )}
            
            {field.type === 'number' && (
              <Input
                type="number"
                value={customValues[field.id] || ''}
                onChange={(e) => handleCustomValueChange(field.id, e.target.value)}
                className="text-right"
                dir="rtl"
                min={field.validation?.min}
                max={field.validation?.max}
                placeholder={`أدخل ${field.label}`}
              />
            )}
            
            {field.type === 'date' && (
              <Input
                type="date"
                value={customValues[field.id] || ''}
                onChange={(e) => handleCustomValueChange(field.id, e.target.value)}
                className="text-right"
                dir="rtl"
              />
            )}
            
            {field.type === 'textarea' && (
              <Textarea
                value={customValues[field.id] || ''}
                onChange={(e) => handleCustomValueChange(field.id, e.target.value)}
                className="text-right min-h-[120px]"
                dir="rtl"
                placeholder={`أدخل ${field.label}`}
              />
            )}
            
            {field.type === 'select' && field.options && (
              <div className="grid grid-cols-1 gap-2">
                {field.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleCustomValueChange(field.id, option.id)}
                    className={`p-3 rounded-lg border-2 text-right transition-all ${
                      customValues[field.id] === option.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Option-based steps
  if (step.options) {
    return (
      <div className="space-y-6">
        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {step.options.map((option) => {
            const isSelected = selectedValues.includes(option.id);
            return (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isSelected ? stepColors.selected : stepColors.card
                }`}
                onClick={() => handleOptionToggle(option.id)}
              >
                <CardContent className="p-4 text-center">
                  {option.icon && (
                    <div className="text-2xl mb-2">{option.icon}</div>
                  )}
                  <h3 className={`font-semibold ${isSelected ? stepColors.text : 'text-gray-800'}`}>
                    {option.label}
                  </h3>
                  {option.description && (
                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Custom Values Display */}
        {Object.keys(customValues).length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800 mb-3">القيم المخصصة المضافة:</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(customValues).map(([id, value]) => (
                <Badge key={id} variant="secondary" className="flex items-center gap-2">
                  {value}
                  <button
                    onClick={() => removeCustomValue(id)}
                    className="text-red-500 hover:text-red-700 ml-1"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Add Other Option */}
        {step.allowOther && (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="p-4">
              <h4 className="font-semibold text-gray-800 mb-3">إضافة خيار آخر:</h4>
              <div className="flex gap-2">
                <Input
                  value={otherValue}
                  onChange={(e) => setOtherValue(e.target.value)}
                  placeholder="اكتب خيار جديد..."
                  className="flex-1 text-right"
                  dir="rtl"
                  onKeyPress={(e) => e.key === 'Enter' && handleOtherSubmit()}
                />
                <Button onClick={handleOtherSubmit} disabled={!otherValue.trim()}>
                  إضافة
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return null;
};

export default StepContent;
