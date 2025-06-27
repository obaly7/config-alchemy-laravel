
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
      <HallsFacilitiesStep
        step={step}
        selectedValues={selectedValues}
        onSelectionChange={onSelectionChange}
      />
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
