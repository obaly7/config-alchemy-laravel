import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Download, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CodeDisplayProps {
  code: string;
  language: string;
  title: string;
}

const CodeDisplay = ({ code, language, title }: CodeDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    if (!code) {
      toast({
        title: "خطأ",
        description: "لا يوجد كود للنسخ",
        variant: "destructive"
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast({
        title: "تم النسخ",
        description: "تم نسخ الكود إلى الحافظة بنجاح"
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "خطأ",
        description: "فشل في نسخ الكود",
        variant: "destructive"
      });
    }
  };

  const handleDownload = () => {
    if (!code) {
      toast({
        title: "خطأ",
        description: "لا يوجد كود للتحميل",
        variant: "destructive"
      });
      return;
    }

    const extension = language === 'json' ? 'json' : 'php';
    const fileName = `${title.toLowerCase().replace(/\s+/g, '_')}.${extension}`;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "تم التحميل",
      description: `تم تحميل الملف: ${fileName}`
    });
  };

  return (
    <Card className="border-2 border-dashed border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <div className="flex gap-2">
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-green-600" />
                  تم النسخ
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  نسخ
                </>
              )}
            </Button>
            <Button
              onClick={handleDownload}
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              تحميل
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {code ? (
          <div className="relative">
            <pre className="bg-gray-50 border rounded-lg p-4 text-sm overflow-x-auto max-h-96 overflow-y-auto">
              <code className={`language-${language}`}>{code}</code>
            </pre>
          </div>
        ) : (
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500">لا يوجد كود محول بعد</p>
            <p className="text-sm text-gray-400 mt-1">قم بإدخال البيانات والضغط على "تحويل البيانات"</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CodeDisplay;