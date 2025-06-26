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

export const colorClasses = {
  blue: {
    card: 'border-tanween-secondary/30 bg-tanween-secondary/5',
    selected: 'border-tanween-primary bg-tanween-primary/10',
    text: 'text-tanween-primary'
  },
  green: {
    card: 'border-green-300 bg-green-50',
    selected: 'border-green-500 bg-green-100',
    text: 'text-green-700'
  },
  purple: {
    card: 'border-purple-300 bg-purple-50',
    selected: 'border-purple-500 bg-purple-100',
    text: 'text-purple-700'
  },
  orange: {
    card: 'border-orange-300 bg-orange-50',
    selected: 'border-orange-500 bg-orange-100',
    text: 'text-orange-700'
  },
  red: {
    card: 'border-red-300 bg-red-50',
    selected: 'border-red-500 bg-red-100',
    text: 'text-red-700'
  },
  indigo: {
    card: 'border-indigo-300 bg-indigo-50',
    selected: 'border-indigo-500 bg-indigo-100',
    text: 'text-indigo-700'
  },
  pink: {
    card: 'border-pink-300 bg-pink-50',
    selected: 'border-pink-500 bg-pink-100',
    text: 'text-pink-700'
  },
  yellow: {
    card: 'border-yellow-300 bg-yellow-50',
    selected: 'border-yellow-500 bg-yellow-100',
    text: 'text-yellow-700'
  },
  teal: {
    card: 'border-teal-300 bg-teal-50',
    selected: 'border-teal-500 bg-teal-100',
    text: 'text-teal-700'
  }
};

export const schoolSetupSteps: StepData[] = [
  {
    id: 'general_info',
    stepNumber: '1',
    title: '1- المعلومات العامة حول المدرسة',
    titleEn: 'General School Information',
    description: 'سيتم إدخال المعلومات العامة عن المدرسة',
    descriptionEn: 'Enter general information about the school',
    icon: '🏫',
    color: 'blue',
    fields: [
      { id: 'school_name_ar', label: 'اسم المدرسة باللغة العربية', labelEn: 'School Name in Arabic', type: 'text', required: true },
      { id: 'school_name_en', label: 'اسم المدرسة باللغة الإنجليزية', labelEn: 'School Name in English', type: 'text', required: true },
      { id: 'address_ar', label: 'عنوان المدرسة باللغة العربية', labelEn: 'School Address in Arabic', type: 'text', required: true },
      { id: 'address_en', label: 'عنوان المدرسة باللغة الإنجليزية', labelEn: 'School Address in English', type: 'text', required: true },
      { id: 'highest_grade', label: 'أعلى صف', labelEn: 'Highest Grade', type: 'text', required: true },
      { id: 'establishment_year', label: 'سنة التأسيس', labelEn: 'Establishment Year', type: 'number', required: true, validation: { min: 1900, max: new Date().getFullYear() } },
      { id: 'phone1', label: 'رقم الهاتف', labelEn: 'Phone Number', type: 'phone', required: true },
      { id: 'phone2', label: 'رقم الهاتف 2', labelEn: 'Phone Number 2', type: 'phone' },
      { id: 'email', label: 'البريد الإلكتروني', labelEn: 'Email', type: 'email', required: true },
      { id: 'website', label: 'الموقع الإلكتروني', labelEn: 'Website', type: 'text' },
      { id: 'notes', label: 'ملاحظات إضافية', labelEn: 'Additional Notes', type: 'textarea' }
    ],
    multiSelect: true,
    allowOther: true,
    options: [
      { id: 'government', label: 'حكومية', labelEn: 'Government', icon: '🏛️' },
      { id: 'private', label: 'خاصة', labelEn: 'Private', icon: '🏢' },
      { id: 'international', label: 'دولية', labelEn: 'International', icon: '🌍' },
      { id: 'nursery', label: 'حضانة', labelEn: 'Nursery', icon: '👶' },
      { id: 'kindergarten', label: 'روضة أطفال', labelEn: 'Kindergarten', icon: '🧸' },
      { id: 'school', label: 'مدرسة', labelEn: 'School', icon: '🏫' },
      { id: 'college', label: 'كلية', labelEn: 'College', icon: '🎓' },
      { id: 'university', label: 'جامعة', labelEn: 'University', icon: '🏛️' },
      { id: 'institute', label: 'معهد', labelEn: 'Institute', icon: '📚' },
      { id: 'religious_institute', label: 'معهد ديني', labelEn: 'Religious Institute', icon: '🕌' },
    ]
  },
  {
    id: 'curriculum_type',
    stepNumber: '2',
    title: '2- نوع المنهاج',
    titleEn: 'Curriculum Type',
    description: 'تحديد نوع المنهاج المعتمد في المدرسة',
    descriptionEn: 'Define the type of curriculum adopted in the school',
    icon: '📚',
    color: 'green',
    multiSelect: true,
    allowOther: true,
    options: [
      { id: 'national_curriculum', label: 'منهاج وطني', labelEn: 'National Curriculum', icon: '🏛️' },
      { id: 'international_curriculum', label: 'منهاج دولي', labelEn: 'International Curriculum', icon: '🌐' },
    ]
  },
  {
    id: 'supervision_mechanism',
    stepNumber: '3',
    title: '3- آليات العمل والإشراف داخل المدرسة',
    titleEn: 'Work and Supervision Mechanisms',
    description: 'تحديد دور الأستاذ والمشرف على المنصة',
    descriptionEn: 'Define teacher and supervisor roles on the platform',
    icon: '👥',
    color: 'purple',
    multiSelect: false,
    allowOther: false,
    options: [
      { id: 'teacher_only', label: 'الأستاذ فقط يعمل على المنصة', labelEn: 'Teacher Only Works on Platform', icon: '👨‍🏫' },
      { id: 'supervisor_only', label: 'المشرف فقط يعمل على المنصة', labelEn: 'Supervisor Only Works on Platform', icon: '👨‍💼' },
      { id: 'both_roles', label: 'الأستاذ والمشرف لهما دور على المنصة', labelEn: 'Both Teacher and Supervisor Have Roles', icon: '👥' }
    ]
  },
  {
    id: 'buildings',
    stepNumber: '4',
    title: '4- الأبنية',
    titleEn: 'Buildings',
    description: 'تعريف أسماء المباني في المدرسة',
    descriptionEn: 'Define building names in the school',
    icon: '🏢',
    color: 'green',
    multiSelect: true,
    allowOther: true,
    options: [
      { id: 'building_1', label: 'مبنى 1', labelEn: 'Building 1', icon: '🏢' },
      { id: 'building_2', label: 'مبنى 2', labelEn: 'Building 2', icon: '🏢' },
      { id: 'building_3', label: 'مبنى 3', labelEn: 'Building 3', icon: '🏢' },
      { id: 'building_4', label: 'مبنى 4', labelEn: 'Building 4', icon: '🏢' },
      { id: 'building_5', label: 'مبنى 5', labelEn: 'Building 5', icon: '🏢' },
      { id: 'internal_sector', label: 'القطاع الداخلي', labelEn: 'Internal Sector', icon: '🏠' },
      { id: 'external_sector', label: 'القطاع الخارجي', labelEn: 'External Sector', icon: '🌳' }
    ]
  },
  {
    id: 'facilities',
    stepNumber: '5',
    title: '5- القاعات والمرافق',
    titleEn: 'Halls and Facilities',
    description: 'تحديد القاعات والمرافق المتاحة في المدرسة',
    descriptionEn: 'Define available halls and facilities in the school',
    icon: '🏛️',
    color: 'purple',
    multiSelect: true,
    allowOther: true,
    options: [
      { id: 'medical_clinic', label: 'عيادة طبية', labelEn: 'Medical Clinic', icon: '🏥' },
      { id: 'teachers_lounge', label: 'غرفة استراحة المعلمين', labelEn: 'Teachers Lounge', icon: '☕' },
      { id: 'security_room', label: 'غرفة الأمن والحماية', labelEn: 'Security Room', icon: '🛡️' },
      { id: 'activities_room', label: 'غرفة الأنشطة اللاصفية', labelEn: 'Extracurricular Activities Room', icon: '🎨' },
      { id: 'counseling_room', label: 'غرفة الإرشاد النفسي', labelEn: 'Counseling Room', icon: '🧠' },
      { id: 'meeting_room', label: 'غرفة الاجتماعات', labelEn: 'Meeting Room', icon: '👥' },
      { id: 'waiting_room', label: 'غرفة الانتظار', labelEn: 'Waiting Room', icon: '⏰' },
      { id: 'control_room', label: 'غرفة التحكم والمراقبة', labelEn: 'Control and Monitoring Room', icon: '📹' },
      { id: 'server_room', label: 'غرفة الخوادم', labelEn: 'Server Room', icon: '💻' },
      { id: 'learning_resources', label: 'غرفة مصادر تعلم', labelEn: 'Learning Resources Room', icon: '📚' },
      { id: 'activities_hall', label: 'قاعة أنشطة', labelEn: 'Activities Hall', icon: '🎭' },
      { id: 'training_hall', label: 'قاعة تدريب', labelEn: 'Training Hall', icon: '💪' },
      { id: 'computer_lab', label: 'قاعة حاسوب', labelEn: 'Computer Lab', icon: '💻' },
      { id: 'gym', label: 'قاعة رياضية داخلية', labelEn: 'Indoor Gym', icon: '🏃' },
      { id: 'classroom', label: 'قاعة صفية', labelEn: 'Classroom', icon: '📝' },
      { id: 'arts_room', label: 'قاعة فنون', labelEn: 'Arts Room', icon: '🎨' },
      { id: 'music_room', label: 'قاعة موسيقى', labelEn: 'Music Room', icon: '🎵' },
      { id: 'cafeteria', label: 'كافتيريا', labelEn: 'Cafeteria', icon: '🍽️' },
      { id: 'biology_lab', label: 'مختبر أحياء', labelEn: 'Biology Lab', icon: '🧬' },
      { id: 'science_lab', label: 'مختبر علوم', labelEn: 'Science Lab', icon: '🔬' },
      { id: 'physics_lab', label: 'مختبر فيزياء', labelEn: 'Physics Lab', icon: '⚛️' },
      { id: 'chemistry_lab', label: 'مختبر كيمياء', labelEn: 'Chemistry Lab', icon: '🧪' },
      { id: 'swimming_pool', label: 'مسبح', labelEn: 'Swimming Pool', icon: '🏊' },
      { id: 'theater', label: 'مسرح', labelEn: 'Theater', icon: '🎭' },
      { id: 'prayer_room', label: 'مصلى', labelEn: 'Prayer Room', icon: '🕌' },
      { id: 'principal_office', label: 'مكتب المدير', labelEn: 'Principal Office', icon: '👔' },
      { id: 'vice_principal_office', label: 'مكتب الوكيل', labelEn: 'Vice Principal Office', icon: '📋' },
      { id: 'library', label: 'مكتبة', labelEn: 'Library', icon: '📚' },
      { id: 'outdoor_playground', label: 'ملعب خارجي', labelEn: 'Outdoor Playground', icon: '⚽' },
      { id: 'bus_stop', label: 'موقف الحافلات', labelEn: 'Bus Stop', icon: '🚌' }
    ]
  },
  {
    id: 'academic_year_setup',
    stepNumber: '6',
    title: '6- تعريف العام الدراسي',
    titleEn: 'Academic Year Setup',
    description: 'تعريف العام الدراسي الأساسي',
    descriptionEn: 'Define the basic academic year',
    icon: '📅',
    color: 'orange',
    fields: [
      { 
        id: 'yearly_organization', 
        label: 'هل يتم التنظيم على أساس العام الدراسي الكامل؟', 
        labelEn: 'Is it organized on the basis of the full academic year?', 
        type: 'select',
        options: [
          { id: 'yes', label: 'نعم', labelEn: 'Yes' },
          { id: 'no', label: 'لا', labelEn: 'No' }
        ]
      },
      { 
        id: 'academic_year_name', 
        label: 'العام الدراسي', 
        labelEn: 'Academic Year', 
        type: 'select',
        options: [
          { id: '2025-2026', label: '2025-2026', labelEn: '2025-2026' },
          { id: '2026-2027', label: '2026-2027', labelEn: '2026-2027' },
          { id: '2027-2028', label: '2027-2028', labelEn: '2027-2028' }
        ]
      },
      { id: 'academic_year_start', label: 'تاريخ بداية العام الدراسي', labelEn: 'Academic Year Start Date', type: 'date', required: true },
      { id: 'academic_year_end', label: 'تاريخ نهاية العام الدراسي', labelEn: 'Academic Year End Date', type: 'date', required: true },
      { id: 'custom_year_name', label: 'تسمية مخصصة للعام', labelEn: 'Custom Year Name', type: 'text' }
    ],
    multiSelect: false,
    allowOther: true
  },
  {
    id: 'semesters',
    stepNumber: '7',
    title: '7- الفصول الدراسية',
    titleEn: 'Academic Semesters',
    description: 'تحديد الفصول الدراسية وتواريخها',
    descriptionEn: 'Define academic semesters and their dates',
    icon: '📚',
    color: 'blue',
    multiSelect: true,
    allowOther: true,
    options: [
      { id: 'semester_1', label: 'الفصل الأول', labelEn: 'First Semester', icon: '📚', description: '2025-09-01 إلى 2026-01-15' },
      { id: 'midterm_break', label: 'العطلة الانتصافية', labelEn: 'Midterm Break', icon: '🏖️', description: '2026-01-16 إلى 2026-01-31' },
      { id: 'semester_2', label: 'الفصل الثاني', labelEn: 'Second Semester', icon: '📖', description: '2026-02-01 إلى 2026-05-31' },
      { id: 'summer_activities', label: 'دورة الأنشطة الصيفية', labelEn: 'Summer Activities Course', icon: '☀️', description: '2026-06-01 إلى 2026-08-15' }
    ]
  },
  {
    id: 'holidays_events',
    stepNumber: '8',
    title: '8- العطل والأعياد والتواريخ المميزة',
    titleEn: 'Holidays, Celebrations and Special Dates',
    description: 'تحديد العطل الرسمية والأعياد والتواريخ المميزة',
    descriptionEn: 'Define official holidays, celebrations and special dates',
    icon: '🎉',
    color: 'green',
    multiSelect: true,
    allowOther: true,
    options: [
      { id: 'mothers_day', label: 'عيد الأم', labelEn: 'Mother\'s Day', icon: '✅', description: '2026-03-21' },
      { id: 'evacuation_day', label: 'عيد الجلاء (2026-04-17)', labelEn: 'Evacuation Day (2026-04-17)', icon: '✅' },
      { id: 'labor_day', label: 'عيد العمال (2026-05-01)', labelEn: 'Labor Day (2026-05-01)', icon: '✅' },
      { id: 'martyrs_day', label: 'عيد الشهداء (2026-05-06)', labelEn: 'Martyrs Day (2026-05-06)', icon: '✅' },
      { id: 'christmas', label: 'عيد الميلاد المجيد (2025-12-25)', labelEn: 'Christmas (2025-12-25)', icon: '✅' },
      { id: 'new_year', label: 'رأس السنة الميلادية (2026-01-01)', labelEn: 'New Year (2026-01-01)', icon: '✅' },
      { id: 'eid_fitr', label: 'عيد الفطر (2026-03-20)', labelEn: 'Eid al-Fitr (2026-03-20)', icon: '✅' },
      { id: 'eid_adha', label: 'عيد الأضحى (2026-05-28)', labelEn: 'Eid al-Adha (2026-05-28)', icon: '✅' },
      { id: 'mawlid', label: 'المولد النبوي الشريف (2025-09-04)', labelEn: 'Prophet\'s Birthday (2025-09-04)', icon: '✅' },
      { id: 'hijri_new_year', label: 'رأس السنة الهجرية (2026-06-16)', labelEn: 'Hijri New Year (2026-06-16)', icon: '✅' },
      { id: 'good_friday_west', label: 'الجمعة العظيمة - غربي (2026-04-03)', labelEn: 'Good Friday - Western (2026-04-03)', icon: '✅' },
      { id: 'easter_west', label: 'عيد الفصح - غربي (2026-04-05)', labelEn: 'Easter - Western (2026-04-05)', icon: '✅' },
      { id: 'good_friday_east', label: 'الجمعة العظيمة - شرقي (2026-04-10)', labelEn: 'Good Friday - Eastern (2026-04-10)', icon: '✅' },
      { id: 'easter_east', label: 'عيد الفصح - شرقي (2026-04-12)', labelEn: 'Easter - Eastern (2026-04-12)', icon: '✅' },
      { id: 'first_term_exams', label: 'امتحانات الفصل الأول (2026-01-02)', labelEn: 'First Term Exams (2026-01-02)', icon: '✅' },
      { id: 'second_term_exams', label: 'امتحانات الفصل الثاني (2026-05-15)', labelEn: 'Second Term Exams (2026-05-15)', icon: '✅' },
      { id: 'teachers_day', label: 'يوم المعلم (2026-03-19)', labelEn: 'Teachers Day (2026-03-19)', icon: '✅' },
      { id: 'arabic_language_day', label: 'يوم اللغة العربية (2025-12-18)', labelEn: 'Arabic Language Day (2025-12-18)', icon: '✅' }
    ]
  },
  {
    id: 'grade_levels',
    stepNumber: '9',
    title: '9- المراحل والمستويات الدراسية',
    titleEn: 'Educational Stages and Grade Levels',
    description: 'تحديد المراحل الدراسية (مثل الابتدائية) والصفوف (مثل الصف الثالث)',
    descriptionEn: 'Define educational stages (like elementary) and grades (like third grade)',
    icon: '🎓',
    color: 'indigo',
    multiSelect: true,
    allowOther: true,
    options: [
      { id: 'kindergarten_stage', label: 'رياض الأطفال', labelEn: 'Kindergarten', icon: '🧸' },
      { id: 'elementary_stage', label: 'المرحلة الابتدائية', labelEn: 'Elementary Stage', icon: '📝' },
      { id: 'middle_stage', label: 'المرحلة المتوسطة', labelEn: 'Middle Stage', icon: '📚' },
      { id: 'high_stage', label: 'المرحلة الثانوية', labelEn: 'High School Stage', icon: '🎓' },
      { id: 'kg1', label: 'فئة أولى - KG1', labelEn: 'First Category - KG1', icon: '1️⃣' },
      { id: 'kg2', label: 'فئة ثانية - KG2', labelEn: 'Second Category - KG2', icon: '2️⃣' },
      { id: 'kg3', label: 'فئة ثالثة - KG3', labelEn: 'Third Category - KG3', icon: '3️⃣' },
      { id: 'grade_1', label: 'الصف الأول - Grade 1', labelEn: 'First Grade - Grade 1', icon: '1️⃣' },
      { id: 'grade_2', label: 'الصف الثاني - Grade 2', labelEn: 'Second Grade - Grade 2', icon: '2️⃣' },
      { id: 'grade_3', label: 'الصف الثالث - Grade 3', labelEn: 'Third Grade - Grade 3', icon: '3️⃣' },
      { id: 'grade_4', label: 'الصف الرابع - Grade 4', labelEn: 'Fourth Grade - Grade 4', icon: '4️⃣' },
      { id: 'grade_5', label: 'الصف الخامس - Grade 5', labelEn: 'Fifth Grade - Grade 5', icon: '5️⃣' },
      { id: 'grade_6', label: 'الصف السادس - Grade 6', labelEn: 'Sixth Grade - Grade 6', icon: '6️⃣' },
      { id: 'grade_7', label: 'الصف السابع - Grade 7', labelEn: 'Seventh Grade - Grade 7', icon: '7️⃣' },
      { id: 'grade_8', label: 'الصف الثامن - Grade 8', labelEn: 'Eighth Grade - Grade 8', icon: '8️⃣' },
      { id: 'grade_9', label: 'الصف التاسع - Grade 9', labelEn: 'Ninth Grade - Grade 9', icon: '9️⃣' },
      { id: 'grade_10', label: 'الصف العاشر - Grade 10', labelEn: 'Tenth Grade - Grade 10', icon: '🔟' },
      { id: 'grade_11', label: 'الصف الحادي عشر - Grade 11', labelEn: 'Eleventh Grade - Grade 11', icon: '1️⃣1️⃣' },
      { id: 'grade_12', label: 'بكالوريا - Grade 12', labelEn: 'Baccalaureate - Grade 12', icon: '🎓' }
    ]
  },
  {
    id: 'skills',
    stepNumber: '10',
    title: '10- المهارات الأساسية للتقييم',
    titleEn: 'Basic Skills for Assessment',
    description: 'تعريف المهارات التي يتم تقييمها من قبل المدرسين داخل النظام',
    descriptionEn: 'Define skills that are assessed by teachers within the system',
    icon: '🎯',
    color: 'green',
    multiSelect: true,
    allowOther: true,
    options: [
      { id: 'time_management', label: 'إدارة الوقت', labelEn: 'Time Management', icon: '⏰' },
      { id: 'decision_making', label: 'اتخاذ القرار', labelEn: 'Decision Making', icon: '🤔' },
      { id: 'technology_use', label: 'استخدام التكنولوجيا', labelEn: 'Technology Use', icon: '💻' },
      { id: 'innovation', label: 'الابتكار', labelEn: 'Innovation', icon: '💡' },
      { id: 'scientific_inquiry', label: 'الاستقصاء العلمي', labelEn: 'Scientific Inquiry', icon: '🔍' },
      { id: 'active_listening', label: 'الاستماع النشط', labelEn: 'Active Listening', icon: '👂' },
      { id: 'scientific_reasoning', label: 'الاستنتاج العلمي', labelEn: 'Scientific Reasoning', icon: '🧠' },
      { id: 'self_discipline', label: 'الانضباط الذاتي', labelEn: 'Self Discipline', icon: '📏' },
      { id: 'self_motivation', label: 'التحفيز الذاتي', labelEn: 'Self Motivation', icon: '🚀' },
      { id: 'scientific_analysis', label: 'التحليل العلمي', labelEn: 'Scientific Analysis', icon: '📊' },
      { id: 'collaboration', label: 'التعاون', labelEn: 'Collaboration', icon: '🤝' },
      { id: 'oral_expression', label: 'التعبير الشفهي', labelEn: 'Oral Expression', icon: '🗣️' },
      { id: 'self_learning', label: 'التعلم الذاتي', labelEn: 'Self Learning', icon: '📚' },
      { id: 'creative_thinking', label: 'التفكير الإبداعي', labelEn: 'Creative Thinking', icon: '✨' },
      { id: 'logical_thinking', label: 'التفكير المنطقي', labelEn: 'Logical Thinking', icon: '🔢' },
      { id: 'critical_thinking', label: 'التفكير النقدي', labelEn: 'Critical Thinking', icon: '🎯' },
      { id: 'teamwork', label: 'العمل الجماعي', labelEn: 'Teamwork', icon: '👥' },
      { id: 'analytical_reading', label: 'القراءة التحليلية', labelEn: 'Analytical Reading', icon: '📖' },
      { id: 'leadership', label: 'القيادة', labelEn: 'Leadership', icon: '👑' },
      { id: 'academic_writing', label: 'الكتابة الأكاديمية', labelEn: 'Academic Writing', icon: '✍️' },
      { id: 'flexibility', label: 'المرونة والتكيّف', labelEn: 'Flexibility and Adaptability', icon: '🌊' },
      { id: 'personal_responsibility', label: 'المسؤولية الشخصية', labelEn: 'Personal Responsibility', icon: '🎯' },
      { id: 'attention_to_detail', label: 'الملاحظة الدقيقة', labelEn: 'Attention to Detail', icon: '🔍' },
      { id: 'self_awareness', label: 'الوعي بالذات', labelEn: 'Self Awareness', icon: '🪞' },
      { id: 'applying_concepts', label: 'تطبيق المفاهيم', labelEn: 'Applying Concepts', icon: '⚙️' },
      { id: 'problem_solving', label: 'حل المشكلات', labelEn: 'Problem Solving', icon: '🧩' },
      { id: 'conflict_resolution', label: 'حل النزاعات', labelEn: 'Conflict Resolution', icon: '🤝' },
      { id: 'research_skills', label: 'مهارات البحث الجيدة', labelEn: 'Good Research Skills', icon: '🔬' },
      { id: 'organizational_skills', label: 'التنظيم الجيد', labelEn: 'Good Organization', icon: '📋' },
      { id: 'communication_skills', label: 'مهارات التواصل الجيدة', labelEn: 'Good Communication Skills', icon: '💬' }
    ]
  },
  {
    id: 'hobbies',
    stepNumber: '11',
    title: '11- الهوايات والاهتمامات لدى الطلاب',
    titleEn: 'Student Hobbies and Interests',
    description: 'تعريف الهوايات والاهتمامات التي يتم التركيز عليها من قبل إدارة المدرسة ضمن إطار العملية التعليمية',
    descriptionEn: 'Define hobbies and interests that are focused on by school administration within the educational process framework',
    icon: '🎨',
    color: 'green',
    multiSelect: true,
    allowOther: true,
    options: [
      { id: 'handicrafts', label: 'الأشغال اليدوية', labelEn: 'Handicrafts', icon: '✂️' },
      { id: 'video_games', label: 'الألعاب الإلكترونية', labelEn: 'Video Games', icon: '🎮' },
      { id: 'school_broadcasting', label: 'الإذاعة المدرسية', labelEn: 'School Broadcasting', icon: '📻' },
      { id: 'public_speaking', label: 'الإلقاء والخطابة', labelEn: 'Public Speaking', icon: '🎤' },
      { id: 'programming', label: 'البرمجة', labelEn: 'Programming', icon: '💻' },
      { id: 'blogging', label: 'التدوين', labelEn: 'Blogging', icon: '📝' },
      { id: 'graphic_design', label: 'التصميم الجرافيكي', labelEn: 'Graphic Design', icon: '🎨' },
      { id: 'interior_design', label: 'التصميم الداخلي', labelEn: 'Interior Design', icon: '🏠' },
      { id: '3d_design', label: 'التصميم ثلاثي الأبعاد', labelEn: '3D Design', icon: '🎯' },
      { id: 'cinematography', label: 'التصوير السينمائي', labelEn: 'Cinematography', icon: '🎬' },
      { id: 'photography', label: 'التصوير الفوتوغرافي', labelEn: 'Photography', icon: '📸' },
      { id: 'coloring', label: 'التلوين', labelEn: 'Coloring', icon: '🖍️' },
      { id: 'theater', label: 'التمثيل المسرحي', labelEn: 'Theater Acting', icon: '🎭' },
      { id: 'drawing', label: 'الرسم', labelEn: 'Drawing', icon: '✏️' },
      { id: 'digital_art', label: 'الرسم الرقمي', labelEn: 'Digital Art', icon: '🎨' },
      { id: 'dancing', label: 'الرقص', labelEn: 'Dancing', icon: '💃' },
      { id: 'robotics', label: 'الروبوتات', labelEn: 'Robotics', icon: '🤖' },
      { id: 'physical_sports', label: 'الرياضة البدنية', labelEn: 'Physical Sports', icon: '🏃' },
      { id: 'gardening', label: 'الزراعة', labelEn: 'Gardening', icon: '🌱' },
      { id: 'swimming', label: 'السباحة', labelEn: 'Swimming', icon: '🏊' },
      { id: 'travel_exploration', label: 'السفر والاستكشاف', labelEn: 'Travel and Exploration', icon: '✈️' },
      { id: 'chess', label: 'الشطرنج', labelEn: 'Chess', icon: '♟️' },
      { id: 'cooking', label: 'الطهي', labelEn: 'Cooking', icon: '👨‍🍳' },
      { id: 'running', label: 'الجري', labelEn: 'Running', icon: '🏃‍♂️' },
      { id: 'musical_instruments', label: 'العزف على الآلات الموسيقية', labelEn: 'Playing Musical Instruments', icon: '🎹' },
      { id: 'science_experiments', label: 'العلوم والتجارب', labelEn: 'Science and Experiments', icon: '🔬' },
      { id: 'volunteering', label: 'العمل التطوعي', labelEn: 'Volunteering', icon: '🤝' },
      { id: 'singing', label: 'الغناء', labelEn: 'Singing', icon: '🎤' },
      { id: 'reading', label: 'القراءة', labelEn: 'Reading', icon: '📚' },
      { id: 'creative_writing', label: 'الكتابة الإبداعية', labelEn: 'Creative Writing', icon: '✍️' },
      { id: 'collecting', label: 'جمع الطوابع / العملات', labelEn: 'Stamp/Coin Collecting', icon: '🪙' },
      { id: 'puzzle_solving', label: 'حل الألغاز', labelEn: 'Puzzle Solving', icon: '🧩' },
      { id: 'video_production', label: 'صناعة الفيديو', labelEn: 'Video Production', icon: '🎥' },
      { id: 'basketball', label: 'كرة السلة', labelEn: 'Basketball', icon: '🏀' }
    ]
  },
  {
    id: 'positive_behavioral_notes',
    stepNumber: '12',
    title: '12- الملاحظات الإيجابية',
    titleEn: 'Positive Behavioral Notes',
    description: 'قسم الملاحظات الإيجابية: تحديد الملاحظات الإيجابية التي يتم تسجيلها في النظام من قبل الكادر التعليمي',
    descriptionEn: 'Positive Notes Section: Define positive notes that are recorded in the system by educational staff',
    icon: '👍',
    color: 'green',
    multiSelect: true,
    allowOther: true,
    options: [
      { id: 'creative_idea', label: 'أبدع في تقديم فكرة جديدة', labelEn: 'Presented a creative new idea', icon: '💡' },
      { id: 'respect_teachers', label: 'أبدى احتراماً للمعلمين والموظفين', labelEn: 'Showed respect to teachers and staff', icon: '🙏' },
      { id: 'cooperation', label: 'أبدى تعاوناً مميزاً مع زملائه', labelEn: 'Showed excellent cooperation with peers', icon: '🤝' },
      { id: 'self_discipline', label: 'أظهر انضباطاً ذاتياً عالياً', labelEn: 'Demonstrated high self-discipline', icon: '📏' },
      { id: 'self_development', label: 'أظهر اهتماماً بتطوير ذاته', labelEn: 'Showed interest in self-development', icon: '📈' },
      { id: 'behavioral_improvement', label: 'أظهر تحسناً واضحاً في سلوكه', labelEn: 'Showed clear behavioral improvement', icon: '⬆️' },
      { id: 'leadership_spirit', label: 'أظهر روح القيادة', labelEn: 'Demonstrated leadership spirit', icon: '👑' },
      { id: 'problem_solving_skill', label: 'أظهر مهارة في حل المشكلات', labelEn: 'Demonstrated problem-solving skills', icon: '🧩' },
      { id: 'punctuality', label: 'احترم الوقت والتزم بالمواعيد', labelEn: 'Respected time and kept appointments', icon: '⏰' },
      { id: 'class_rules', label: 'احترم قواعد الصف', labelEn: 'Respected classroom rules', icon: '📋' },
      { id: 'quick_response', label: 'استجاب للتوجيهات بسرعة', labelEn: 'Responded quickly to instructions', icon: '⚡' },
      { id: 'uniform_compliance', label: 'التزم بالزي المدرسي', labelEn: 'Complied with school uniform', icon: '👔' },
      { id: 'good_morals', label: 'تحلّى بالأخلاق الحميدة', labelEn: 'Demonstrated good morals', icon: '✨' },
      { id: 'responsibility', label: 'تحمل المسؤولية بجدية', labelEn: 'Took responsibility seriously', icon: '🎯' },
      { id: 'positive_interaction', label: 'تفاعل بإيجابية مع المعلم', labelEn: 'Interacted positively with teacher', icon: '😊' },
      { id: 'calmness', label: 'حافظ على هدوئه في المواقف الصعبة', labelEn: 'Remained calm in difficult situations', icon: '😌' },
      { id: 'positive_spirit', label: 'ساهم في نشر الروح الإيجابية', labelEn: 'Contributed to spreading positive spirit', icon: '☀️' },
      { id: 'class_participation', label: 'شارك بفعالية في الأنشطة الصفية', labelEn: 'Actively participated in class activities', icon: '🙋' },
      { id: 'group_work', label: 'شارك في العمل الجماعي بفاعلية', labelEn: 'Effectively participated in group work', icon: '👥' },
      { id: 'confident_expression', label: 'عبّر عن آرائه بثقة واحترام', labelEn: 'Expressed opinions with confidence and respect', icon: '💬' },
      { id: 'helping_peers', label: 'قدّم المساعدة لزملائه', labelEn: 'Helped peers', icon: '🤗' },
      { id: 'cleanliness', label: 'كان حريصاً على نظافة مكانه', labelEn: 'Was careful about cleanliness of his place', icon: '🧹' },
      { id: 'model_student', label: 'كان مثالاً للطالب المثالي', labelEn: 'Was an example of an ideal student', icon: '⭐' },
      { id: 'homework_commitment', label: 'كان ملتزماً بالواجبات المنزلية', labelEn: 'Was committed to homework', icon: '📚' },
      { id: 'attendance', label: 'كان منضبطاً في الحضور والدوام', labelEn: 'Was disciplined in attendance', icon: '✅' }
    ]
  },
  {
    id: 'negative_behavioral_notes',
    stepNumber: '13',
    title: '13- الملاحظات السلبية',
    titleEn: 'Negative Behavioral Notes',
    description: 'قسم الملاحظات السلبية: تحديد الملاحظات السلبية التي يتم تسجيلها في النظام من قبل الكادر التعليمي',
    descriptionEn: 'Negative Notes Section: Define negative notes that are recorded in the system by educational staff',
    icon: '👎',
    color: 'red',
    multiSelect: true,
    allowOther: true,
    options: [
      { id: 'classroom_disruption', label: 'إثارة الفوضى داخل الصف', labelEn: 'Causing disruption in class', icon: '🔥' },
      { id: 'hiding_property', label: 'إخفاء أو إتلاف ممتلكات الغير', labelEn: 'Hiding or damaging others\' property', icon: '🚫' },
      { id: 'personal_hygiene', label: 'إهمال النظافة الشخصية', labelEn: 'Neglecting personal hygiene', icon: '🧼' },
      { id: 'inappropriate_language', label: 'استخدام ألفاظ غير لائقة', labelEn: 'Using inappropriate language', icon: '🤬' },
      { id: 'morning_assembly_late', label: 'التأخر عن الطابور الصباحي', labelEn: 'Being late for morning assembly', icon: '⏰' },
      { id: 'talking_without_permission', label: 'التحدث دون إذن', labelEn: 'Talking without permission', icon: '🗣️' },
      { id: 'sarcasm', label: 'التصرف بسخرية أو تهكم', labelEn: 'Acting with sarcasm or mockery', icon: '😏' },
      { id: 'loud_talking', label: 'الحديث بصوت مرتفع داخل الصف', labelEn: 'Talking loudly in class', icon: '📢' },
      { id: 'leaving_without_permission', label: 'الخروج من الصف دون إذن', labelEn: 'Leaving class without permission', icon: '🚪' },
      { id: 'tampering_teachers_items', label: 'العبث بأدوات المعلمين', labelEn: 'Tampering with teachers\' items', icon: '🔧' },
      { id: 'school_property_damage', label: 'العبث بممتلكات المدرسة', labelEn: 'Damaging school property', icon: '🏫' },
      { id: 'aggression', label: 'العدوانية في التعامل مع الآخرين', labelEn: 'Aggression in dealing with others', icon: '👊' },
      { id: 'frequent_absence', label: 'الغياب المتكرر دون عذر', labelEn: 'Frequent absence without excuse', icon: '❌' },
      { id: 'sleeping_in_class', label: 'النوم أثناء الحصة', labelEn: 'Sleeping during class', icon: '😴' },
      { id: 'wall_furniture_damage', label: 'تشويه الجدران أو الأثاث', labelEn: 'Damaging walls or furniture', icon: '🎨' },
      { id: 'repeated_tardiness', label: 'تكرار التأخر عن الحصص', labelEn: 'Repeated tardiness for classes', icon: '🕐' },
      { id: 'refusing_instructions', label: 'رفض الاستجابة لتعليمات المعلم', labelEn: 'Refusing to respond to teacher instructions', icon: '🙅' },
      { id: 'device_misuse', label: 'سوء استخدام الأجهزة الإلكترونية', labelEn: 'Misusing electronic devices', icon: '📱' },
      { id: 'homework_neglect', label: 'عدم أداء الواجبات المنزلية', labelEn: 'Not doing homework', icon: '📝' },
      { id: 'no_school_supplies', label: 'عدم إحضار الأدوات المدرسية', labelEn: 'Not bringing school supplies', icon: '✏️' },
      { id: 'disrespecting_peers', label: 'عدم احترام الزملاء', labelEn: 'Disrespecting peers', icon: '😠' },
      { id: 'uniform_violation', label: 'عدم الالتزام بالزي المدرسي', labelEn: 'Not complying with school uniform', icon: '👕' },
      { id: 'location_violation', label: 'عدم الالتزام بالمكان المحدد', labelEn: 'Not staying in designated area', icon: '📍' },
      { id: 'cheating', label: 'محاولة الغش في الاختبارات', labelEn: 'Attempting to cheat in exams', icon: '🔍' },
      { id: 'interrupting_teacher', label: 'مقاطعة المعلم أثناء الشرح', labelEn: 'Interrupting teacher during explanation', icon: '✋' }
    ]
  },
  {
    id: 'positive_disciplinary_actions',
    stepNumber: '14',
    title: '14- الإجراءات الإيجابية',
    titleEn: 'Positive Disciplinary Actions',
    description: 'قسم الإجراءات الإيجابية: تحديد الإجراءات الإيجابية التي يمكن اتخاذها بناءً على سلوك الطالب',
    descriptionEn: 'Positive Actions Section: Define positive actions that can be taken based on student behavior',
    icon: '🏆',
    color: 'green',
    multiSelect: true,
    allowOther: true,
    options: [
      { id: 'school_exhibition', label: 'إبراز عمله في المعرض المدرسي', labelEn: 'Display work in school exhibition', icon: '🏆' },
      { id: 'special_conversation', label: 'إتاحة حوار خاص مع الإدارة', labelEn: 'Special conversation with administration', icon: '💬' },
      { id: 'competitions', label: 'إشراكه في مسابقات أو فعاليات', labelEn: 'Involve in competitions or events', icon: '🏅' },
      { id: 'class_presentation', label: 'إعطاؤه فرصة عرض عمله أمام الصف', labelEn: 'Opportunity to present work to class', icon: '📊' },
      { id: 'school_representation', label: 'ترشيحه لتمثيل المدرسة', labelEn: 'Nominate to represent school', icon: '🎖️' },
      { id: 'enrichment_workshop', label: 'تسجيله في ورشة أو دورة إثرائية', labelEn: 'Enroll in enrichment workshop or course', icon: '📚' },
      { id: 'morning_assembly_honor', label: 'تكريمه في الطابور الصباحي', labelEn: 'Honor in morning assembly', icon: '🌅' },
      { id: 'motivational_messages', label: 'دعمه بعبارات تحفيزية مكتوبة', labelEn: 'Support with written motivational messages', icon: '✍️' },
      { id: 'appreciation_certificate', label: 'شهادة شكر وتقدير', labelEn: 'Certificate of appreciation', icon: '📜' },
      { id: 'teacher_assistant', label: 'مشاركته كمساعد معلم', labelEn: 'Participate as teacher assistant', icon: '👨‍🏫' },
      { id: 'student_record_praise', label: 'منحه إشادة في سجل الطالب', labelEn: 'Grant praise in student record', icon: '📝' },
      { id: 'excellence_card', label: 'منحه بطاقة تميز', labelEn: 'Grant excellence card', icon: '🏆' },
      { id: 'parent_thank_note', label: 'منحه رسالة شكر لولي الأمر', labelEn: 'Thank you note to parent', icon: '💌' },
      { id: 'leadership_privileges', label: 'منحه صلاحيات قيادية', labelEn: 'Grant leadership privileges', icon: '👑' },
      { id: 'activity_organization', label: 'منحه فرصة تنظيم نشاط مدرسي', labelEn: 'Opportunity to organize school activity', icon: '🎯' },
      { id: 'encouragement_voucher', label: 'منحه قسيمة تشجيعية', labelEn: 'Grant encouragement voucher', icon: '🎫' },
      { id: 'book_reward', label: 'منحه كتاباً كمكافأة', labelEn: 'Grant a book as reward', icon: '📖' },
      { id: 'daily_star', label: 'منحه نجمة سلوكية يومية', labelEn: 'Grant daily behavioral star', icon: '⭐' },
      { id: 'favorite_activities_time', label: 'منحه وقتاً للأنشطة المحببة', labelEn: 'Time for favorite activities', icon: '⏰' },
      { id: 'social_media_feature', label: 'نشر إنجازه في وسائل التواصل المدرسية', labelEn: 'Feature achievement on school social media', icon: '📱' },
      { id: 'honor_board', label: 'نشر اسمه في لوحة الشرف', labelEn: 'Name on honor board', icon: '🏅' }
    ]
  },
  {
    id: 'negative_disciplinary_actions',
    stepNumber: '15',
    title: '15- الإجراءات السلبية',
    titleEn: 'Negative Disciplinary Actions',
    description: 'قسم الإجراءات السلبية: تحديد الإجراءات السلبية التي يمكن اتخاذها بناءً على سلوك الطالب',
    descriptionEn: 'Negative Actions Section: Define negative actions that can be taken based on student behavior',
    icon: '⚠️',
    color: 'red',
    multiSelect: true,
    allowOther: true,
    options: [
      { id: 'exclude_trips', label: 'إبعاد عن الرحلات أو الأنشطة', labelEn: 'Exclude from trips or activities', icon: '🚫' },
      { id: 'notify_parent', label: 'إشعار ولي الأمر', labelEn: 'Notify parent/guardian', icon: '📞' },
      { id: 'disciplinary_task', label: 'إلزام بتنفيذ مهمة انضباطية', labelEn: 'Mandatory disciplinary task', icon: '📋' },
      { id: 'first_warning', label: 'إنذار رسمي أول', labelEn: 'First official warning', icon: '⚠️' },
      { id: 'final_warning', label: 'إنذار رسمي نهائي', labelEn: 'Final official warning', icon: '🔴' },
      { id: 'parent_meeting', label: 'استدعاء ولي الأمر', labelEn: 'Call parent for meeting', icon: '👨‍👩‍👧‍👦' },
      { id: 'gradual_punishment', label: 'التدرج في تطبيق العقوبات', labelEn: 'Gradual punishment application', icon: '📊' },
      { id: 'psychological_evaluation', label: 'التوجيه لإجراء فحص نفسي أو اجتماعي', labelEn: 'Psychological or social evaluation referral', icon: '🧠' },
      { id: 'warning_no_repeat', label: 'تحذير بعدم التكرار', labelEn: 'Warning not to repeat', icon: '⚡' },
      { id: 'behavior_committee', label: 'تحويل إلى لجنة السلوك', labelEn: 'Refer to behavior committee', icon: '👥' },
      { id: 'temporary_restriction', label: 'تقييد مؤقت لبعض الصلاحيات', labelEn: 'Temporary restriction of privileges', icon: '🔒' },
      { id: 'written_warning', label: 'تنبيه خطي', labelEn: 'Written warning', icon: '📝' },
      { id: 'verbal_warning', label: 'تنبيه شفهي', labelEn: 'Verbal warning', icon: '🗣️' },
      { id: 'written_commitment', label: 'توقيع تعهد خطي', labelEn: 'Written commitment signature', icon: '✍️' },
      { id: 'temporary_suspension', label: 'توقيف مؤقت عن الدراسة', labelEn: 'Temporary suspension from study', icon: '🚪' },
      { id: 'separate_seating', label: 'جلوس منفصل داخل الصف', labelEn: 'Separate seating in class', icon: '💺' },
      { id: 'activity_deprivation', label: 'حرمان مؤقت من النشاطات', labelEn: 'Temporary deprivation from activities', icon: '🚫' },
      { id: 'device_ban', label: 'حرمان من استخدام الأجهزة الإلكترونية', labelEn: 'Ban from using electronic devices', icon: '📱' },
      { id: 'behavior_grade_deduction', label: 'خصم من درجات السلوك', labelEn: 'Behavior grade deduction', icon: '📉' },
      { id: 'one_day_suspension', label: 'فصل ليوم دراسي واحد', labelEn: 'One school day suspension', icon: '📅' },
      { id: 'counselor_meeting', label: 'لقاء مع المرشد الطلابي', labelEn: 'Meeting with student counselor', icon: '👨‍⚕️' },
      { id: 'class_transfer', label: 'نقل مؤقت من الصف', labelEn: 'Temporary class transfer', icon: '↔️' }
    ]
  },
  {
    id: 'class_cancellation_reasons',
    stepNumber: '16',
    title: '16- أسباب إلغاء الحصص',
    titleEn: 'Class Cancellation Reasons',
    description: 'تحديد الأسباب المعتمدة التي يمكن تسجيلها عند إلغاء أي حصة',
    descriptionEn: 'Define approved reasons that can be recorded when canceling any class',
    icon: '📅',
    color: 'indigo',
    multiSelect: true,
    allowOther: true,
    options: [
      { id: 'general_health_reasons', label: 'أسباب صحية عامة', labelEn: 'General health reasons', icon: '🏥' },
      { id: 'preventive_measures', label: 'إجراءات وقائية (مثل التعقيم)', labelEn: 'Preventive measures (like disinfection)', icon: '🧽' },
      { id: 'official_holiday', label: 'إلغاء بسبب عطلة رسمية', labelEn: 'Cancellation due to official holiday', icon: '📅' },
      { id: 'emergency_staff_meeting', label: 'اجتماع طارئ للهيئة التدريسية', labelEn: 'Emergency staff meeting', icon: '👥' },
      { id: 'exam_preparations', label: 'استعدادات للاختبارات', labelEn: 'Exam preparations', icon: '📝' },
      { id: 'room_occupied', label: 'انشغال القاعة بفعالية أخرى', labelEn: 'Room occupied by another activity', icon: '🚪' },
      { id: 'power_outage', label: 'انقطاع التيار الكهربائي', labelEn: 'Power outage', icon: '⚡' },
      { id: 'schedule_conflict', label: 'تعارض مع حصة أخرى مؤجلة', labelEn: 'Conflict with another postponed class', icon: '📊' },
      { id: 'supervisory_duty', label: 'تكليف المعلم بمهمة إشرافية', labelEn: 'Teacher assigned supervisory duty', icon: '👨‍💼' },
      { id: 'evacuation_drill', label: 'تنفيذ خطة إخلاء', labelEn: 'Evacuation drill implementation', icon: '🚨' },
      { id: 'health_emergency', label: 'حالة طارئة صحية لطالب أو موظف', labelEn: 'Health emergency for student or staff', icon: '🚑' },
      { id: 'technical_failure', label: 'خلل تقني أو فني', labelEn: 'Technical or technical failure', icon: '🔧' },
      { id: 'school_trip', label: 'رحلة مدرسية', labelEn: 'School trip', icon: '🚌' },
      { id: 'classroom_maintenance', label: 'صيانة في القاعة الدراسية', labelEn: 'Classroom maintenance', icon: '🔨' },
      { id: 'administrative_request', label: 'طلب إداري بإلغاء الحصة', labelEn: 'Administrative request to cancel class', icon: '📋' },
      { id: 'severe_weather', label: 'ظروف جوية قاهرة', labelEn: 'Severe weather conditions', icon: '🌧️' },
      { id: 'teacher_absence', label: 'غياب المعلم', labelEn: 'Teacher absence', icon: '❌' },
      { id: 'school_event', label: 'فعالية داخل المدرسة', labelEn: 'School event', icon: '🎉' },
      { id: 'external_training', label: 'مشاركة المعلم في تدريب خارجي', labelEn: 'Teacher participating in external training', icon: '🎓' },
      { id: 'alternative_activity', label: 'نشاط مدرسي بديل', labelEn: 'Alternative school activity', icon: '🎯' }
    ]
  },
  {
    id: 'teaching_plans_by_grade',
    stepNumber: '17',
    title: '17- الخطط التدريسية حسب الصفوف الدراسية',
    titleEn: 'Teaching Plans by Grade Levels',
    description: 'إعداد تفصيلي للخطط التدريسية لكل صف دراسي شامل عدد الشعب والحصص والمواد وأساليب التقييم',
    descriptionEn: 'Detailed preparation of teaching plans for each grade level including sections, classes, subjects and assessment methods',
    icon: '📋',
    color: 'teal',
    multiSelect: true,
    allowOther: true,
    options: [
      { id: 'kg1_plan', label: 'خطة الروضة الأولى - KG1', labelEn: 'Kindergarten 1 Plan', icon: '🧸' },
      { id: 'kg2_plan', label: 'خطة الروضة الثانية - KG2', labelEn: 'Kindergarten 2 Plan', icon: '🎈' },
      { id: 'kg3_plan', label: 'خطة الروضة الثالثة - KG3', labelEn: 'Kindergarten 3 Plan', icon: '🎯' },
      { id: 'grade1_plan', label: 'خطة الصف الأول الابتدائي', labelEn: 'Grade 1 Elementary Plan', icon: '1️⃣' },
      { id: 'grade2_plan', label: 'خطة الصف الثاني الابتدائي', labelEn: 'Grade 2 Elementary Plan', icon: '2️⃣' },
      { id: 'grade3_plan', label: 'خطة الصف الثالث الابتدائي', labelEn: 'Grade 3 Elementary Plan', icon: '3️⃣' },
      { id: 'grade4_plan', label: 'خطة الصف الرابع الابتدائي', labelEn: 'Grade 4 Elementary Plan', icon: '4️⃣' },
      { id: 'grade5_plan', label: 'خطة الصف الخامس الابتدائي', labelEn: 'Grade 5 Elementary Plan', icon: '5️⃣' },
      { id: 'grade6_plan', label: 'خطة الصف السادس الابتدائي', labelEn: 'Grade 6 Elementary Plan', icon: '6️⃣' },
      { id: 'grade7_plan', label: 'خطة الصف السابع الإعدادي', labelEn: 'Grade 7 Middle School Plan', icon: '7️⃣' },
      { id: 'grade8_plan', label: 'خطة الصف الثامن الإعدادي', labelEn: 'Grade 8 Middle School Plan', icon: '8️⃣' },
      { id: 'grade9_plan', label: 'خطة الصف التاسع الإعدادي', labelEn: 'Grade 9 Middle School Plan', icon: '9️⃣' },
      { id: 'grade10_plan', label: 'خطة الصف العاشر الثانوي', labelEn: 'Grade 10 High School Plan', icon: '🔟' },
      { id: 'grade11_plan', label: 'خطة الصف الحادي عشر الثانوي', labelEn: 'Grade 11 High School Plan', icon: '📚' },
      { id: 'grade12_plan', label: 'خطة البكالوريا', labelEn: 'Baccalaureate Plan', icon: '🎓' }
    ]
  }
];
