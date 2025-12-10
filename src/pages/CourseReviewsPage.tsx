import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCourseBySlug } from '@/data/courses';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseReviews from '@/components/CourseReviews';

const CourseReviewsPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, dir } = useLanguage();
  
  const course = slug ? getCourseBySlug(slug) : undefined;
  
  if (!course) {
    return <Navigate to="/" replace />;
  }

  const Icon = course.icon;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={course.image}
            alt={t(course.nameKey)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Back Button */}
          <Link to={`/course/${course.slug}`}>
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className={`h-4 w-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              {t('nav.back')}
            </Button>
          </Link>

          <div className="max-w-4xl space-y-4">
            <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br ${course.color} shadow-glow`}>
              <Icon className="h-8 w-8 text-white" />
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              <span className="text-gradient">{t(course.nameKey)}</span>
              <span className="text-muted-foreground"> - {t('reviews.title')}</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Reviews Content */}
      <section className="py-12 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <CourseReviews courseSlug={course.slug} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CourseReviewsPage;
