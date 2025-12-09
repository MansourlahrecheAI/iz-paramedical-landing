import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, CreditCard, Banknote, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Course, courses } from '@/data/courses';
import { wilayas, getShippingPrice } from '@/data/wilayaShipping';

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  birthDate: z.string().min(1),
  birthPlace: z.string().min(2).max(100),
  address: z.string().min(5).max(200),
  wilaya: z.string().min(1),
  phone: z.string().min(9).max(15),
  email: z.string().email().optional().or(z.literal('')),
  paymentMethod: z.enum(['cash', 'card']),
  package: z.enum(['single', 'double']),
  selectedCourses: z.array(z.string()).min(1).max(3),
});

type FormData = z.infer<typeof formSchema>;

interface RegistrationFormProps {
  preselectedCourse?: Course;
}

const RegistrationForm = ({ preselectedCourse }: RegistrationFormProps) => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<'single' | 'double'>('single');
  const [selectedWilaya, setSelectedWilaya] = useState<string>('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>(
    preselectedCourse ? [preselectedCourse.id] : []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      package: 'single',
      paymentMethod: 'cash',
      selectedCourses: preselectedCourse ? [preselectedCourse.id] : [],
      wilaya: '',
    },
  });

  const shippingPrice = useMemo(() => {
    if (selectedPackage === 'double') return 0; // Free shipping for double package
    return getShippingPrice(selectedWilaya);
  }, [selectedWilaya, selectedPackage]);

  const coursePrice = selectedPackage === 'single' ? 4900 : 9800;
  const totalPrice = coursePrice + shippingPrice;

  const handleCourseToggle = (courseId: string) => {
    const maxCourses = selectedPackage === 'single' ? 1 : 3;
    let newSelection: string[];

    if (selectedCourses.includes(courseId)) {
      newSelection = selectedCourses.filter(id => id !== courseId);
    } else if (selectedCourses.length < maxCourses) {
      newSelection = [...selectedCourses, courseId];
    } else {
      return;
    }

    setSelectedCourses(newSelection);
    setValue('selectedCourses', newSelection);
  };

  const handlePackageChange = (value: 'single' | 'double') => {
    setSelectedPackage(value);
    setValue('package', value);
    if (value === 'single' && selectedCourses.length > 1) {
      const newSelection = [selectedCourses[0]];
      setSelectedCourses(newSelection);
      setValue('selectedCourses', newSelection);
    }
  };

  const handleWilayaChange = (value: string) => {
    setSelectedWilaya(value);
    setValue('wilaya', value);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: t('form.success'),
      description: `${data.firstName} ${data.lastName}`,
    });

    reset();
    setSelectedCourses(preselectedCourse ? [preselectedCourse.id] : []);
    setSelectedWilaya('');
    setIsSubmitting(false);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString() + ' DZD';
  };

  const noDeliveryAvailable = selectedWilaya && shippingPrice === 0 && selectedPackage === 'single';

  return (
    <Card className="gradient-card shadow-card border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-gradient">
          {t('form.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Package Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">{t('form.package')}</Label>
            <RadioGroup
              value={selectedPackage}
              onValueChange={(value) => handlePackageChange(value as 'single' | 'double')}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <Label
                htmlFor="single"
                className={`flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedPackage === 'single'
                    ? 'border-primary bg-primary/5 shadow-soft'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="single" id="single" />
                  <span className="font-semibold">{t('pricing.single')}</span>
                </div>
                <p className="text-2xl font-bold text-primary mt-2">{t('pricing.single.price')}</p>
                <p className="text-sm text-muted-foreground mt-1">{t('pricing.single.features')}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t('pricing.delivery')}: {t('pricing.delivery.paid')}
                </p>
              </Label>
              
              <Label
                htmlFor="double"
                className={`flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all relative overflow-hidden ${
                  selectedPackage === 'double'
                    ? 'border-accent bg-accent/5 shadow-soft'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                  BEST VALUE
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="double" id="double" />
                  <span className="font-semibold">{t('pricing.double')}</span>
                </div>
                <p className="text-2xl font-bold text-accent mt-2">{t('pricing.double.price')}</p>
                <p className="text-sm text-muted-foreground mt-1">{t('pricing.double.features')}</p>
                <p className="text-xs text-success font-medium mt-1">
                  {t('pricing.delivery')}: {t('pricing.delivery.free')} ✓
                </p>
              </Label>
            </RadioGroup>
          </div>

          {/* Course Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              {t('form.course.select')} ({selectedCourses.length}/{selectedPackage === 'single' ? 1 : 3})
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {courses.map((course) => {
                const Icon = course.icon;
                const isSelected = selectedCourses.includes(course.id);
                const isDisabled = !isSelected && selectedCourses.length >= (selectedPackage === 'single' ? 1 : 3);
                
                return (
                  <button
                    key={course.id}
                    type="button"
                    onClick={() => handleCourseToggle(course.id)}
                    disabled={isDisabled}
                    className={`p-3 rounded-lg border-2 flex flex-col items-center gap-2 transition-all text-center ${
                      isSelected
                        ? 'border-primary bg-primary/10 shadow-soft'
                        : isDisabled
                        ? 'border-border opacity-50 cursor-not-allowed'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className={`p-2 rounded-full ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-medium line-clamp-2">{t(course.nameKey)}</span>
                    {isSelected && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </button>
                );
              })}
            </div>
            {errors.selectedCourses && (
              <p className="text-sm text-destructive">{t('form.course.select')}</p>
            )}
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t('form.firstname')}</Label>
              <Input
                id="firstName"
                {...register('firstName')}
                className={errors.firstName ? 'border-destructive' : ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">{t('form.lastname')}</Label>
              <Input
                id="lastName"
                {...register('lastName')}
                className={errors.lastName ? 'border-destructive' : ''}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birthDate">{t('form.birthdate')}</Label>
              <Input
                id="birthDate"
                type="date"
                {...register('birthDate')}
                className={errors.birthDate ? 'border-destructive' : ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthPlace">{t('form.birthplace')}</Label>
              <Input
                id="birthPlace"
                {...register('birthPlace')}
                className={errors.birthPlace ? 'border-destructive' : ''}
              />
            </div>
          </div>

          {/* Wilaya Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {t('form.wilaya')}
            </Label>
            <Select value={selectedWilaya} onValueChange={handleWilayaChange}>
              <SelectTrigger className={errors.wilaya ? 'border-destructive' : ''}>
                <SelectValue placeholder={t('form.wilaya.select')} />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {wilayas.map((wilaya) => (
                  <SelectItem key={wilaya.name} value={wilaya.name}>
                    {language === 'ar' ? wilaya.nameAr : wilaya.name}
                    {selectedPackage === 'single' && wilaya.shippingPrice > 0 && (
                      <span className="text-muted-foreground ms-2">
                        ({wilaya.shippingPrice.toLocaleString()} DZD)
                      </span>
                    )}
                    {selectedPackage === 'single' && wilaya.shippingPrice === 0 && (
                      <span className="text-destructive ms-2">
                        ({t('form.nodelivery')})
                      </span>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {noDeliveryAvailable && (
              <p className="text-sm text-destructive">{t('form.nodelivery')}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">{t('form.address')}</Label>
            <Input
              id="address"
              {...register('address')}
              className={errors.address ? 'border-destructive' : ''}
              placeholder={t('form.delivery.home')}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">{t('form.phone')}</Label>
              <Input
                id="phone"
                type="tel"
                dir="ltr"
                {...register('phone')}
                className={errors.phone ? 'border-destructive' : ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('form.email')}</Label>
              <Input
                id="email"
                type="email"
                dir="ltr"
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">{t('form.payment')}</Label>
            <RadioGroup
              defaultValue="cash"
              onValueChange={(value) => setValue('paymentMethod', value as 'cash' | 'card')}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <Label
                htmlFor="cash"
                className="flex items-center gap-3 p-4 rounded-xl border-2 border-border cursor-pointer hover:border-primary/50 transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5"
              >
                <RadioGroupItem value="cash" id="cash" />
                <Banknote className="h-5 w-5 text-success" />
                <span className="font-medium">{t('form.payment.cash')}</span>
              </Label>
              <Label
                htmlFor="card"
                className="flex items-center gap-3 p-4 rounded-xl border-2 border-border cursor-pointer hover:border-primary/50 transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5"
              >
                <RadioGroupItem value="card" id="card" />
                <CreditCard className="h-5 w-5 text-primary" />
                <span className="font-medium">{t('form.payment.card')}</span>
              </Label>
            </RadioGroup>
          </div>

          {/* Total & Submit */}
          <div className="pt-4 border-t border-border space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t('pricing.title')}:</span>
              <span className="font-medium">{formatPrice(coursePrice)}</span>
            </div>
            {selectedPackage === 'single' && selectedWilaya && shippingPrice > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t('pricing.shipping')}:</span>
                <span className="font-medium">{formatPrice(shippingPrice)}</span>
              </div>
            )}
            {selectedPackage === 'double' && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t('pricing.shipping')}:</span>
                <span className="font-medium text-success">{t('pricing.delivery.free')} ✓</span>
              </div>
            )}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-lg font-semibold">{t('pricing.total')}:</span>
              <span className="text-2xl font-bold text-gradient">{formatPrice(totalPrice)}</span>
            </div>
            <Button
              type="submit"
              variant="hero"
              size="xl"
              className="w-full"
              disabled={isSubmitting || selectedCourses.length === 0 || noDeliveryAvailable}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ...
                </span>
              ) : (
                t('form.submit')
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;
