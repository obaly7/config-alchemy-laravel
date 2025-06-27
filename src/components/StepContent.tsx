
import { useState } from 'react';
import { StepData, ClassroomData, GradeCurriculumData } from '@/data/schoolData';
import TeachingPlanStep from './TeachingPlanStep';
import GradeCurriculumStep from './GradeCurriculumStep';
import OptionBasedStep from './OptionBasedStep';
import FormFieldsStep from './FormFieldsStep';
import HallsFacilitiesStep from './HallsFacilitiesStep';

interface StepContentProps {
  step: StepData;
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  wizardData?: any; // For accessing other step data
}

const StepContent = ({ step, selectedValues, onSelectionChange, wizardData }: StepContentProps) => {
  const [curriculumData, setCurriculumData] = useState<GradeCurriculumData[]>([]);

  // Handle merged teaching plans and curriculum step
  if (step.id === 'teaching_plans_curriculum') {
    const selectedGrades = wizardData?.grade_levels || [];
    return (
      <div className="space-y-8">
        {/* First show the grade selection options */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-tanween-primary">
            اختر المراحل الدراسية لإعداد الخطط التدريسية والمناهج
          </h3>
          <OptionBasedStep
            step={step}
            selectedValues={selectedValues}
            onSelectionChange={onSelectionChange}
          />
        </div>

        {/* Then show the detailed curriculum setup for selected grades */}
        {selectedValues.length > 0 && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 text-tanween-primary">
              تفاصيل المناهج والخطط التدريسية
            </h3>
            <GradeCurriculumStep
              selectedGrades={selectedValues}
              curriculumData={curriculumData}
              onCurriculumChange={setCurriculumData}
            />
          </div>
        )}
      </div>
    );
  }

  // Handle halls and facilities step with classroom management
  if (step.id === 'halls_facilities') {
    return (
      <HallsFacilitiesStep
        step={step}
        selectedValues={selectedValues}
        onSelectionChange={onSelectionChange}
      />
    );
  }

  // Form Fields
  if (step.fields) {
    return (
      <FormFieldsStep
        step={step}
        selectedValues={selectedValues}
        onSelectionChange={onSelectionChange}
      />
    );
  }

  // Option-based steps
  if (step.options) {
    return (
      <OptionBasedStep
        step={step}
        selectedValues={selectedValues}
        onSelectionChange={onSelectionChange}
      />
    );
  }

  return null;
};

export default StepContent;
