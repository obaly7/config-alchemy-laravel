
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram } from 'lucide-react';

const ThankYouMessage = () => {
  return (
    <>
      <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="pt-6 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-green-900 mb-3">شكراً لكم من شركة تنوين</h3>
          <p className="text-green-800 text-lg mb-4">
            نتمنى لمؤسستكم التعليمية كل التوفيق والنجاح في رحلتها التعليمية
          </p>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
            size="lg"
          >
            بدء تسجيل جديد (إعداد مدرسة جديدة)
          </Button>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="border-t border-white/20 pt-8 mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <a 
            href="https://wa.me/963958555801" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <span>💬</span>
            مساعدة على الواتساب
          </a>
          <div className="flex items-center gap-4">
            <a 
              href="https://www.facebook.com/tanweenapp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-blue-300 transition-colors flex items-center gap-1"
            >
              <Facebook className="w-4 h-4" />
              فيسبوك
            </a>
            <a 
              href="https://www.instagram.com/tanweenapp/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-pink-300 transition-colors flex items-center gap-1"
            >
              <Instagram className="w-4 h-4" />
              انستغرام
            </a>
          </div>
          <div className="text-center text-sm text-white">
            <p>جميع الحقوق محفوظة لشركة AutoZone - 2025</p>
            <p>رقم هاتف الشركة: +963-11-4349</p>
            <p className="hover:text-blue-200">الموقع الإلكتروني: <a href="https://www.tanween.net/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200">www.tanween.net</a></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankYouMessage;
