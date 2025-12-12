import { Link } from 'react-router-dom';
import { Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Course } from '@/data/courses';

interface CourseCardProps {
  course: Course;
  index: number;
}

const CourseCard = ({ course, index }: CourseCardProps) => {
  const { t } = useLanguage();
  const Icon = course.icon;

  return (
    <Card 
      className="group overflow-hidden border-border/50 gradient-card hover:shadow-card transition-all duration-500 animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={t(course.nameKey)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${course.color} opacity-60`} />
        <div className="absolute top-4 right-4 p-3 rounded-full bg-card/90 backdrop-blur-sm shadow-soft">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-5 space-y-3">
        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
          {t(course.nameKey)}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {t(course.descKey)}
        </p>
        
        {/* Meta */}
        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>{course.duration} {t('general.months')}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Award className="h-4 w-4 text-accent" />
            <span>{t('courses.certificate')}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-accent" />
            <span>{t('courses.internship')}</span>
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-5 pt-0">
        <Link to={`/course/${course.slug}`} className="w-full">
          <Button variant="gradient" className="w-full">
            {t('courses.enroll')}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
