import { HeartPulse, FlaskConical, Ambulance, Smile, FileText, UserRound, Stethoscope, SmilePlus, Activity, Pill } from 'lucide-react';

export interface Course {
  id: string;
  slug: string;
  nameKey: string;
  descKey: string;
  icon: React.ComponentType<{ className?: string }>;
  duration: number;
  image: string;
  color: string;
}

export const courses: Course[] = [
  {
    id: '1',
    slug: 'first-aid',
    nameKey: 'course.firstaid',
    descKey: 'course.firstaid.desc',
    icon: HeartPulse,
    duration: 1,
    image: '../src/data/First Aid.jpg',
    color: 'from-red-500 to-rose-500',
  },
  {
    id: '2',
    slug: 'laboratory-assistant',
    nameKey: 'course.laboratory',
    descKey: 'course.laboratory.desc',
    icon: FlaskConical,
    duration: 1,
    image: '../src/data/Laboratory assistant.jpg',
    color: 'from-violet-500 to-purple-500',
  },
  {
    id: '3',
    slug: 'ambulance-driver',
    nameKey: 'course.ambulance',
    descKey: 'course.ambulance.desc',
    icon: Ambulance,
    duration: 1,
    image: '../src/data/Ambulance Driver.jpg',
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: '4',
    slug: 'dental-restorer',
    nameKey: 'course.dentalrestorer',
    descKey: 'course.dentalrestorer.desc',
    icon: Smile,
    duration: 1,
    image: '../src/data/Dental Restorer.jpg',
    color: 'from-cyan-500 to-teal-500',
  },
  {
    id: '5',
    slug: 'medical-secretary',
    nameKey: 'course.medicalsecretary',
    descKey: 'course.medicalsecretary.desc',
    icon: FileText,
    duration: 1,
    image: '../src/data/Medical Secretary.jpg',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: '6',
    slug: 'elderly-care',
    nameKey: 'course.elderly',
    descKey: 'course.elderly.desc',
    icon: UserRound,
    duration: 1,
    image: '../src/data/Elderly Care.jpg',
    color: 'from-pink-500 to-fuchsia-500',
  },
  {
    id: '7',
    slug: 'nurse-assistant',
    nameKey: 'course.nurseassistant',
    descKey: 'course.nurseassistant.desc',
    icon: Stethoscope,
    duration: 1,
    image: '../src/data/Nurse Assistant.jpg',
    color: 'from-emerald-500 to-green-500',
  },
  {
    id: '8',
    slug: 'dental-assistant',
    nameKey: 'course.dentalassistant',
    descKey: 'course.dentalassistant.desc',
    icon: SmilePlus,
    duration: 1,
    image: '../src/data/Dental Assistant.jpg',
    color: 'from-sky-500 to-blue-500',
  },
  {
    id: '9',
    slug: 'medical-assistant',
    nameKey: 'course.medicalassistant',
    descKey: 'course.medicalassistant.desc',
    icon: Activity,
    duration: 1,
    image: '../src/data/Medical Assistant.jpg',
    color: 'from-slate-500 to-gray-600',
  },
  {
    id: '10',
    slug: 'pharmacist-salesman',
    nameKey: 'course.pharmacist',
    descKey: 'course.pharmacist.desc',
    icon: Pill,
    duration: 1,
    image: '../src/data/Pharmacist Salesman.jpg',
    color: 'from-lime-500 to-green-500',
  },
  {
    id: '11',
    slug: 'nutritionist',
    nameKey: 'course.nutritionist',
    descKey: 'course.nutritionist.desc',
    icon: Activity,
    duration: 1,
    image: '../src/data/Nutrionist Assistant.jpg',
    color: 'from-green-500 to-emerald-500',
  },
];

export const getCourseBySlug = (slug: string): Course | undefined => {
  return courses.find(course => course.slug === slug);
};
