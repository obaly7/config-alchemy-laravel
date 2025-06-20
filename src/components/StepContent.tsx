import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { StepData, colorClasses } from '@/data/schoolData';

interface StepContentProps {
  step: StepData;
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
}

const StepContent = ({ step, selectedValues, onSelectionChange }: StepContentProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleOptionToggle = (optionId: string) => {
    if (step.multiSelect) {
      // Multi-select: add/remove from array
      const updatedValues = selectedValues.includes(optionId)
        ? selectedValues.filter(id => id !== optionId)
        : [...selectedValues, optionId];
      onSelectionChange(updatedValues);
    } else {
      // Single select: replace array with single value
      onSelectionChange([optionId]);
    }
  };

  const filteredOptions = step.options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const colors = colorClasses[step.color as keyof typeof colorClasses];

  return (
    <div className="space-y-6">
      {/* Selection Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {step.multiSelect ? 'اختيار متعدد' : 'اختيار واحد'}
          </Badge>
          {selectedValues.length > 0 && (
            <Badge variant="default">
              تم اختيار {selectedValues.length} من {step.options.length}
            </Badge>
          )}
        </div>
        
        {step.options.length > 10 && (
          <input
            type="text"
            placeholder="البحث في الخيارات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm w-64"
          />
        )}
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOptions.map((option) => {
          const isSelected = selectedValues.includes(option.id);
          
          return (
            <Card
              key={option.id}
              className={`p-4 cursor-pointer transition-all duration-200 border-2 ${
                isSelected 
                  ? colors.selected 
                  : colors.card
              } hover:shadow-md`}
              onClick={() => handleOptionToggle(option.id)}
            >
              <div className="flex items-start gap-3">
                {step.multiSelect ? (
                  <Checkbox
                    checked={isSelected}
                    onChange={() => handleOptionToggle(option.id)}
                    className="mt-1"
                  />
                ) : (
                  <div className={`w-4 h-4 rounded-full border-2 mt-1 ${
                    isSelected 
                      ? 'bg-blue-500 border-blue-500' 
                      : 'border-gray-300'
                  }`}>
                    {isSelected && (
                      <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                    )}
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {option.icon && (
                      <span className="text-lg">{option.icon}</span>
                    )}
                    <h4 className={`font-medium ${colors.text}`}>
                      {option.label}
                    </h4>
                  </div>
                  
                  {option.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Selected Summary */}
      {selectedValues.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">الخيارات المختارة:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedValues.map((valueId) => {
              const option = step.options.find(opt => opt.id === valueId);
              return option ? (
                <Badge 
                  key={valueId} 
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {option.icon && <span>{option.icon}</span>}
                  {option.label}
                </Badge>
              ) : null;
            })}
          </div>
        </div>
      )}

      {filteredOptions.length === 0 && searchTerm && (
        <div className="text-center py-8 text-gray-500">
          <p>لا توجد نتائج للبحث "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default StepContent;