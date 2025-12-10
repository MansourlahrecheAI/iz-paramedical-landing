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
    'course.firstaid': 'دورة الإسعافات الأولية',
    'course.firstaid.desc': 'تعلم تقنيات الإسعافات الأولية وإنقاذ الحياة',
    'course.laboratory': 'مساعد مخبر',
    'course.laboratory.desc': 'تحليل العينات الطبية والفحوصات المخبرية',
    'course.ambulance': 'سائق سيارة إسعاف',
    'course.ambulance.desc': 'قيادة سيارة الإسعاف والتدخل السريع',
    'course.dentalrestorer': 'مساعد ترميم الأسنان',
    'course.dentalrestorer.desc': 'المساعدة في ترميم وتجميل الأسنان',
    'course.medicalsecretary': 'السكرتارية الطبية',
    'course.medicalsecretary.desc': 'إدارة الملفات الطبية والمواعيد',
    'course.elderly': 'رعاية المسنين',
    'course.elderly.desc': 'العناية الخاصة بكبار السن',
    'course.nurseassistant': 'مساعد ممرض',
    'course.nurseassistant.desc': 'المساعدة في الرعاية التمريضية',
    'course.dentalassistant': 'مساعد طبيب أسنان',
    'course.dentalassistant.desc': 'المساعدة في عيادات طب الأسنان',
    'course.medicalassistant': 'مساعد طبي',
    'course.medicalassistant.desc': 'المساعدة في العيادات والمستشفيات',
    'course.pharmacist': 'بائع صيدلي',
    'course.pharmacist.desc': 'بيع الأدوية وخدمة العملاء في الصيدليات',
    
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
    'pricing.shipping': 'تكلفة التوصيل',
    'pricing.total': 'المجموع الكلي',
    
    // Form
    'form.title': 'التسجيل في الدورة',
    'form.firstname': 'الاسم',
    'form.lastname': 'اللقب',
    'form.birthdate': 'تاريخ الميلاد',
    'form.birthplace': 'مكان الميلاد',
    'form.address': 'العنوان الشخصي',
    'form.phone': 'رقم الهاتف',
    'form.email': 'البريد الإلكتروني',
    'form.wilaya': 'الولاية',
    'form.wilaya.select': 'اختر الولاية',
    'form.payment': 'طريقة الدفع',
    'form.payment.cash': 'الدفع عند الاستلام',
    'form.payment.card': 'بطاقة الذهب الجزائرية',
    'form.submit': 'تأكيد التسجيل',
    'form.success': 'تم التسجيل بنجاح!',
    'form.course.select': 'اختر الدورة',
    'form.package': 'اختر الباقة',
    'form.delivery.home': 'التوصيل للمنزل',
    'form.nodelivery': 'لا يوجد توصيل لهذه الولاية',
    
    // Footer
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.address': 'باتنة، الجزائر',
    
    // Reviews
    'reviews.title': 'التقييمات والآراء',
    'reviews.count': 'تقييم',
    'reviews.addReview': 'أضف تقييمك',
    'reviews.yourName': 'اسمك',
    'reviews.namePlaceholder': 'أدخل اسمك',
    'reviews.yourRating': 'تقييمك',
    'reviews.yourComment': 'تعليقك',
    'reviews.commentPlaceholder': 'اكتب تعليقك هنا...',
    'reviews.submit': 'إرسال التقييم',
    'reviews.submitting': 'جاري الإرسال...',
    'reviews.success': 'تم إرسال التقييم بنجاح!',
    'reviews.error': 'حدث خطأ أثناء الإرسال',
    'reviews.nameRequired': 'الرجاء إدخال اسمك',
    'reviews.noReviews': 'لا توجد تقييمات بعد',
    'reviews.loading': 'جاري التحميل...',
    
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
    'course.firstaid': 'Formation Premiers Secours',
    'course.firstaid.desc': 'Apprenez les techniques de premiers secours et de sauvetage',
    'course.laboratory': 'Assistant Laboratoire',
    'course.laboratory.desc': 'Analyse des échantillons médicaux et tests de laboratoire',
    'course.ambulance': 'Conducteur Ambulancier',
    'course.ambulance.desc': 'Conduite ambulance et intervention rapide',
    'course.dentalrestorer': 'Assistant Restauration Dentaire',
    'course.dentalrestorer.desc': 'Assistance en restauration et esthétique dentaire',
    'course.medicalsecretary': 'Secrétariat Médical',
    'course.medicalsecretary.desc': 'Gestion des dossiers médicaux et rendez-vous',
    'course.elderly': 'Soins aux Personnes Âgées',
    'course.elderly.desc': 'Soins spécialisés pour les seniors',
    'course.nurseassistant': 'Aide-Soignant',
    'course.nurseassistant.desc': 'Assistance aux soins infirmiers',
    'course.dentalassistant': 'Assistant Dentaire',
    'course.dentalassistant.desc': 'Assistance dans les cabinets dentaires',
    'course.medicalassistant': 'Assistant Médical',
    'course.medicalassistant.desc': 'Assistance dans les cliniques et hôpitaux',
    'course.pharmacist': 'Vendeur en Pharmacie',
    'course.pharmacist.desc': 'Vente de médicaments et service client en pharmacie',
    
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
    'pricing.shipping': 'Frais de livraison',
    'pricing.total': 'Total',
    
    // Form
    'form.title': "Inscription à la Formation",
    'form.firstname': 'Prénom',
    'form.lastname': 'Nom',
    'form.birthdate': 'Date de naissance',
    'form.birthplace': 'Lieu de naissance',
    'form.address': 'Adresse personnelle',
    'form.phone': 'Téléphone',
    'form.email': 'Email',
    'form.wilaya': 'Wilaya',
    'form.wilaya.select': 'Sélectionner la wilaya',
    'form.payment': 'Mode de paiement',
    'form.payment.cash': 'Paiement à la livraison',
    'form.payment.card': 'Carte Edahabia Algérienne',
    'form.submit': "Confirmer l'inscription",
    'form.success': 'Inscription réussie!',
    'form.course.select': 'Choisir la formation',
    'form.package': 'Choisir le forfait',
    'form.delivery.home': 'Livraison à domicile',
    'form.nodelivery': 'Pas de livraison pour cette wilaya',
    
    // Footer
    'footer.rights': 'Tous droits réservés',
    'footer.address': 'Batna, Algérie',
    
    // Reviews
    'reviews.title': 'Avis et Évaluations',
    'reviews.count': 'avis',
    'reviews.addReview': 'Ajouter votre avis',
    'reviews.yourName': 'Votre nom',
    'reviews.namePlaceholder': 'Entrez votre nom',
    'reviews.yourRating': 'Votre note',
    'reviews.yourComment': 'Votre commentaire',
    'reviews.commentPlaceholder': 'Écrivez votre commentaire ici...',
    'reviews.submit': 'Envoyer l\'avis',
    'reviews.submitting': 'Envoi en cours...',
    'reviews.success': 'Avis envoyé avec succès!',
    'reviews.error': 'Erreur lors de l\'envoi',
    'reviews.nameRequired': 'Veuillez entrer votre nom',
    'reviews.noReviews': 'Aucun avis pour le moment',
    'reviews.loading': 'Chargement...',
    
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
    'course.firstaid': 'First Aid Course',
    'course.firstaid.desc': 'Learn first aid techniques and life-saving skills',
    'course.laboratory': 'Laboratory Assistant',
    'course.laboratory.desc': 'Medical sample analysis and laboratory testing',
    'course.ambulance': 'Ambulance Driver',
    'course.ambulance.desc': 'Ambulance driving and rapid intervention',
    'course.dentalrestorer': 'Dental Restorer Assistant',
    'course.dentalrestorer.desc': 'Assistance in dental restoration and aesthetics',
    'course.medicalsecretary': 'Medical Secretary',
    'course.medicalsecretary.desc': 'Medical records and appointment management',
    'course.elderly': 'Elderly Care',
    'course.elderly.desc': 'Specialized care for seniors',
    'course.nurseassistant': 'Nurse Assistant',
    'course.nurseassistant.desc': 'Assistance in nursing care',
    'course.dentalassistant': 'Dental Assistant',
    'course.dentalassistant.desc': 'Assistance in dental clinics',
    'course.medicalassistant': 'Medical Assistant',
    'course.medicalassistant.desc': 'Assistance in clinics and hospitals',
    'course.pharmacist': 'Pharmacist Salesman',
    'course.pharmacist.desc': 'Medication sales and pharmacy customer service',
    
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
    'pricing.shipping': 'Shipping cost',
    'pricing.total': 'Total',
    
    // Form
    'form.title': 'Course Registration',
    'form.firstname': 'First Name',
    'form.lastname': 'Last Name',
    'form.birthdate': 'Date of Birth',
    'form.birthplace': 'Place of Birth',
    'form.address': 'Personal Address',
    'form.phone': 'Phone Number',
    'form.email': 'Email',
    'form.wilaya': 'Wilaya',
    'form.wilaya.select': 'Select wilaya',
    'form.payment': 'Payment Method',
    'form.payment.cash': 'Cash on Delivery',
    'form.payment.card': 'Algerian Gold Card',
    'form.submit': 'Confirm Registration',
    'form.success': 'Registration successful!',
    'form.course.select': 'Select Course',
    'form.package': 'Select Package',
    'form.delivery.home': 'Home Delivery',
    'form.nodelivery': 'No delivery available for this wilaya',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.address': 'Batna, Algeria',
    
    // Reviews
    'reviews.title': 'Reviews & Ratings',
    'reviews.count': 'reviews',
    'reviews.addReview': 'Add Your Review',
    'reviews.yourName': 'Your Name',
    'reviews.namePlaceholder': 'Enter your name',
    'reviews.yourRating': 'Your Rating',
    'reviews.yourComment': 'Your Comment',
    'reviews.commentPlaceholder': 'Write your comment here...',
    'reviews.submit': 'Submit Review',
    'reviews.submitting': 'Submitting...',
    'reviews.success': 'Review submitted successfully!',
    'reviews.error': 'Error submitting review',
    'reviews.nameRequired': 'Please enter your name',
    'reviews.noReviews': 'No reviews yet',
    'reviews.loading': 'Loading...',
    
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
