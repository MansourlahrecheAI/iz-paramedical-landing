import { useState, useEffect } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

interface CourseRatingPreviewProps {
  courseSlug: string;
}

const CourseRatingPreview = ({ courseSlug }: CourseRatingPreviewProps) => {
  const { t } = useLanguage();
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatingSummary = async () => {
      const { data, error } = await supabase
        .from('course_reviews')
        .select('rating')
        .eq('course_slug', courseSlug);

      if (!error && data) {
        setReviewCount(data.length);
        if (data.length > 0) {
          const avg = data.reduce((acc, r) => acc + r.rating, 0) / data.length;
          setAverageRating(avg);
        }
      }
      setLoading(false);
    };

    fetchRatingSummary();
  }, [courseSlug]);

  if (loading) {
    return (
      <div className="animate-pulse flex items-center gap-2">
        <div className="h-5 w-20 bg-muted rounded" />
      </div>
    );
  }

  return (
    <Link 
      to={`/course/${courseSlug}/reviews`}
      className="flex items-center gap-3 px-4 py-2 rounded-full bg-card border border-border hover:border-primary/50 transition-colors group"
    >
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-foreground">
        {averageRating > 0 ? averageRating.toFixed(1) : '-'}
      </span>
      <span className="text-sm text-muted-foreground">
        ({reviewCount} {t('reviews.count')})
      </span>
      <MessageSquare className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
    </Link>
  );
};

export default CourseRatingPreview;
