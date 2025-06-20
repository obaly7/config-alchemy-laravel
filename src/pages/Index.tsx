import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, FileText, Code2, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CodeDisplay from '@/components/CodeDisplay';

const Index = () => {
  const [inputData, setInputData] = useState('');
  const [arrayName, setArrayName] = useState('data_options');
  const [convertedData, setConvertedData] = useState({
    phpArray: '',
    json: '',
    seeder: '',
    controller: ''
  });
  const { toast } = useToast();

  const handleConvert = () => {
    if (!inputData.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال البيانات المراد تحويلها",
        variant: "destructive"
      });
      return;
    }

    // تحويل البيانات المدخلة إلى مصفوفة
    const lines = inputData.split('\n').filter(line => line.trim());
    const dataArray = lines.map(line => line.trim());

    // تحويل إلى PHP Array
    const phpArray = `<?php

return [
    '${arrayName}' => [
        ${dataArray.map(item => `'${item}'`).join(',\n        ')}
    ]
];`;

    // تحويل إلى JSON
    const jsonData = JSON.stringify({ [arrayName]: dataArray }, null, 4);

    // تحويل إلى Laravel Seeder
    const seeder = `<?php

namespace Database\\Seeders;

use Illuminate\\Database\\Seeder;
use Illuminate\\Support\\Facades\\DB;

class ${arrayName.charAt(0).toUpperCase() + arrayName.slice(1)}Seeder extends Seeder
{
    public function run()
    {
        $data = [
            ${dataArray.map(item => `'${item}'`).join(',\n            ')}
        ];

        foreach ($data as $item) {
            DB::table('${arrayName}')->insert([
                'name' => $item,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}`;

    // تحويل إلى Laravel Controller
    const controller = `<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use Illuminate\\Http\\JsonResponse;

class ${arrayName.charAt(0).toUpperCase() + arrayName.slice(1)}Controller extends Controller
{
    public function get${arrayName.charAt(0).toUpperCase() + arrayName.slice(1)}(): JsonResponse
    {
        $data = [
            ${dataArray.map(item => `'${item}'`).join(',\n            ')}
        ];

        return response()->json([
            'success' => true,
            '${arrayName}' => $data
        ]);
    }
}`;

    setConvertedData({
      phpArray,
      json: jsonData,
      seeder,
      controller
    });

    toast({
      title: "تم التحويل بنجاح",
      description: "تم تحويل البيانات إلى جميع التنسيقات المطلوبة"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">محول البيانات إلى Laravel</h1>
          </div>
          <p className="text-xl text-gray-600 mb-6">
            أداة لتحويل البيانات إلى كائنات Laravel قابلة للاستخدام
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
              PHP Arrays
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Database className="w-3 h-3" />
              Laravel Seeder
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Code2 className="w-3 h-3" />
              Controller
            </Badge>
            <Badge variant="secondary">JSON</Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                إدخال البيانات
              </CardTitle>
              <CardDescription>
                أدخل البيانات المراد تحويلها، كل عنصر في سطر منفصل
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="array-name">اسم المصفوفة</Label>
                <Input
                  id="array-name"
                  value={arrayName}
                  onChange={(e) => setArrayName(e.target.value)}
                  placeholder="data_options"
                  className="text-right"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="data-input">البيانات (كل عنصر في سطر منفصل)</Label>
                <Textarea
                  id="data-input"
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                  placeholder="حكومية&#10;خاصة&#10;دولية&#10;غير ذلك"
                  className="min-h-[200px] text-right"
                  dir="rtl"
                />
              </div>
              
              {/* Sample Data Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setInputData('حكومية\nخاصة\nدولية\nغير ذلك');
                    setArrayName('school_type');
                  }}
                >
                  نموذج: أنواع المدارس
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setInputData('وطني\nدولي');
                    setArrayName('curriculum_type');
                  }}
                >
                  نموذج: أنواع المناهج
                </Button>
              </div>
              
              <Button onClick={handleConvert} className="w-full" size="lg">
                <Code2 className="w-4 h-4 mr-2" />
                تحويل البيانات
              </Button>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-green-600" />
                النتائج المحولة
              </CardTitle>
              <CardDescription>
                اختر التنسيق المطلوب وانسخ الكود
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="php" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="php">PHP Array</TabsTrigger>
                  <TabsTrigger value="json">JSON</TabsTrigger>
                  <TabsTrigger value="seeder">Seeder</TabsTrigger>
                  <TabsTrigger value="controller">Controller</TabsTrigger>
                </TabsList>
                
                <TabsContent value="php" className="mt-4">
                  <CodeDisplay 
                    code={convertedData.phpArray}
                    language="php"
                    title="PHP Array"
                  />
                </TabsContent>
                
                <TabsContent value="json" className="mt-4">
                  <CodeDisplay 
                    code={convertedData.json}
                    language="json"
                    title="JSON"
                  />
                </TabsContent>
                
                <TabsContent value="seeder" className="mt-4">
                  <CodeDisplay 
                    code={convertedData.seeder}
                    language="php"
                    title="Laravel Seeder"
                  />
                </TabsContent>
                
                <TabsContent value="controller" className="mt-4">
                  <CodeDisplay 
                    code={convertedData.controller}
                    language="php"
                    title="Laravel Controller"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Usage Examples */}
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle>أمثلة على الاستخدام</CardTitle>
            <CardDescription>كيفية استخدام الكود المحول في مشروع Laravel</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-blue-600">استخدام في Config File:</h4>
              <code className="text-sm bg-gray-100 p-2 rounded block">
                config/options.php
              </code>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-green-600">استخدام في Blade:</h4>
              <code className="text-sm bg-gray-100 p-2 rounded block">
                @php $options = config('options.school_type') @endphp
              </code>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-purple-600">استخدام في Vue.js:</h4>
              <code className="text-sm bg-gray-100 p-2 rounded block">
                axios.get('/api/school-types')
              </code>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-orange-600">تشغيل Seeder:</h4>
              <code className="text-sm bg-gray-100 p-2 rounded block">
                php artisan db:seed --class=SchoolTypeSeeder
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;