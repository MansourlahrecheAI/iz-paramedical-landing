import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Package, 
  DollarSign, 
  TrendingUp, 
  BookOpen,
  Clock,
  CheckCircle,
  Truck,
  XCircle
} from 'lucide-react';
import { courses } from '@/data/courses';

interface Stats {
  totalRegistrations: number;
  totalRevenue: number;
  pendingOrders: number;
  confirmedOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  courseBreakdown: { course_slug: string; count: number }[];
  packageBreakdown: { package_type: string; count: number }[];
}

const RegistrationStats = () => {
  const [stats, setStats] = useState<Stats>({
    totalRegistrations: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    courseBreakdown: [],
    packageBreakdown: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: registrations, error } = await supabase
        .from('course_registrations')
        .select('*');

      if (error) throw error;

      if (registrations) {
        const totalRevenue = registrations.reduce((sum, r) => sum + r.total_price, 0);
        
        const courseBreakdown = registrations.reduce((acc, r) => {
          const existing = acc.find(item => item.course_slug === r.course_slug);
          if (existing) {
            existing.count++;
          } else {
            acc.push({ course_slug: r.course_slug, count: 1 });
          }
          return acc;
        }, [] as { course_slug: string; count: number }[]);

        const packageBreakdown = registrations.reduce((acc, r) => {
          const existing = acc.find(item => item.package_type === r.package_type);
          if (existing) {
            existing.count++;
          } else {
            acc.push({ package_type: r.package_type, count: 1 });
          }
          return acc;
        }, [] as { package_type: string; count: number }[]);

        setStats({
          totalRegistrations: registrations.length,
          totalRevenue,
          pendingOrders: registrations.filter(r => r.status === 'pending').length,
          confirmedOrders: registrations.filter(r => r.status === 'confirmed').length,
          shippedOrders: registrations.filter(r => r.status === 'shipped').length,
          deliveredOrders: registrations.filter(r => r.status === 'delivered').length,
          cancelledOrders: registrations.filter(r => r.status === 'cancelled').length,
          courseBreakdown: courseBreakdown.sort((a, b) => b.count - a.count),
          packageBreakdown
        });
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCourseTitle = (slug: string) => {
    const course = courses.find(c => c.slug === slug);
    return course?.nameKey.replace('course.', '').replace('.', ' ') || slug;
  };

  const getPackageLabel = (type: string) => {
    switch (type) {
      case 'single': return '1 Certificate';
      case 'double': return '2 Certificates (+1 Free)';
      case 'triple': return '3 Certificates (+1 Free)';
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="h-20 bg-muted/50" />
            <CardContent className="h-16 bg-muted/30" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRegistrations}</div>
            <p className="text-xs text-muted-foreground">All time orders</p>
          </CardContent>
        </Card>

        <Card className="border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.totalRevenue.toLocaleString()} DZD
            </div>
            <p className="text-xs text-muted-foreground">All time earnings</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.deliveredOrders}</div>
            <p className="text-xs text-muted-foreground">Successfully completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Status Breakdown */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-yellow-500/10">
                <Clock className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-xl font-bold">{stats.pendingOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-500/10">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Confirmed</p>
                <p className="text-xl font-bold">{stats.confirmedOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-500/10">
                <Truck className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Shipped</p>
                <p className="text-xl font-bold">{stats.shippedOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-red-500/10">
                <XCircle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cancelled</p>
                <p className="text-xl font-bold">{stats.cancelledOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Breakdown */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Popular Courses
            </CardTitle>
            <CardDescription>Registrations by course</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.courseBreakdown.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No registrations yet</p>
            ) : (
              <div className="space-y-3">
                {stats.courseBreakdown.slice(0, 5).map((item) => (
                  <div key={item.course_slug} className="flex items-center justify-between">
                    <span className="text-sm truncate max-w-[200px]">{getCourseTitle(item.course_slug)}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ 
                            width: `${(item.count / stats.totalRegistrations) * 100}%` 
                          }} 
                        />
                      </div>
                      <span className="text-sm font-medium w-8 text-right">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Package Distribution
            </CardTitle>
            <CardDescription>Registrations by package type</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.packageBreakdown.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No registrations yet</p>
            ) : (
              <div className="space-y-3">
                {stats.packageBreakdown.map((item) => (
                  <div key={item.package_type} className="flex items-center justify-between">
                    <span className="text-sm">{getPackageLabel(item.package_type)}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent rounded-full" 
                          style={{ 
                            width: `${(item.count / stats.totalRegistrations) * 100}%` 
                          }} 
                        />
                      </div>
                      <span className="text-sm font-medium w-8 text-right">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationStats;
