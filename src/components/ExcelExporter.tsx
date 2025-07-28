
import * as XLSX from 'xlsx';
import { schoolSetupSteps } from '@/data/schoolData';
import { WizardData } from './SchoolWizard';

export const createExcelExport = (wizardData: WizardData, startTime: number, currentTime: number) => {
  console.log('Starting Excel export with all data including form fields...');
  
  const workbook = XLSX.utils.book_new();
  
  const getStepData = (stepId: string) => {
    return wizardData[stepId] || [];
  };

  const getOptionLabel = (stepId: string, optionId: string) => {
    const step = schoolSetupSteps.find(s => s.id === stepId);
    
    if (step?.options) {
      const option = step.options.find(opt => opt.id === optionId);
      return option ? { label: option.label, icon: option.icon } : { label: optionId, icon: null };
    }
    
    if (step?.fields) {
      for (const field of step.fields) {
        if (field.options) {
          const option = field.options.find(opt => opt.id === optionId);
          if (option) {
            return { label: option.label, icon: option.icon };
          }
        }
      }
    }
    
    return { label: optionId, icon: null };
  };

  const getTotalSelections = () => {
    return Object.values(wizardData).reduce((total, stepData) => total + stepData.length, 0);
  };

  const getCompletedSteps = () => {
    return Object.keys(wizardData).filter(stepId => wizardData[stepId].length > 0).length;
  };

  // Main summary sheet
  const summaryData = [];
  summaryData.push(['ملخص إعداد المدرسة', '']);
  summaryData.push(['إجمالي الخطوات المكتملة', getCompletedSteps()]);
  summaryData.push(['إجمالي الخيارات المختارة', getTotalSelections()]);
  summaryData.push(['نسبة الإكمال', `${Math.round((getCompletedSteps() / schoolSetupSteps.length) * 100)}%`]);
  summaryData.push(['وقت الإعداد (دقائق)', Math.floor((currentTime - startTime) / 60000)]);
  summaryData.push(['']);

  // Add data from all steps
  schoolSetupSteps.forEach((step) => {
    const stepData = getStepData(step.id);
    if (stepData.length > 0) {
      if (step.fields) {
        summaryData.push([step.title, '']);
        step.fields.forEach((field) => {
          const fieldData = stepData.find(data => data.startsWith(`${field.id}:`));
          if (fieldData) {
            const value = fieldData.substring(fieldData.indexOf(':') + 1).trim();
            summaryData.push([field.label, value]);
          }
        });
      } else {
        stepData.forEach((optionId) => {
          const { label } = getOptionLabel(step.id, optionId);
          summaryData.push([step.title, label]);
        });
      }
      summaryData.push(['']);
    }
  });

  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'ملخص البيانات');

  // General School Information detailed sheet
  const generalInfoStep = schoolSetupSteps.find(step => step.id === 'general_info');
  const generalInfoData = getStepData('general_info');
  
  if (generalInfoStep && generalInfoData.length > 0) {
    const generalInfoSheetData = [];
    generalInfoSheetData.push(['المعلومات العامة حول المدرسة', '']);
    generalInfoSheetData.push(['']);
    
    if (generalInfoStep.fields) {
      generalInfoStep.fields.forEach((field) => {
        const fieldData = generalInfoData.find(data => data.startsWith(`${field.id}:`));
        if (fieldData) {
          const value = fieldData.substring(fieldData.indexOf(':') + 1).trim();
          generalInfoSheetData.push([field.label, value]);
        } else {
          generalInfoSheetData.push([field.label, 'لم يتم الإدخال']);
        }
      });
    }
    
    const generalInfoSheet = XLSX.utils.aoa_to_sheet(generalInfoSheetData);
    XLSX.utils.book_append_sheet(workbook, generalInfoSheet, 'المعلومات العامة');
  }

  // Teaching Plans and Curriculum Sheet
  const curriculumData = wizardData.curriculumData || [];
  
  if (curriculumData.length > 0) {
    const teachingPlansData = [];
    teachingPlansData.push(['الخطط الدراسية والمناهج', '', '', '', '', '', '']);
    teachingPlansData.push(['']);
    
    curriculumData.forEach((gradeCurriculum: any) => {
      teachingPlansData.push([`الصف: ${gradeCurriculum.gradeId}`, '', '', '', '', '', '']);
      teachingPlansData.push(['']);
      
      if (gradeCurriculum.subjects && gradeCurriculum.subjects.length > 0) {
        teachingPlansData.push([
          'اسم المادة',
          'الحصص الأسبوعية', 
          'الدرجة العظمى',
          'درجة النجاح',
          'نوع المادة',
          'مادة مرسبة',
          'مكونات التقييم'
        ]);
        
        gradeCurriculum.subjects.forEach((subject: any) => {
          const assessmentComponents = subject.assessmentComponents || [];
          const componentsText = assessmentComponents
            .map((comp: any) => `${comp.name} (${comp.percentage}%)`)
            .join(', ');
          
          teachingPlansData.push([
            subject.name || 'غير محدد',
            subject.weeklyHours || 0,
            subject.maxGrade || 100,
            subject.passingGrade || 50,
            subject.type || 'أساسية',
            subject.isFailureSubject ? 'نعم' : 'لا',
            componentsText || 'لا توجد مكونات'
          ]);
        });
        
        teachingPlansData.push(['']);
      } else {
        teachingPlansData.push(['لا توجد مواد محددة لهذا الصف']);
        teachingPlansData.push(['']);
      }
    });
    
    const teachingPlansSheet = XLSX.utils.aoa_to_sheet(teachingPlansData);
    XLSX.utils.book_append_sheet(workbook, teachingPlansSheet, 'الخطط الدراسية');
  }

  // Detailed breakdown sheet
  const detailedData = [];
  detailedData.push(['التفاصيل الكاملة لإعداد المدرسة', '']);
  detailedData.push(['']);

  schoolSetupSteps.forEach((step, index) => {
    const stepData = getStepData(step.id);
    
    detailedData.push([`${index + 1}. ${step.title}`, '']);
    detailedData.push(['الوصف:', step.description]);
    detailedData.push(['الحالة:', stepData.length > 0 ? 'مكتمل' : 'غير مكتمل']);
    
    if (stepData.length > 0) {
      detailedData.push(['البيانات المدخلة:', '']);
      
      if (step.fields) {
        step.fields.forEach((field) => {
          const fieldData = stepData.find(data => data.startsWith(`${field.id}:`));
          if (fieldData) {
            const value = fieldData.substring(fieldData.indexOf(':') + 1).trim();
            detailedData.push(['', `${field.label}: ${value}`]);
          }
        });
      } else {
        stepData.forEach((optionId) => {
          const { label } = getOptionLabel(step.id, optionId);
          detailedData.push(['', `• ${label}`]);
        });
      }
    }
    
    detailedData.push(['']);
  });

  const detailedSheet = XLSX.utils.aoa_to_sheet(detailedData);
  XLSX.utils.book_append_sheet(workbook, detailedSheet, 'التفاصيل الكاملة');

  // Export the workbook
  const fileName = `إعداد_المدرسة_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName);
  
  console.log('Excel export completed with all data including general school information');
};
