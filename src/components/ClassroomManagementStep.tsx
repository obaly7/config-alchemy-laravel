import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2 } from 'lucide-react';
import { ClassroomData, buildingsList, schoolSetupSteps } from '@/data/schoolData';

interface ClassroomManagementStepProps {
  selectedHallTypes: string[];
  classrooms: ClassroomData[];
  onClassroomsChange: (classrooms: ClassroomData[]) => void;
}

const ClassroomManagementStep = ({ 
  selectedHallTypes, 
  classrooms, 
  onClassroomsChange 
}: ClassroomManagementStepProps) => {
  const [newClassroom, setNewClassroom] = useState<Partial<ClassroomData>>({
    name: '',
    buildingId: '',
    typeId: ''
  });

  const hallTypesStep = schoolSetupSteps.find(step => step.id === 'halls_facilities');
  const availableHallTypes = hallTypesStep?.options?.filter(option => 
    selectedHallTypes.includes(option.id)
  ) || [];

  const addClassroom = () => {
    if (newClassroom.name && newClassroom.buildingId && newClassroom.typeId) {
      const classroom: ClassroomData = {
        id: `classroom_${Date.now()}`,
        name: newClassroom.name,
        buildingId: newClassroom.buildingId,
        typeId: newClassroom.typeId
      };
      
      onClassroomsChange([...classrooms, classroom]);
      setNewClassroom({ name: '', buildingId: '', typeId: '' });
    }
  };

  const removeClassroom = (classroomId: string) => {
    onClassroomsChange(classrooms.filter(c => c.id !== classroomId));
  };

  const generateDefaultName = (typeId: string, count: number) => {
    const hallType = availableHallTypes.find(ht => ht.id === typeId);
    const typeName = hallType?.label || 'قاعة';
    return `${typeName} ${count + 1}`;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900 flex items-center gap-2">
            🏫 تعريف القاعات الفعلية في المدرسة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-800 mb-4">
            قم بإضافة القاعات الموجودة فعلياً في المدرسة مع تحديد المبنى ونوع القاعة لكل واحدة.
          </p>
          
          {/* Add New Classroom Form */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white rounded-lg border">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم القاعة
              </label>
              <Input
                value={newClassroom.name || ''}
                onChange={(e) => setNewClassroom(prev => ({ ...prev, name: e.target.value }))}
                placeholder="قاعة أولى"
                className="text-right"
                dir="rtl"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المبنى
              </label>
              <select
                value={newClassroom.buildingId || ''}
                onChange={(e) => setNewClassroom(prev => ({ ...prev, buildingId: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg text-right"
                dir="rtl"
              >
                <option value="">اختر المبنى</option>
                {buildingsList.map(building => (
                  <option key={building.id} value={building.id}>
                    {building.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نوع القاعة
              </label>
              <select
                value={newClassroom.typeId || ''}
                onChange={(e) => {
                  const typeId = e.target.value;
                  const classroomsOfType = classrooms.filter(c => c.typeId === typeId);
                  const defaultName = generateDefaultName(typeId, classroomsOfType.length);
                  
                  setNewClassroom(prev => ({ 
                    ...prev, 
                    typeId,
                    name: defaultName
                  }));
                }}
                className="w-full px-3 py-2 border rounded-lg text-right"
                dir="rtl"
              >
                <option value="">اختر النوع</option>
                {availableHallTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.icon} {type.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <Button
                onClick={addClassroom}
                disabled={!newClassroom.name || !newClassroom.buildingId || !newClassroom.typeId}
                className="w-full flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                إضافة قاعة
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Existing Classrooms */}
      {classrooms.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>القاعات المعرفة ({classrooms.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classrooms.map((classroom) => {
                const building = buildingsList.find(b => b.id === classroom.buildingId);
                const hallType = availableHallTypes.find(ht => ht.id === classroom.typeId);
                
                return (
                  <div key={classroom.id} className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800">{classroom.name}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeClassroom(classroom.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-1 text-sm">
                      <Badge variant="outline" className="mr-2">
                        🏢 {building?.label}
                      </Badge>
                      <Badge variant="secondary">
                        {hallType?.icon} {hallType?.label}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {availableHallTypes.length === 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <p className="text-yellow-800 text-center">
              يرجى تحديد أنواع القاعات أولاً لتتمكن من إضافة القاعات الفعلية
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClassroomManagementStep;
