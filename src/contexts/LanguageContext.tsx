import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.courses': 'الدورات',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    
    // Hero
    'hero.title': 'معهد IZ للتكوين شبه الطبي',
    'hero.subtitle': 'احصل على شهادة معتمدة في المجال شبه الطبي',
    'hero.cta': 'استكشف الدورات',
    
    // Courses
    'courses.title': 'دوراتنا التكوينية',
    'courses.subtitle': 'اختر من بين مجموعة متنوعة من الدورات المعتمدة',
    'courses.enroll': 'سجل الآن',
    'courses.details': 'تفاصيل الدورة',
    'courses.duration': 'المدة',
    'courses.certificate': 'شهادة معتمدة',
    
    // Course Names
    'course.nursing': 'التمريض العام',
    'course.nursing.desc': 'تعلم أساسيات الرعاية التمريضية والإسعافات الأولية',
    'course.pharmacy': 'مساعد صيدلي',
    'course.pharmacy.desc': 'إدارة الأدوية وخدمة العملاء في الصيدليات',
    'course.laboratory': 'تقني مختبر',
    'course.laboratory.desc': 'تحليل العينات الطبية والفحوصات المخبرية',
    'course.radiology': 'تقني أشعة',
    'course.radiology.desc': 'التصوير الطبي والأشعة التشخيصية',
    'course.physiotherapy': 'العلاج الطبيعي',
    'course.physiotherapy.desc': 'إعادة التأهيل والعلاج الفيزيائي',
    'course.emergency': 'الإسعافات الأولية',
    'course.emergency.desc': 'التدخل السريع وإنقاذ الحياة',
    'course.elderly': 'رعاية المسنين',
    'course.elderly.desc': 'العناية الخاصة بكبار السن',
    'course.pediatric': 'رعاية الأطفال',
    'course.pediatric.desc': 'التمريض والعناية بالأطفال',
    'course.dental': 'مساعد طبيب أسنان',
    'course.dental.desc': 'المساعدة في عيادات طب الأسنان',
    'course.nutrition': 'التغذية العلاجية',
    'course.nutrition.desc': 'التخطيط الغذائي والحميات الصحية',
    
    // Pricing
    'pricing.title': 'أسعارنا',
    'pricing.single': 'دورة واحدة',
    'pricing.double': 'دورتان',
    'pricing.single.price': '4,900 دج',
    'pricing.double.price': '9,800 دج',
    'pricing.single.features': 'شهادة معتمدة واحدة',
    'pricing.double.features': 'دورة مجانية + 3 شهادات معتمدة + توصيل مجاني',
    'pricing.delivery': 'التوصيل',
    'pricing.delivery.paid': 'مدفوع',
    'pricing.delivery.free': 'مجاني',
    
    // Form
    'form.title': 'التسجيل في الدورة',
    'form.firstname': 'الاسم',
    'form.lastname': 'اللقب',
    'form.birthdate': 'تاريخ الميلاد',
    'form.birthplace': 'مكان الميلاد',
    'form.address': 'العنوان الشخصي',
    'form.phone': 'رقم الهاتف',
    'form.email': 'البريد الإلكتروني',
    'form.payment': 'طريقة الدفع',
    'form.payment.cash': 'الدفع عند الاستلام',
    'form.payment.card': 'بطاقة الذهب الجزائرية',
    'form.submit': 'تأكيد التسجيل',
    'form.success': 'تم التسجيل بنجاح!',
    'form.course.select': 'اختر الدورة',
    'form.package': 'اختر الباقة',
    
    // Footer
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.address': 'الجزائر',
    
    // General
    'general.learnMore': 'اعرف المزيد',
    'general.months': 'أشهر',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.courses': 'Formations',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Institut IZ de Formation Paramédicale',
    'hero.subtitle': 'Obtenez un certificat accrédité dans le domaine paramédical',
    'hero.cta': 'Explorer les formations',
    
    // Courses
    'courses.title': 'Nos Formations',
    'courses.subtitle': 'Choisissez parmi une variété de formations accréditées',
    'courses.enroll': "S'inscrire",
    'courses.details': 'Détails de la formation',
    'courses.duration': 'Durée',
    'courses.certificate': 'Certificat accrédité',
    
    // Course Names
    'course.nursing': 'Soins Infirmiers',
    'course.nursing.desc': 'Apprenez les bases des soins infirmiers et des premiers secours',
    'course.pharmacy': 'Assistant Pharmacien',
    'course.pharmacy.desc': 'Gestion des médicaments et service client en pharmacie',
    'course.laboratory': 'Technicien de Laboratoire',
    'course.laboratory.desc': 'Analyse des échantillons médicaux et tests de laboratoire',
    'course.radiology': 'Technicien en Radiologie',
    'course.radiology.desc': 'Imagerie médicale et radiologie diagnostique',
    'course.physiotherapy': 'Kinésithérapie',
    'course.physiotherapy.desc': 'Réhabilitation et thérapie physique',
    'course.emergency': 'Premiers Secours',
    'course.emergency.desc': 'Intervention rapide et sauvetage',
    'course.elderly': 'Soins aux Personnes Âgées',
    'course.elderly.desc': 'Soins spécialisés pour les seniors',
    'course.pediatric': 'Puériculture',
    'course.pediatric.desc': 'Soins infirmiers et soins aux enfants',
    'course.dental': 'Assistant Dentaire',
    'course.dental.desc': 'Assistance dans les cabinets dentaires',
    'course.nutrition': 'Nutrition Thérapeutique',
    'course.nutrition.desc': 'Planification alimentaire et régimes sains',
    
    // Pricing
    'pricing.title': 'Nos Tarifs',
    'pricing.single': 'Une Formation',
    'pricing.double': 'Deux Formations',
    'pricing.single.price': '4,900 DZD',
    'pricing.double.price': '9,800 DZD',
    'pricing.single.features': 'Un certificat accrédité',
    'pricing.double.features': 'Formation gratuite + 3 certificats accrédités + Livraison gratuite',
    'pricing.delivery': 'Livraison',
    'pricing.delivery.paid': 'Payante',
    'pricing.delivery.free': 'Gratuite',
    
    // Form
    'form.title': "Inscription à la Formation",
    'form.firstname': 'Prénom',
    'form.lastname': 'Nom',
    'form.birthdate': 'Date de naissance',
    'form.birthplace': 'Lieu de naissance',
    'form.address': 'Adresse personnelle',
    'form.phone': 'Téléphone',
    'form.email': 'Email',
    'form.payment': 'Mode de paiement',
    'form.payment.cash': 'Paiement à la livraison',
    'form.payment.card': 'Carte Edahabia Algérienne',
    'form.submit': "Confirmer l'inscription",
    'form.success': 'Inscription réussie!',
    'form.course.select': 'Choisir la formation',
    'form.package': 'Choisir le forfait',
    
    // Footer
    'footer.rights': 'Tous droits réservés',
    'footer.address': 'Algérie',
    
    // General
    'general.learnMore': 'En savoir plus',
    'general.months': 'mois',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.courses': 'Courses',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'IZ Paramedical Training Institute',
    'hero.subtitle': 'Get an accredited certificate in the paramedical field',
    'hero.cta': 'Explore Courses',
    
    // Courses
    'courses.title': 'Our Training Programs',
    'courses.subtitle': 'Choose from a variety of accredited courses',
    'courses.enroll': 'Enroll Now',
    'courses.details': 'Course Details',
    'courses.duration': 'Duration',
    'courses.certificate': 'Accredited Certificate',
    
    // Course Names
    'course.nursing': 'General Nursing',
    'course.nursing.desc': 'Learn nursing care basics and first aid',
    'course.pharmacy': 'Pharmacy Assistant',
    'course.pharmacy.desc': 'Medication management and pharmacy customer service',
    'course.laboratory': 'Laboratory Technician',
    'course.laboratory.desc': 'Medical sample analysis and laboratory testing',
    'course.radiology': 'Radiology Technician',
    'course.radiology.desc': 'Medical imaging and diagnostic radiology',
    'course.physiotherapy': 'Physiotherapy',
    'course.physiotherapy.desc': 'Rehabilitation and physical therapy',
    'course.emergency': 'First Aid',
    'course.emergency.desc': 'Rapid intervention and life-saving',
    'course.elderly': 'Elderly Care',
    'course.elderly.desc': 'Specialized care for seniors',
    'course.pediatric': 'Pediatric Care',
    'course.pediatric.desc': 'Nursing and childcare',
    'course.dental': 'Dental Assistant',
    'course.dental.desc': 'Assistance in dental clinics',
    'course.nutrition': 'Therapeutic Nutrition',
    'course.nutrition.desc': 'Dietary planning and healthy diets',
    
    // Pricing
    'pricing.title': 'Our Pricing',
    'pricing.single': 'One Course',
    'pricing.double': 'Two Courses',
    'pricing.single.price': '4,900 DZD',
    'pricing.double.price': '9,800 DZD',
    'pricing.single.features': 'One accredited certificate',
    'pricing.double.features': 'Free course + 3 accredited certificates + Free delivery',
    'pricing.delivery': 'Delivery',
    'pricing.delivery.paid': 'Paid',
    'pricing.delivery.free': 'Free',
    
    // Form
    'form.title': 'Course Registration',
    'form.firstname': 'First Name',
    'form.lastname': 'Last Name',
    'form.birthdate': 'Date of Birth',
    'form.birthplace': 'Place of Birth',
    'form.address': 'Personal Address',
    'form.phone': 'Phone Number',
    'form.email': 'Email',
    'form.payment': 'Payment Method',
    'form.payment.cash': 'Cash on Delivery',
    'form.payment.card': 'Algerian Gold Card',
    'form.submit': 'Confirm Registration',
    'form.success': 'Registration successful!',
    'form.course.select': 'Select Course',
    'form.package': 'Select Package',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.address': 'Algeria',
    
    // General
    'general.learnMore': 'Learn More',
    'general.months': 'months',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && ['ar', 'fr', 'en'].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
