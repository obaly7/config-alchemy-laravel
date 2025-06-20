import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StepData, colorClasses, FieldData } from '@/data/schoolData';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

interface StepContentProps {
  step: StepData;
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
}

const StepContent = ({ step, selectedValues, onSelectionChange }: StepContentProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customOption, setCustomOption] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [formData, setFormData] = useState<{[key: string]: any}>({});

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

  const handleCustomOptionAdd = () => {
    if (customOption.trim()) {
      const customId = `custom_${Date.now()}`;
      const customLabel = customOption.trim();
      
      // Add the custom option to the step's options list temporarily
      if (step.options) {
        step.options.push({
          id: customId,
          label: customLabel,
          labelEn: customLabel,
          icon: '✨'
        });
      }
      
      // Add to selected values
      const updatedValues = step.multiSelect 
        ? [...selectedValues, customId]
        : [customId];
      
      onSelectionChange(updatedValues);
      setCustomOption('');
      setShowCustomInput(false);
    }
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    const updatedFormData = { ...formData, [fieldId]: value };
    setFormData(updatedFormData);
    
    // Convert form data to selected values format
    const formValues = Object.entries(updatedFormData)
      .filter(([_, val]) => val !== '' && val !== null && val !== undefined)
      .map(([key, val]) => `${key}:${val}`);
    
    onSelectionChange(formValues);
  };

  const renderField = (field: FieldData) => {
    const value = formData[field.id] || '';

    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-tanween-primary font-medium flex items-center gap-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.id}
              type={field.type === 'email' ? 'email' : field.type === 'phone' ? 'tel' : 'text'}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder={field.label}
              className="text-right"
              dir="rtl"
              required={field.required}
            />
            {field.type === 'phone' && (
              <p className="text-xs text-gray-500">يجب أن يبدأ بـ +962 أو +963</p>
            )}
          </div>
        );

      case 'number':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-tanween-primary font-medium flex items-center gap-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.id}
              type="number"
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder={field.label}
              min={field.validation?.min}
              max={field.validation?.max}
              required={field.required}
            />
          </div>
        );

      case 'date':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-tanween-primary font-medium flex items-center gap-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.id}
              type="date"
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              required={field.required}
            />
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-tanween-primary font-medium flex items-center gap-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              id={field.id}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder={field.label}
              className="text-right min-h-[100px]"
              dir="rtl"
              required={field.required}
            />
          </div>
        );

      case 'file':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-tanween-primary font-medium flex items-center gap-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.id}
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFieldChange(field.id, file.name);
                }
              }}
              accept="image/*"
              required={field.required}
            />
          </div>
        );

      case 'select':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-tanween-primary font-medium flex items-center gap-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Select value={value} onValueChange={(val) => handleFieldChange(field.id, val)}>
              <SelectTrigger>
                <SelectValue placeholder={`اختر ${field.label}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      default:
        return null;
    }
  };

  const filteredOptions = step.options?.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const colors = colorClasses[step.color as keyof typeof colorClasses];

  return (
    <div className="space-y-6">
      {/* Form Fields Section */}
      {step.fields && step.fields.length > 0 && (
        <div className="space-y-6 p-6 bg-tanween-primary/5 rounded-lg border border-tanween-primary/20">
          <h3 className="text-lg font-semibold text-tanween-primary mb-4">معلومات مطلوبة:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {step.fields.map(renderField)}
          </div>
        </div>
      )}

      {/* Options Section */}
      {step.options && step.options.length > 0 && (
        <>
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
                className="px-3 py-2 border border-tanween-secondary/30 rounded-lg text-sm w-64 text-right"
                dir="rtl"
              />
            )}
          </div>


          {/* Select All Button for Multiple Selection */}
          {step.multiSelect && step.options.length > 5 && (
            <div className="mb-4">
              <Button
                onClick={() => {
                  const allIds = step.options?.map(opt => opt.id) || [];
                  const allSelected = allIds.every(id => selectedValues.includes(id));
                  onSelectionChange(allSelected ? [] : allIds);
                }}
                variant="outline"
                className="border-tanween-primary text-tanween-primary hover:bg-tanween-primary/10"
              >
                {selectedValues.length === step.options.length ? 'إلغاء تحديد الكل' : 'تحديد الكل'}
              </Button>
            </div>
          )}

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
                          ? 'bg-tanween-primary border-tanween-primary' 
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
                        {option.labelEn && (
                          <span className="text-xs text-gray-500">({option.labelEn})</span>
                        )}
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

          {/* Custom Option Input */}
          {step.allowOther && showCustomInput && (
            <div className="mt-6 p-4 bg-tanween-primary/5 rounded-lg border-2 border-tanween-primary/20">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="اكتب خيارك المخصص..."
                  value={customOption}
                  onChange={(e) => setCustomOption(e.target.value)}
                  className="flex-1 px-3 py-2 border border-tanween-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-tanween-primary text-right"
                  dir="rtl"
                  onKeyPress={(e) => e.key === 'Enter' && handleCustomOptionAdd()}
                />
                <Button 
                  onClick={handleCustomOptionAdd}
                  disabled={!customOption.trim()}
                  className="bg-tanween-primary hover:bg-tanween-primary/90"
                >
                  إضافة
                </Button>
                <Button 
                  onClick={() => setShowCustomInput(false)}
                  variant="outline"
                  className="border-tanween-secondary text-tanween-secondary"
                >
                  إلغاء
                </Button>
              </div>
            </div>
          )}

          {/* Add Other Option Button */}
          {step.allowOther && !showCustomInput && (
            <div className="mt-6">
              <Button
                onClick={() => setShowCustomInput(true)}
                variant="outline"
                className="w-full border-2 border-dashed border-tanween-secondary/50 text-tanween-primary hover:bg-tanween-primary/5 hover:border-tanween-primary"
              >
                <span className="ml-2">➕</span>
                إضافة خيار آخر
              </Button>
            </div>
          )}

          {/* Selected Summary */}
          {selectedValues.length > 0 && step.options && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">الخيارات المختارة:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedValues.map((valueId) => {
                  const option = step.options?.find(opt => opt.id === valueId);
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
        </>
      )}
    </div>
  );
};

export default StepContent;