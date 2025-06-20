export interface StepData {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  options: Option[];
  multiSelect: boolean;
}

export interface Option {
  id: string;
  label: string;
  description?: string;
  icon?: string;
}

export const schoolSetupSteps: StepData[] = [
  {
    id: 'school_classification',
    title: 'تصنيف المدرسة',
    description: 'حدد نوع المدرسة والمؤسسة التعليمية',
    icon: '🏫',
    color: 'blue',
    multiSelect: false,
    options: [
      { id: 'government', label: 'حكومية', icon: '🏛️' },
      { id: 'private', label: 'خاصة', icon: '🏢' },
      { id: 'international', label: 'دولية', icon: '🌍' },
      { id: 'other_school', label: 'غير ذلك', icon: '📋' }
    ]
  },
  {
    id: 'curriculum_type',
    title: 'نوع المنهاج',
    description: 'اختر نوع المنهاج المتبع في المدرسة',
    icon: '📚',
    color: 'green',
    multiSelect: false,
    options: [
      { id: 'national', label: 'وطني', icon: '🇸🇦' },
      { id: 'international', label: 'دولي', icon: '🌐' }
    ]
  },
  {
    id: 'institution_type',
    title: 'نوع المؤسسة التعليمية',
    description: 'حدد نوع المؤسسة التعليمية',
    icon: '🎓',
    color: 'purple',
    multiSelect: false,
    options: [
      { id: 'nursery', label: 'حضانة', icon: '👶' },
      { id: 'kindergarten', label: 'روضة أطفال', icon: '🧸' },
      { id: 'school', label: 'مدرسة', icon: '🏫' },
      { id: 'college', label: 'كلية', icon: '🎓' },
      { id: 'university', label: 'جامعة', icon: '🏛️' },
      { id: 'institute', label: 'معهد', icon: '📖' },
      { id: 'religious_institute', label: 'معهد ديني', icon: '🕌' },
      { id: 'other_institution', label: 'غير ذلك', icon: '📋' }
    ]
  },
  {
    id: 'facilities',
    title: 'القاعات والمرافق',
    description: 'اختر المرافق المتوفرة في المدرسة',
    icon: '🏢',
    color: 'orange',
    multiSelect: true,
    options: [
      { id: 'medical_clinic', label: 'عيادة طبية', icon: '🏥' },
      { id: 'teachers_lounge', label: 'غرفة استراحة المعلمين', icon: '☕' },
      { id: 'security_room', label: 'غرفة الأمن والحماية', icon: '🛡️' },
      { id: 'activities_room', label: 'غرفة الأنشطة اللاصفية', icon: '🎨' },
      { id: 'counseling_room', label: 'غرفة الإرشاد النفسي', icon: '🧠' },
      { id: 'meeting_room', label: 'غرفة الاجتماعات', icon: '👥' },
      { id: 'waiting_room', label: 'غرفة الانتظار', icon: '⏰' },
      { id: 'control_room', label: 'غرفة التحكم والمراقبة', icon: '📹' },
      { id: 'server_room', label: 'غرفة الخوادم', icon: '💻' },
      { id: 'learning_resources', label: 'غرفة مصادر تعلم', icon: '📚' },
      { id: 'activities_hall', label: 'قاعة أنشطة', icon: '🎭' },
      { id: 'training_hall', label: 'قاعة تدريب', icon: '💪' },
      { id: 'computer_lab', label: 'قاعة حاسوب', icon: '💻' },
      { id: 'gym', label: 'قاعة رياضية داخلية', icon: '🏃' },
      { id: 'classroom', label: 'قاعة صفية', icon: '📝' },
      { id: 'arts_room', label: 'قاعة فنون', icon: '🎨' },
      { id: 'music_room', label: 'قاعة موسيقى', icon: '🎵' },
      { id: 'cafeteria', label: 'كافتيريا', icon: '🍽️' },
      { id: 'biology_lab', label: 'مختبر أحياء', icon: '🧬' },
      { id: 'science_lab', label: 'مختبر علوم', icon: '🔬' },
      { id: 'physics_lab', label: 'مختبر فيزياء', icon: '⚛️' },
      { id: 'chemistry_lab', label: 'مختبر كيمياء', icon: '🧪' },
      { id: 'swimming_pool', label: 'مسبح', icon: '🏊' },
      { id: 'theater', label: 'مسرح', icon: '🎭' },
      { id: 'prayer_room', label: 'مصلى', icon: '🕌' },
      { id: 'principal_office', label: 'مكتب المدير', icon: '👔' },
      { id: 'vice_principal_office', label: 'مكتب الوكيل', icon: '📋' },
      { id: 'library', label: 'مكتبة', icon: '📚' },
      { id: 'outdoor_playground', label: 'ملعب خارجي', icon: '⚽' },
      { id: 'bus_stop', label: 'موقف الحافلات', icon: '🚌' }
    ]
  },
  {
    id: 'grade_levels',
    title: 'المراحل الدراسية',
    description: 'حدد المراحل الدراسية المتوفرة',
    icon: '📖',
    color: 'indigo',
    multiSelect: true,
    options: [
      { id: 'kindergarten', label: 'رياض الأطفال', icon: '🧸' },
      { id: 'elementary', label: 'المرحلة الابتدائية', icon: '📝' },
      { id: 'middle', label: 'المرحلة المتوسطة', icon: '📚' },
      { id: 'high', label: 'المرحلة الثانوية', icon: '🎓' }
    ]
  },
  {
    id: 'subjects',
    title: 'المواد العلمية',
    description: 'اختر المواد التي يتم تدريسها',
    icon: '📝',
    color: 'red',
    multiSelect: true,
    options: [
      { id: 'arabic', label: 'اللغة العربية', icon: '📝' },
      { id: 'grammar', label: 'القواعد والإعراب', icon: '📖' },
      { id: 'spelling', label: 'الإملاء', icon: '✏️' },
      { id: 'anthem', label: 'النشيد', icon: '🎵' },
      { id: 'natural_sciences', label: 'العلوم الطبيعية', icon: '🔬' },
      { id: 'biology', label: 'علم الأحياء', icon: '🧬' },
      { id: 'physics', label: 'الفيزياء', icon: '⚛️' },
      { id: 'chemistry', label: 'الكيمياء', icon: '🧪' },
      { id: 'social_studies', label: 'الاجتماعيات', icon: '🌍' },
      { id: 'history', label: 'التاريخ', icon: '📜' },
      { id: 'geography', label: 'الجغرافيا', icon: '🗺️' },
      { id: 'national_education', label: 'التربية الوطنية', icon: '🇸🇦' },
      { id: 'mathematics', label: 'الرياضيات', icon: '🔢' },
      { id: 'geometry', label: 'الهندسة', icon: '📐' },
      { id: 'calculus', label: 'التحليل الرياضي', icon: '📊' },
      { id: 'algebra', label: 'الجبر', icon: '🔢' },
      { id: 'trigonometry', label: 'المثلثات', icon: '📐' },
      { id: 'english', label: 'اللغة الإنجليزية', icon: '🇺🇸' },
      { id: 'french', label: 'اللغة الفرنسية', icon: '🇫🇷' },
      { id: 'german', label: 'اللغة الألمانية', icon: '🇩🇪' },
      { id: 'spanish', label: 'اللغة الإسبانية', icon: '🇪🇸' },
      { id: 'computer', label: 'الحاسوب', icon: '💻' },
      { id: 'robotics', label: 'الروبوت', icon: '🤖' },
      { id: 'programming', label: 'البرمجة', icon: '👨‍💻' },
      { id: 'philosophy', label: 'الفلسفة', icon: '🤔' },
      { id: 'critical_thinking', label: 'التفكير النقدي', icon: '🧠' },
      { id: 'islamic_education', label: 'التربية الدينية الإسلامية', icon: '🕌' },
      { id: 'quran', label: 'القرآن الكريم والتجويد', icon: '📖' },
      { id: 'hadith', label: 'الحديث النبوي الشريف', icon: '📜' },
      { id: 'fiqh', label: 'الفقه', icon: '⚖️' },
      { id: 'christian_education', label: 'التربية الدينية المسيحية', icon: '✝️' },
      { id: 'physical_education', label: 'التربية البدنية', icon: '🏃' },
      { id: 'art_education', label: 'التربية الفنية', icon: '🎨' },
      { id: 'music', label: 'الموسيقى', icon: '🎵' },
      { id: 'theater', label: 'المسرح', icon: '🎭' },
      { id: 'life_skills', label: 'المهارات الحياتية', icon: '🔧' },
      { id: 'communication_skills', label: 'مهارات التواصل', icon: '💬' },
      { id: 'innovation_design', label: 'الابتكار والتصميم', icon: '💡' },
      { id: 'home_economics', label: 'الاقتصاد المنزلي', icon: '🏠' },
      { id: 'scientific_research', label: 'البحث العلمي', icon: '🔍' }
    ]
  },
  {
    id: 'platform_roles',
    title: 'الأدوار على المنصة',
    description: 'حدد من يمكنه العمل على المنصة',
    icon: '👥',
    color: 'cyan',
    multiSelect: false,
    options: [
      { id: 'teacher_only', label: 'الأستاذ فقط يعمل على المنصة', icon: '👨‍🏫' },
      { id: 'supervisor_only', label: 'المشرف فقط يعمل على المنصة', icon: '👨‍💼' },
      { id: 'teacher_supervisor', label: 'الأستاذ والمشرف لهما دور على المنصة', icon: '👥' }
    ]
  },
  {
    id: 'skills',
    title: 'المهارات المطلوبة',
    description: 'اختر المهارات التي تريد تطويرها لدى الطلاب',
    icon: '🎯',
    color: 'pink',
    multiSelect: true,
    options: [
      { id: 'time_management', label: 'إدارة الوقت', description: 'القدرة على تنظيم الوقت وتحديد الأولويات', icon: '⏰' },
      { id: 'decision_making', label: 'اتخاذ القرار', description: 'اختيار الحل الأنسب للمواقف', icon: '🤔' },
      { id: 'technology_use', label: 'استخدام التكنولوجيا', description: 'توظيف الأدوات الرقمية', icon: '💻' },
      { id: 'innovation', label: 'الابتكار', description: 'إنتاج أفكار جديدة وغير تقليدية', icon: '💡' },
      { id: 'scientific_inquiry', label: 'الاستقصاء العلمي', description: 'جمع وتحليل المعلومات', icon: '🔍' },
      { id: 'active_listening', label: 'الاستماع النشط', description: 'الاستماع بتركيز دون مقاطعة', icon: '👂' },
      { id: 'scientific_reasoning', label: 'الاستنتاج العلمي', description: 'استخلاص نتائج مبنية على أدلة', icon: '🧠' },
      { id: 'self_discipline', label: 'الانضباط الذاتي', description: 'الالتزام بالقوانين والتعليمات', icon: '📏' },
      { id: 'self_motivation', label: 'التحفيز الذاتي', description: 'تحفيز النفس لتحقيق الأهداف', icon: '🚀' },
      { id: 'scientific_analysis', label: 'التحليل العلمي', description: 'فهم وتحليل الظواهر', icon: '📊' },
      { id: 'collaboration', label: 'التعاون', description: 'العمل مع الآخرين بشكل فعّال', icon: '🤝' },
      { id: 'oral_expression', label: 'التعبير الشفهي', description: 'التعبير عن الأفكار بوضوح', icon: '🗣️' },
      { id: 'self_learning', label: 'التعلم الذاتي', description: 'تعلم دون الاعتماد على المعلم', icon: '📚' },
      { id: 'creative_thinking', label: 'التفكير الإبداعي', description: 'توليد أفكار جديدة', icon: '✨' },
      { id: 'logical_thinking', label: 'التفكير المنطقي', description: 'التحليل المنطقي للبيانات', icon: '🔢' },
      { id: 'critical_thinking', label: 'التفكير النقدي', description: 'تحليل عقلاني للمعلومات', icon: '🎯' },
      { id: 'teamwork', label: 'العمل الجماعي', description: 'المشاركة في فرق العمل', icon: '👥' },
      { id: 'analytical_reading', label: 'القراءة التحليلية', description: 'فهم النصوص وتحليلها', icon: '📖' },
      { id: 'leadership', label: 'القيادة', description: 'تحفيز وتوجيه الآخرين', icon: '👑' },
      { id: 'academic_writing', label: 'الكتابة الأكاديمية', description: 'كتابة منظمة في السياق الأكاديمي', icon: '✍️' },
      { id: 'flexibility', label: 'المرونة والتكيّف', description: 'التكيف مع الظروف الجديدة', icon: '🌊' },
      { id: 'personal_responsibility', label: 'المسؤولية الشخصية', description: 'تحمل مسؤولية الأفعال', icon: '🎯' },
      { id: 'attention_to_detail', label: 'الملاحظة الدقيقة', description: 'الانتباه للتفاصيل', icon: '🔍' },
      { id: 'self_awareness', label: 'الوعي بالذات', description: 'فهم المشاعر والسلوك', icon: '🪞' },
      { id: 'applying_concepts', label: 'تطبيق المفاهيم', description: 'تطبيق المعرفة النظرية', icon: '⚙️' },
      { id: 'problem_solving', label: 'حل المشكلات', description: 'إيجاد حلول منطقية للتحديات', icon: '🧩' },
      { id: 'conflict_resolution', label: 'حل النزاعات', description: 'إدارة الخلافات بشكل بنّاء', icon: '🤝' },
      { id: 'research_skills', label: 'مهارات البحث', description: 'جمع وتحليل المعلومات', icon: '🔬' },
      { id: 'organizational_skills', label: 'التنظيم الجيد', description: 'تنظيم الموارد والمهام', icon: '📋' },
      { id: 'communication_skills', label: 'مهارات التواصل', description: 'نقل الأفكار بوضوح', icon: '💬' }
    ]
  }
];

export const colorClasses = {
  blue: {
    card: 'border-blue-200 bg-blue-50 hover:bg-blue-100',
    icon: 'text-blue-600',
    text: 'text-blue-800',
    selected: 'border-blue-500 bg-blue-100'
  },
  green: {
    card: 'border-green-200 bg-green-50 hover:bg-green-100',
    icon: 'text-green-600',
    text: 'text-green-800',
    selected: 'border-green-500 bg-green-100'
  },
  purple: {
    card: 'border-purple-200 bg-purple-50 hover:bg-purple-100',
    icon: 'text-purple-600',
    text: 'text-purple-800',
    selected: 'border-purple-500 bg-purple-100'
  },
  orange: {
    card: 'border-orange-200 bg-orange-50 hover:bg-orange-100',
    icon: 'text-orange-600',
    text: 'text-orange-800',
    selected: 'border-orange-500 bg-orange-100'
  },
  indigo: {
    card: 'border-indigo-200 bg-indigo-50 hover:bg-indigo-100',
    icon: 'text-indigo-600',
    text: 'text-indigo-800',
    selected: 'border-indigo-500 bg-indigo-100'
  },
  red: {
    card: 'border-red-200 bg-red-50 hover:bg-red-100',
    icon: 'text-red-600',
    text: 'text-red-800',
    selected: 'border-red-500 bg-red-100'
  },
  cyan: {
    card: 'border-cyan-200 bg-cyan-50 hover:bg-cyan-100',
    icon: 'text-cyan-600',
    text: 'text-cyan-800',
    selected: 'border-cyan-500 bg-cyan-100'
  },
  pink: {
    card: 'border-pink-200 bg-pink-50 hover:bg-pink-100',
    icon: 'text-pink-600',
    text: 'text-pink-800',
    selected: 'border-pink-500 bg-pink-100'
  }
};