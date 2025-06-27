
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { StepData, colorClasses, ClassroomData } from '@/data/schoolData';
import ClassroomManagementStep from './ClassroomManagementStep';

interface HallsFacilitiesStepProps {
  step: StepData;
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
}

const HallsFacilitiesStep = ({ step, selectedValues, onSelectionChange }: HallsFacilitiesStepProps) => {
  const [otherValue, setOtherValue] = useState('');
  const [classrooms, setClassrooms] = useState<ClassroomData[]>([]);

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

  const handleOtherSubmit = () => {
    if (otherValue.trim()) {
      const otherId = `other_${Date.now()}`;
      const newSelection = step.multiSelect 
        ? [...selectedValues, otherId]
        : [otherId];
      onSelectionChange(newSelection);
      setOtherValue('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Original hall types selection */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">أنواع القاعات والمرافق المتوفرة</h3>
        
        {step.options && (
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
};

export default HallsFacilitiesStep;
