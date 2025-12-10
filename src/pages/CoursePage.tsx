import { useParams, Navigate, Link } from 'react-router-dom';
import { Clock, Award, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCourseBySlug } from '@/data/courses';
import RegistrationForm from '@/components/RegistrationForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseRatingPreview from '@/components/CourseRatingPreview';

const CoursePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, dir } = useLanguage();
  
  const course = slug ? getCourseBySlug(slug) : undefined;
  
  if (!course) {
    return <Navigate to="/" replace />;
  }

  const Icon = course.icon;

  const features = [
    t('courses.certificate'),
    t('courses.duration') + ': ' + course.duration + ' ' + t('general.months'),
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        {/* Background Image */}
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
          <Link to="/">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className={`h-4 w-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              {t('nav.home')}
            </Button>
          </Link>

          <div className="max-w-4xl space-y-6">
            {/* Icon Badge */}
            <div className={`inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br ${course.color} shadow-glow`}>
              <Icon className="h-10 w-10 text-white" />
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="text-gradient">{t(course.nameKey)}</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t(course.descKey)}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  {course.duration} {t('general.months')}
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                <Award className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">{t('courses.certificate')}</span>
              </div>
              <CourseRatingPreview courseSlug={course.slug} />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 flex-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Course Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">{t('courses.details')}</h2>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Cards */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold">{t('pricing.title')}</h3>
                <div className="grid gap-4">
                  <div className="p-5 rounded-xl border border-border bg-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{t('pricing.single')}</h4>
                        <p className="text-sm text-muted-foreground">{t('pricing.single.features')}</p>
                      </div>
                      <p className="text-2xl font-bold text-primary">{t('pricing.single.price')}</p>
                    </div>
                  </div>
                  <div className="p-5 rounded-xl border-2 border-accent bg-accent/5 relative">
                    <div className="absolute -top-3 start-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                      BEST VALUE
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{t('pricing.double')}</h4>
                        <p className="text-sm text-muted-foreground">{t('pricing.double.features')}</p>
                      </div>
                      <p className="text-2xl font-bold text-accent">{t('pricing.double.price')}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Registration Form */}
            <div>
              <RegistrationForm preselectedCourse={course} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CoursePage;
