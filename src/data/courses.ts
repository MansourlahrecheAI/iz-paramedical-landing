import { Stethoscope, Pill, FlaskConical, ScanLine, Activity, HeartPulse, UserRound, Baby, SmilePlus, Apple } from 'lucide-react';

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
    slug: 'nursing',
    nameKey: 'course.nursing',
    descKey: 'course.nursing.desc',
    icon: Stethoscope,
    duration: 6,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: '2',
    slug: 'pharmacy',
    nameKey: 'course.pharmacy',
    descKey: 'course.pharmacy.desc',
    icon: Pill,
    duration: 4,
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&q=80',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: '3',
    slug: 'laboratory',
    nameKey: 'course.laboratory',
    descKey: 'course.laboratory.desc',
    icon: FlaskConical,
    duration: 5,
    image: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800&q=80',
    color: 'from-violet-500 to-purple-500',
  },
  {
    id: '4',
    slug: 'radiology',
    nameKey: 'course.radiology',
    descKey: 'course.radiology.desc',
    icon: ScanLine,
    duration: 6,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80',
    color: 'from-slate-500 to-gray-600',
  },
  {
    id: '5',
    slug: 'physiotherapy',
    nameKey: 'course.physiotherapy',
    descKey: 'course.physiotherapy.desc',
    icon: Activity,
    duration: 6,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: '6',
    slug: 'emergency',
    nameKey: 'course.emergency',
    descKey: 'course.emergency.desc',
    icon: HeartPulse,
    duration: 3,
    image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=800&q=80',
    color: 'from-red-500 to-rose-500',
  },
  {
    id: '7',
    slug: 'elderly',
    nameKey: 'course.elderly',
    descKey: 'course.elderly.desc',
    icon: UserRound,
    duration: 4,
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80',
    color: 'from-pink-500 to-fuchsia-500',
  },
  {
    id: '8',
    slug: 'pediatric',
    nameKey: 'course.pediatric',
    descKey: 'course.pediatric.desc',
    icon: Baby,
    duration: 5,
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80',
    color: 'from-sky-500 to-blue-500',
  },
  {
    id: '9',
    slug: 'dental',
    nameKey: 'course.dental',
    descKey: 'course.dental.desc',
    icon: SmilePlus,
    duration: 4,
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80',
    color: 'from-cyan-500 to-teal-500',
  },
  {
    id: '10',
    slug: 'nutrition',
    nameKey: 'course.nutrition',
    descKey: 'course.nutrition.desc',
    icon: Apple,
    duration: 4,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
    color: 'from-lime-500 to-green-500',
  },
];

export const getCourseBySlug = (slug: string): Course | undefined => {
  return courses.find(course => course.slug === slug);
};
