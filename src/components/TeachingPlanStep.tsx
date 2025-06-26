
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, BookOpen, Users, Clock, CheckCircle } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  weeklyHours: number;
  assessmentMethods: string[];
  notes: string;
}

interface GradePlan {
  gradeId: string;
  gradeName: string;
  sections: number;
  totalWeeklyHours: number;
  subjects: Subject[];
  generalNotes: string;
}

interface TeachingPlanStepProps {
  selectedGrades: string[];
  onDataChange: (data: GradePlan[]) => void;
  existingData?: GradePlan[];
}

const TeachingPlanStep = ({ selectedGrades, onDataChange, existingData = [] }: TeachingPlanStepProps) => {
  const [gradePlans, setGradePlans] = useState<GradePlan[]>(existingData);

  const gradeOptions = [
    { id: 'kg1_plan', name: 'الروضة الأولى - KG1', icon: '🧸' },
    { id: 'kg2_plan', name: 'الروضة الثانية - KG2', icon: '🎈' },
    { id: 'kg3_plan', name: 'الروضة الثالثة - KG3', icon: '🎯' },
    { id: 'grade1_plan', name: 'الصف الأول الابتدائي', icon: '1️⃣' },
    { id: 'grade2_plan', name: 'الصف الثاني الابتدائي', icon: '2️⃣' },
    { id: 'grade3_plan', name: 'الصف الثالث الابتدائي', icon: '3️⃣' },
    { id: 'grade4_plan', name: 'الصف الرابع الابتدائي', icon: '4️⃣' },
    { id: 'grade5_plan', name: 'الصف الخامس الابتدائي', icon: '5️⃣' },
    { id: 'grade6_plan', name: 'الصف السادس الابتدائي', icon: '6️⃣' },
    { id: 'grade7_plan', name: 'الصف السابع الإعدادي', icon: '7️⃣' },
    { id: 'grade8_plan', name: 'الصف الثامن الإعدادي', icon: '8️⃣' },
    { id: 'grade9_plan', name: 'الصف التاسع الإعدادي', icon: '9️⃣' },
    { id: 'grade10_plan', name: 'الصف العاشر الثانوي', icon: '🔟' },
    { id: 'grade11_plan', name: 'الصف الحادي عشر الثانوي', icon: '📚' },
    { id: 'grade12_plan', name: 'خطة البكالوريا', icon: '🎓' }
  ];

  const commonSubjects = [
    'اللغة العربية', 'اللغة الإنجليزية', 'الرياضيات', 'العلوم', 'التاريخ', 'الجغرافيا',
    'التربية الإسلامية', 'التربية الوطنية', 'التربية الفنية', 'التربية الرياضية',
    'التربية الموسيقية', 'الحاسوب', 'الفيزياء', 'الكيمياء', 'الأحياء', 'الفلسفة'
  ];

  const assessmentMethods = [
    'امتحان شهري', 'امتحان فصلي', 'امتحان نهائي', 'مذاكرة', 'تسميع', 'واجبات منزلية',
    'مشاريع', 'عروض تقديمية', 'أنشطة صفية', 'تقييم شفهي', 'بحوث', 'أوراق عمل'
  ];

  const initializeGradePlan = (gradeId: string): GradePlan => {
    const grade = gradeOptions.find(g => g.id === gradeId);
    return {
      gradeId,
      gradeName: grade?.name || gradeId,
      sections: 1,
      totalWeeklyHours: 30,
      subjects: [],
      generalNotes: ''
    };
  };

  const updateGradePlans = (newGradePlans: GradePlan[]) => {
    setGradePlans(newGradePlans);
    onDataChange(newGradePlans);
  };

  const addGradePlan = (gradeId: string) => {
    const existing = gradePlans.find(gp => gp.gradeId === gradeId);
    if (!existing) {
      const newPlan = initializeGradePlan(gradeId);
      updateGradePlans([...gradePlans, newPlan]);
    }
  };

  const updateGradePlan = (gradeId: string, updates: Partial<GradePlan>) => {
    const updated = gradePlans.map(gp => 
      gp.gradeId === gradeId ? { ...gp, ...updates } : gp
    );
    updateGradePlans(updated);
  };

  const addSubject = (gradeId: string) => {
    const gradePlan = gradePlans.find(gp => gp.gradeId === gradeId);
    if (gradePlan) {
      const newSubject: Subject = {
        id: `subject_${Date.now()}`,
        name: '',
        weeklyHours: 2,
        assessmentMethods: [],
        notes: ''
      };
      updateGradePlan(gradeId, {
        subjects: [...gradePlan.subjects, newSubject]
      });
    }
  };

  const updateSubject = (gradeId: string, subjectId: string, updates: Partial<Subject>) => {
    const gradePlan = gradePlans.find(gp => gp.gradeId === gradeId);
    if (gradePlan) {
      const updatedSubjects = gradePlan.subjects.map(subject =>
        subject.id === subjectId ? { ...subject, ...updates } : subject
      );
      updateGradePlan(gradeId, { subjects: updatedSubjects });
    }
  };

  const removeSubject = (gradeId: string, subjectId: string) => {
    const gradePlan = gradePlans.find(gp => gp.gradeId === gradeId);
    if (gradePlan) {
      const filteredSubjects = gradePlan.subjects.filter(subject => subject.id !== subjectId);
      updateGradePlan(gradeId, { subjects: filteredSubjects });
    }
  };

  const toggleAssessmentMethod = (gradeId: string, subjectId: string, method: string) => {
    const gradePlan = gradePlans.find(gp => gp.gradeId === gradeId);
    const subject = gradePlan?.subjects.find(s => s.id === subjectId);
    
    if (subject) {
      const currentMethods = subject.assessmentMethods;
      const newMethods = currentMethods.includes(method)
        ? currentMethods.filter(m => m !== method)
        : [...currentMethods, method];
      
      updateSubject(gradeId, subjectId, { assessmentMethods: newMethods });
    }
  };

  const getTotalHours = (subjects: Subject[]) => {
    return subjects.reduce((total, subject) => total + subject.weeklyHours, 0);
  };

  return (
    <div className="space-y-6">
      {/* Grade Selection */}
      <Card className="bg-teal-50 border-teal-200">
        <CardHeader>
          <CardTitle className="text-teal-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            اختيار الصفوف الدراسية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-teal-800 mb-4">
            اختر الصفوف الدراسية التي تريد إعداد خطط تدريسية لها:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {gradeOptions.map((grade) => (
              <button
                key={grade.id}
                onClick={() => addGradePlan(grade.id)}
                disabled={gradePlans.some(gp => gp.gradeId === grade.id)}
                className={`p-3 rounded-lg border-2 transition-all text-right ${
                  gradePlans.some(gp => gp.gradeId === grade.id)
                    ? 'border-teal-500 bg-teal-100 text-teal-700'
                    : 'border-teal-200 hover:border-teal-400 hover:bg-teal-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{grade.icon}</span>
                  <span className="font-medium">{grade.name}</span>
                  {gradePlans.some(gp => gp.gradeId === grade.id) && (
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grade Plans */}
      {gradePlans.map((gradePlan) => (
        <Card key={gradePlan.gradeId} className="overflow-hidden">
          <CardHeader className="bg-gradient-to-l from-teal-100 to-blue-100">
            <CardTitle className="flex items-center gap-3 text-teal-900">
              <span className="text-2xl">
                {gradeOptions.find(g => g.id === gradePlan.gradeId)?.icon}
              </span>
              <div>
                <h3 className="text-xl">{gradePlan.gradeName}</h3>
                <p className="text-sm text-gray-600 font-normal">
                  إعداد الخطة التدريسية التفصيلية
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  عدد الشعب
                </label>
                <Input
                  type="number"
                  min="1"
                  value={gradePlan.sections}
                  onChange={(e) => updateGradePlan(gradePlan.gradeId, { 
                    sections: parseInt(e.target.value) || 1 
                  })}
                  className="text-right"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  إجمالي الحصص الأسبوعية المقترح
                </label>
                <Input
                  type="number"
                  min="1"
                  value={gradePlan.totalWeeklyHours}
                  onChange={(e) => updateGradePlan(gradePlan.gradeId, { 
                    totalWeeklyHours: parseInt(e.target.value) || 30 
                  })}
                  className="text-right"
                />
              </div>
            </div>

            {/* Subjects */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-800">المواد الدراسية</h4>
                <Button
                  onClick={() => addSubject(gradePlan.gradeId)}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  إضافة مادة
                </Button>
              </div>

              {gradePlan.subjects.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>لم يتم إضافة مواد دراسية بعد</p>
                  <Button
                    onClick={() => addSubject(gradePlan.gradeId)}
                    variant="outline"
                    className="mt-2"
                  >
                    إضافة أول مادة
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {gradePlan.subjects.map((subject) => (
                    <Card key={subject.id} className="border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex-1 mr-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              اسم المادة
                            </label>
                            <div className="relative">
                              <Input
                                value={subject.name}
                                onChange={(e) => updateSubject(gradePlan.gradeId, subject.id, { 
                                  name: e.target.value 
                                })}
                                placeholder="اكتب اسم المادة أو اختر من القائمة"
                                className="text-right"
                                list={`subjects-${subject.id}`}
                              />
                              <datalist id={`subjects-${subject.id}`}>
                                {commonSubjects.map(subjectName => (
                                  <option key={subjectName} value={subjectName} />
                                ))}
                              </datalist>
                            </div>
                          </div>
                          
                          <div className="w-32">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              الحصص الأسبوعية
                            </label>
                            <Input
                              type="number"
                              min="1"
                              max="10"
                              value={subject.weeklyHours}
                              onChange={(e) => updateSubject(gradePlan.gradeId, subject.id, { 
                                weeklyHours: parseInt(e.target.value) || 1 
                              })}
                              className="text-center"
                            />
                          </div>

                          <Button
                            onClick={() => removeSubject(gradePlan.gradeId, subject.id)}
                            variant="outline"
                            size="sm"
                            className="ml-2 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Assessment Methods */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            أساليب التقييم
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {assessmentMethods.map((method) => (
                              <Badge
                                key={method}
                                variant={subject.assessmentMethods.includes(method) ? "default" : "outline"}
                                className={`cursor-pointer transition-colors ${
                                  subject.assessmentMethods.includes(method)
                                    ? 'bg-teal-600 hover:bg-teal-700'
                                    : 'hover:bg-gray-100'
                                }`}
                                onClick={() => toggleAssessmentMethod(gradePlan.gradeId, subject.id, method)}
                              >
                                {method}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Subject Notes */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ملاحظات خاصة بالمادة
                          </label>
                          <Textarea
                            value={subject.notes}
                            onChange={(e) => updateSubject(gradePlan.gradeId, subject.id, { 
                              notes: e.target.value 
                            })}
                            placeholder="ملاحظات حول طريقة التدريس، المراجع، التوزيع الزمني..."
                            className="text-right min-h-[60px]"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Hours Summary */}
              {gradePlan.subjects.length > 0 && (
                <Card className="mt-4 bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-800 font-medium">
                        إجمالي الحصص المضافة: {getTotalHours(gradePlan.subjects)} حصة
                      </span>
                      <span className="text-blue-600">
                        المتبقي: {gradePlan.totalWeeklyHours - getTotalHours(gradePlan.subjects)} حصة
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* General Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ملاحظات عامة حول الصف
              </label>
              <Textarea
                value={gradePlan.generalNotes}
                onChange={(e) => updateGradePlan(gradePlan.gradeId, { 
                  generalNotes: e.target.value 
                })}
                placeholder="ملاحظات عامة، متطلبات خاصة، توجيهات للمعلمين..."
                className="text-right min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {gradePlans.length === 0 && (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-8 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              ابدأ بإعداد الخطط التدريسية
            </h3>
            <p className="text-gray-500 mb-4">
              اختر الصفوف الدراسية من الأعلى لبدء إعداد خططها التدريسية
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeachingPlanStep;
