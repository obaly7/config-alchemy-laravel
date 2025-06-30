
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Save } from 'lucide-react';
import ExportButtons from './ExportButtons';
import { WizardData } from './SchoolWizard';

interface UserInfoFormProps {
  wizardData: WizardData;
  onSendEmail: (userInfo: {name: string, phone: string, email: string}) => void;
  onExport: (format: 'json' | 'excel' | 'pdf') => void;
  onBack: () => void;
  startTime: number;
  currentTime: number;
}

const UserInfoForm = ({ wizardData, onSendEmail, onExport, onBack, startTime, currentTime }: UserInfoFormProps) => {
  return (
    <Card className="mb-8 bg-green-50 border-green-200">
      <CardContent className="pt-6">
        <h4 className="font-semibold text-green-900 mb-4 text-xl">معلومات الشخص المسؤول</h4>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const userInfo = {
            name: formData.get('name') as string,
            phone: formData.get('phone') as string,
            email: formData.get('email') as string
          };
          onSendEmail(userInfo);
        }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-green-900 mb-2">الاسم الكامل</label>
              <input 
                name="name"
                type="text" 
                required
                className="w-full px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-right bg-white" 
                dir="rtl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-900 mb-2">رقم الهاتف</label>
              <input 
                name="phone"
                type="tel" 
                required
                className="w-full px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-right bg-white" 
                dir="rtl"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-green-900 mb-2">البريد الإلكتروني الخاص بالشخص المسؤول</label>
              <input 
                name="email"
                type="email" 
                required
                className="w-full px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-right bg-white" 
                dir="rtl"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={onBack}
              type="button"
              variant="outline"
              size="lg"
              className="flex items-center gap-2 w-full sm:w-auto border-green-300 text-green-700"
            >
              <ArrowRight className="w-4 h-4" />
              العودة للتعديل
            </Button>

            <ExportButtons 
              wizardData={wizardData}
              onExport={onExport}
              startTime={startTime}
              currentTime={currentTime}
            />

            <Button
              type="submit"
              size="lg"
              className="flex items-center gap-2 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
            >
              <Save className="w-4 h-4" />
              حفظ وإرسال إلى: info@tanween.net
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserInfoForm;
