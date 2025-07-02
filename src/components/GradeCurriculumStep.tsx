
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, BookOpen, Target, Users } from 'lucide-react';
import { 
  GradeCurriculumData, 
  SubjectData, 
  AssessmentComponentData,
  subjectsList,
  assessmentComponentsList
} from '@/data/schoolData';

interface GradeCurriculumStepProps {
  selectedGrades: string[];
  curriculumData: GradeCurriculumData[];
  onCurriculumChange: (data: GradeCurriculumData[]) => void;
}

const GradeCurriculumStep = ({ 
  selectedGrades, 
  curriculumData, 
  onCurriculumChange 
}: GradeCurriculumStepProps) => {
  const [activeGrade, setActiveGrade] = useState<string>(selectedGrades[0] || '');
  const [activeSubject, setActiveSubject] = useState<string>('');

  const getOrCreateGradeCurriculum = (gradeId: string): GradeCurriculumData => {
    let gradeCurriculum = curriculumData.find(gc => gc.gradeId === gradeId);
    if (!gradeCurriculum) {
      gradeCurriculum = { gradeId, subjects: [] };
      onCurriculumChange([...curriculumData, gradeCurriculum]);
    }
    return gradeCurriculum;
  };

  const addSubject = (gradeId: string) => {
    const newSubject: SubjectData = {
      id: `subject_${Date.now()}`,
      name: '',
      weeklyHours: 0,
      maxGrade: 100,
      passingGrade: 50,
      type: 'أساسية',
      isFailureSubject: false,
      assessmentComponents: []
    };

    const updatedCurriculum = curriculumData.map(gc => 
      gc.gradeId === gradeId 
        ? { ...gc, subjects: [...gc.subjects, newSubject] }
        : gc
    );
    
    if (!curriculumData.find(gc => gc.gradeId === gradeId)) {
      updatedCurriculum.push({ gradeId, subjects: [newSubject] });
    }
    
    onCurriculumChange(updatedCurriculum);
    setActiveSubject(newSubject.id);
  };

  const updateSubject = (gradeId: string, subjectId: string, updates: Partial<SubjectData>) => {
    const updatedCurriculum = curriculumData.map(gc => 
      gc.gradeId === gradeId 
        ? {
            ...gc,
            subjects: gc.subjects.map(subject =>
              subject.id === subjectId ? { ...subject, ...updates } : subject
            )
          }
        : gc
    );
    onCurriculumChange(updatedCurriculum);
  };

  const removeSubject = (gradeId: string, subjectId: string) => {
    const updatedCurriculum = curriculumData.map(gc => 
      gc.gradeId === gradeId 
        ? { ...gc, subjects: gc.subjects.filter(s => s.id !== subjectId) }
        : gc
    );
    onCurriculumChange(updatedCurriculum);
    if (activeSubject === subjectId) {
      setActiveSubject('');
    }
  };

  const addAssessmentComponent = (gradeId: string, subjectId: string) => {
    const newComponent: AssessmentComponentData = {
      id: `component_${Date.now()}`,
      name: '',
      includeInFinal: true,
      repetitions: 1,
      allRepetitionsRequired: true,
      grade: 0,
      percentage: 0
    };

    const updatedCurriculum = curriculumData.map(gc => 
      gc.gradeId === gradeId 
        ? {
            ...gc,
            subjects: gc.subjects.map(subject =>
              subject.id === subjectId 
                ? { ...subject, assessmentComponents: [...subject.assessmentComponents, newComponent] }
                : subject
            )
          }
        : gc
    );
    onCurriculumChange(updatedCurriculum);
  };

  const updateAssessmentComponent = (
    gradeId: string, 
    subjectId: string, 
    componentId: string, 
    updates: Partial<AssessmentComponentData>
  ) => {
    const updatedCurriculum = curriculumData.map(gc => 
      gc.gradeId === gradeId 
        ? {
            ...gc,
            subjects: gc.subjects.map(subject =>
              subject.id === subjectId 
                ? {
                    ...subject,
                    assessmentComponents: subject.assessmentComponents.map(comp =>
                      comp.id === componentId ? { ...comp, ...updates } : comp
                    )
                  }
                : subject
            )
          }
        : gc
    );
    onCurriculumChange(updatedCurriculum);
  };

  const removeAssessmentComponent = (gradeId: string, subjectId: string, componentId: string) => {
    const updatedCurriculum = curriculumData.map(gc => 
      gc.gradeId === gradeId 
        ? {
            ...gc,
            subjects: gc.subjects.map(subject =>
              subject.id === subjectId 
                ? {
                    ...subject,
                    assessmentComponents: subject.assessmentComponents.filter(comp => comp.id !== componentId)
                  }
                : subject
            )
          }
        : gc
    );
    onCurriculumChange(updatedCurriculum);
  };

  const activeGradeCurriculum = getOrCreateGradeCurriculum(activeGrade);
  const activeSubjectData = activeGradeCurriculum.subjects.find(s => s.id === activeSubject);

  if (selectedGrades.length === 0) {
    return (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <p className="text-yellow-800 text-center">
            يرجى تحديد الصفوف الدراسية أولاً لتتمكن من إدارة الخطة الدراسية
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Grade Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            اختر الصف الدراسي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {selectedGrades.map(gradeId => {
              const subjectCount = curriculumData.find(gc => gc.gradeId === gradeId)?.subjects.length || 0;
              return (
                <button
                  key={gradeId}
                  onClick={() => setActiveGrade(gradeId)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    activeGrade === gradeId
                      ? 'border-blue-500 bg-blue-100 text-blue-800'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium">{gradeId}</div>
                  <div className="text-xs text-gray-600">{subjectCount} مادة</div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Subjects Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subjects List */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              المواد ({activeGradeCurriculum.subjects.length})
            </CardTitle>
            <Button
              onClick={() => addSubject(activeGrade)}
              size="sm"
              className="flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              إضافة مادة
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {activeGradeCurriculum.subjects.map((subject) => (
                <div
                  key={subject.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    activeSubject === subject.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveSubject(subject.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">
                        {subject.name || 'مادة جديدة'}
                      </div>
                      <div className="text-xs text-gray-600">
                        {subject.weeklyHours} حصة أسبوعية
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSubject(activeGrade, subject.id);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subject Details */}
        <div className="lg:col-span-2">
          {activeSubjectData ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  تفاصيل المادة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Subject Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">اسم المادة</label>
                    <select
                      value={activeSubjectData.name}
                      onChange={(e) => updateSubject(activeGrade, activeSubject, { name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-right"
                      dir="rtl"
                    >
                      <option value="">اختر المادة</option>
                      {subjectsList.map(subject => (
                        <option key={subject.id} value={subject.label}>
                          {subject.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">عدد الحصص الأسبوعية</label>
                    <Input
                      type="number"
                      value={activeSubjectData.weeklyHours}
                      onChange={(e) => updateSubject(activeGrade, activeSubject, { weeklyHours: parseInt(e.target.value) || 0 })}
                      min="1"
                      className="text-right"
                      dir="rtl"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">الدرجة العظمى</label>
                    <Input
                      type="number"
                      value={activeSubjectData.maxGrade}
                      onChange={(e) => updateSubject(activeGrade, activeSubject, { maxGrade: parseInt(e.target.value) || 0 })}
                      min="1"
                      className="text-right"
                      dir="rtl"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">درجة النجاح</label>
                    <Input
                      type="number"
                      value={activeSubjectData.passingGrade}
                      onChange={(e) => updateSubject(activeGrade, activeSubject, { passingGrade: parseInt(e.target.value) || 0 })}
                      min="1"
                      max={activeSubjectData.maxGrade}
                      className="text-right"
                      dir="rtl"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">نوع المادة</label>
                    <select
                      value={activeSubjectData.type}
                      onChange={(e) => updateSubject(activeGrade, activeSubject, { type: e.target.value as 'أساسية' | 'إثرائيه' })}
                      className="w-full px-3 py-2 border rounded-lg text-right"
                      dir="rtl"
                    >
                      <option value="أساسية">أساسية</option>
                      <option value="إثرائيه">إثرائيه</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isFailureSubject"
                      checked={activeSubjectData.isFailureSubject}
                      onChange={(e) => updateSubject(activeGrade, activeSubject, { isFailureSubject: e.target.checked })}
                      className="rounded"
                    />
                    <label htmlFor="isFailureSubject" className="text-sm font-medium">
                      مادة مرسبة
                    </label>
                  </div>
                </div>

                <Separator />

                {/* Assessment Components */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold">مكونات التقييم</h4>
                    <Button
                      onClick={() => addAssessmentComponent(activeGrade, activeSubject)}
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      إضافة مكون
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {activeSubjectData.assessmentComponents.map((component) => (
                      <div key={component.id} className="p-4 border rounded-lg bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-medium mb-1">اسم المكون</label>
                            <select
                              value={component.name}
                              onChange={(e) => updateAssessmentComponent(activeGrade, activeSubject, component.id, { name: e.target.value })}
                              className="w-full px-2 py-1 border rounded text-sm text-right"
                              dir="rtl"
                            >
                              <option value="">اختر المكون</option>
                              {assessmentComponentsList.map(comp => (
                                <option key={comp.id} value={comp.label}>
                                  {comp.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium mb-1">عدد التكرارات</label>
                            <Input
                              type="number"
                              value={component.repetitions}
                              onChange={(e) => updateAssessmentComponent(activeGrade, activeSubject, component.id, { repetitions: parseInt(e.target.value) || 0 })}
                              min="1"
                              className="text-sm text-right"
                              dir="rtl"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium mb-1">الدرجة</label>
                            <Input
                              type="number"
                              value={component.grade}
                              onChange={(e) => updateAssessmentComponent(activeGrade, activeSubject, component.id, { grade: parseInt(e.target.value) || 0 })}
                              min="0"
                              max={activeSubjectData.maxGrade}
                              className="text-sm text-right"
                              dir="rtl"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium mb-1">النسبة (%)</label>
                            <Input
                              type="number"
                              value={component.percentage}
                              onChange={(e) => updateAssessmentComponent(activeGrade, activeSubject, component.id, { percentage: parseInt(e.target.value) || 0 })}
                              min="0"
                              max="100"
                              className="text-sm text-right"
                              dir="rtl"
                            />
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={component.includeInFinal}
                              onChange={(e) => updateAssessmentComponent(activeGrade, activeSubject, component.id, { includeInFinal: e.target.checked })}
                              className="rounded"
                            />
                            <label className="text-xs">يدخل في المحصلة</label>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={component.allRepetitionsRequired}
                                onChange={(e) => updateAssessmentComponent(activeGrade, activeSubject, component.id, { allRepetitionsRequired: e.target.checked })}
                                className="rounded"
                              />
                              <label className="text-xs">كل التكرارات مطلوبة</label>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAssessmentComponent(activeGrade, activeSubject, component.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {activeSubjectData.assessmentComponents.length > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm text-blue-800">
                        مجموع النسب: {activeSubjectData.assessmentComponents.reduce((sum, comp) => sum + comp.percentage, 0)}%
                        {activeSubjectData.assessmentComponents.reduce((sum, comp) => sum + comp.percentage, 0) !== 100 && (
                          <span className="text-red-600 mr-2">⚠️ يجب أن يكون المجموع 100%</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600 text-center">
                  اختر مادة من القائمة أو أضف مادة جديدة
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default GradeCurriculumStep;
