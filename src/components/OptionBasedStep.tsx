
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StepData, colorClasses } from '@/data/schoolData';

interface OptionBasedStepProps {
  step: StepData;
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
}

const OptionBasedStep = ({ step, selectedValues, onSelectionChange }: OptionBasedStepProps) => {
  const [customValues, setCustomValues] = useState<{ [key: string]: string }>({});
  const [otherValue, setOtherValue] = useState('');

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

  if (!step.options) return null;

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
};

export default OptionBasedStep;
