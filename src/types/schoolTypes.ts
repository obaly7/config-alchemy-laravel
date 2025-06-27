
export interface FieldData {
  id: string;
  label: string;
  labelEn?: string;
  type: 'text' | 'email' | 'phone' | 'number' | 'date' | 'file' | 'select' | 'multiselect' | 'textarea';
  required?: boolean;
  options?: { id: string; label: string; labelEn?: string; icon?: string; }[];
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
}

export interface StepData {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  color: string;
  stepNumber: string;
  fields?: FieldData[];
  multiSelect?: boolean;
  allowOther?: boolean;
  options?: {
    id: string;
    label: string;
    labelEn?: string;
    icon?: string;
    description?: string;
  }[];
}

export interface ClassroomData {
  id: string;
  name: string;
  buildingId: string;
  typeId: string;
}

export interface SubjectData {
  id: string;
  name: string;
  weeklyHours: number;
  maxGrade: number;
  passingGrade: number;
  type: 'أساسية' | 'إثرائية';
  isFailureSubject: boolean;
  assessmentComponents: AssessmentComponentData[];
}

export interface AssessmentComponentData {
  id: string;
  name: string;
  includeInFinal: boolean;
  repetitions: number;
  allRepetitionsRequired: boolean;
  grade: number;
  percentage: number;
}

export interface GradeCurriculumData {
  gradeId: string;
  subjects: SubjectData[];
}
