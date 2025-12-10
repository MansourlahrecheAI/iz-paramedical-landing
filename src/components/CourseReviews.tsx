import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface Review {
  id: string;
  course_slug: string;
  reviewer_name: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

interface CourseReviewsProps {
  courseSlug: string;
}

const CourseReviews = ({ courseSlug }: CourseReviewsProps) => {
  const { t, language } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('course_reviews')
      .select('*')
      .eq('course_slug', courseSlug)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setReviews(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();

    // Real-time subscription
    const channel = supabase
      .channel('reviews-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'course_reviews',
          filter: `course_slug=eq.${courseSlug}`
        },
        (payload) => {
          setReviews((prev) => [payload.new as Review, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [courseSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error(t('reviews.nameRequired'));
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from('course_reviews').insert({
      course_slug: courseSlug,
      reviewer_name: name.trim(),
      rating,
      comment: comment.trim() || null,
    });

    if (error) {
      toast.error(t('reviews.error'));
    } else {
      toast.success(t('reviews.success'));
      setName('');
      setRating(5);
      setComment('');
    }
    setSubmitting(false);
  };

  const averageRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  const StarRating = ({ value, onChange, readonly = false }: { value: number; onChange?: (v: number) => void; readonly?: boolean }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${star <= value ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'} ${!readonly ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          onClick={() => !readonly && onChange?.(star)}
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Average Rating */}
      <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
        <div className="text-4xl font-bold text-primary">{averageRating}</div>
        <div>
          <StarRating value={Math.round(Number(averageRating))} readonly />
          <p className="text-sm text-muted-foreground mt-1">
            {reviews.length} {t('reviews.count')}
          </p>
        </div>
      </div>

      {/* Add Review Form */}
      <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-card rounded-lg border border-border">
        <h4 className="font-semibold text-foreground">{t('reviews.addReview')}</h4>
        
        <div>
          <label className="text-sm text-muted-foreground">{t('reviews.yourName')}</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('reviews.namePlaceholder')}
            className="mt-1"
          />
        </div>

        <div>
          <label className="text-sm text-muted-foreground">{t('reviews.yourRating')}</label>
          <div className="mt-1">
            <StarRating value={rating} onChange={setRating} />
          </div>
        </div>

        <div>
          <label className="text-sm text-muted-foreground">{t('reviews.yourComment')}</label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t('reviews.commentPlaceholder')}
            className="mt-1"
            rows={3}
          />
        </div>

        <Button type="submit" disabled={submitting}>
          {submitting ? t('reviews.submitting') : t('reviews.submit')}
        </Button>
      </form>

      {/* Reviews List */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-muted-foreground">{t('reviews.loading')}</p>
        ) : reviews.length === 0 ? (
          <p className="text-muted-foreground">{t('reviews.noReviews')}</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="p-4 bg-card rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">{review.reviewer_name}</span>
                <StarRating value={review.rating} readonly />
              </div>
              {review.comment && (
                <p className="text-muted-foreground text-sm">{review.comment}</p>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(review.created_at).toLocaleDateString(language === 'ar' ? 'ar-DZ' : language === 'fr' ? 'fr-DZ' : 'en-US')}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseReviews;