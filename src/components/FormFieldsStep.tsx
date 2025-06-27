
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { StepData } from '@/data/schoolData';

interface FormFieldsStepProps {
  step: StepData;
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
}

const FormFieldsStep = ({ step, selectedValues, onSelectionChange }: FormFieldsStepProps) => {
  const [customValues, setCustomValues] = useState<{ [key: string]: string }>({});

  const handleCustomValueChange = (fieldId: string, value: string) => {
    setCustomValues(prev => ({ ...prev, [fieldId]: value }));
    
    // For form fields, we store the value directly
    const fieldKey = `${step.id}_${fieldId}`;
    const newSelection = selectedValues.includes(fieldKey)
      ? selectedValues.filter(id => id !== fieldKey)
      : [...selectedValues.filter(id => !id.startsWith(`${step.id}_${fieldId}`)), fieldKey];
    
    onSelectionChange(newSelection);
  };

  if (!step.fields) return null;

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
};

export default FormFieldsStep;
