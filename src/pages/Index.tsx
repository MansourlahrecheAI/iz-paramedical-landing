import { Link } from 'react-router-dom';
import { ArrowDown, Award, Users, BookOpen, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { courses } from '@/data/courses';
import CourseCard from '@/components/CourseCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: Users, value: '5000+', label: 'Students' },
    { icon: BookOpen, value: '10', label: 'Courses' },
    { icon: Award, value: '100%', label: 'Certified' },
    { icon: Shield, value: '24/7', label: 'Support' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -start-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-1/4 -end-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-fade-in">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t('courses.certificate')}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-up">
              <span className="text-gradient">{t('hero.title')}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <a href="#courses">
                <Button variant="hero" size="xl" className="min-w-[200px]">
                  {t('hero.cta')}
                </Button>
              </a>
            </div>

            {/* Scroll Indicator */}
            <a
              href="#courses"
              className="inline-flex flex-col items-center gap-2 pt-12 text-muted-foreground hover:text-primary transition-colors animate-float"
            >
              <ArrowDown className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="text-center space-y-2 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-primary shadow-soft">
                    <Icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 scroll-mt-20">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient">
              {t('courses.title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('courses.subtitle')}
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA Section */}
      <section className="py-20 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              {t('pricing.title')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Single Course */}
              <div className="bg-card/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20">
                <h3 className="text-xl font-semibold text-primary-foreground mb-2">
                  {t('pricing.single')}
                </h3>
                <p className="text-4xl font-bold text-primary-foreground mb-4">
                  {t('pricing.single.price')}
                </p>
                <p className="text-primary-foreground/80 text-sm">
                  {t('pricing.single.features')}
                </p>
              </div>

              {/* Double Course */}
              <div className="bg-card/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-primary-foreground/40 relative">
                <div className="absolute -top-3 start-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-4 py-1 rounded-full">
                  BEST VALUE
                </div>
                <h3 className="text-xl font-semibold text-primary-foreground mb-2">
                  {t('pricing.double')}
                </h3>
                <p className="text-4xl font-bold text-primary-foreground mb-4">
                  {t('pricing.double.price')}
                </p>
                <p className="text-primary-foreground/80 text-sm">
                  {t('pricing.double.features')}
                </p>
              </div>
            </div>

            <Link to={`/course/${courses[0].slug}`}>
              <Button 
                size="xl" 
                className="bg-card text-foreground hover:bg-card/90 shadow-card"
              >
                {t('courses.enroll')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
