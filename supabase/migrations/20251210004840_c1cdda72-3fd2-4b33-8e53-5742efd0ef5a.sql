-- Create course reviews table with ratings
CREATE TABLE public.course_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_slug TEXT NOT NULL,
  reviewer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.course_reviews ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view reviews (public)
CREATE POLICY "Anyone can view reviews" 
ON public.course_reviews 
FOR SELECT 
USING (true);

-- Allow anyone to insert reviews (public feature)
CREATE POLICY "Anyone can add reviews" 
ON public.course_reviews 
FOR INSERT 
WITH CHECK (true);

-- Enable realtime for reviews
ALTER PUBLICATION supabase_realtime ADD TABLE public.course_reviews;