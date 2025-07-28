
import { Button } from '@/components/ui/button';
import { FileJson, FileText } from 'lucide-react';
import { createExcelExport } from './ExcelExporter';
import { WizardData } from './SchoolWizard';

interface ExportButtonsProps {
  wizardData: WizardData;
  onExport: (format: 'json' | 'excel' | 'pdf') => void;
  startTime: number;
  currentTime: number;
}

const ExportButtons = ({ wizardData, onExport, startTime, currentTime }: ExportButtonsProps) => {
  const handleExportExcel = () => {
    console.log('Excel export button clicked');
    createExcelExport(wizardData, startTime, currentTime);
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => onExport('json')}
        type="button"
        variant="outline"
        size="lg"
        className="flex items-center gap-2 border-green-300 text-green-700"
      >
        <FileJson className="w-4 h-4" />
        تصدير JSON
      </Button>

      <Button
        onClick={handleExportExcel}
        type="button"
        variant="outline"
        size="lg"
        className="flex items-center gap-2 border-green-300 text-green-700"
      >
        <FileText className="w-4 h-4" />
        تصدير Excel
      </Button>

      <Button
        onClick={() => onExport('pdf')}
        type="button"
        variant="outline"
        size="lg"
        className="flex items-center gap-2 border-green-300 text-green-700"
      >
        <FileText className="w-4 h-4" />
        تصدير كـ PDF
      </Button>
    </div>
  );
};

export default ExportButtons;
