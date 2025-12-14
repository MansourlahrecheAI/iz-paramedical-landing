import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Search, RefreshCw, Package } from 'lucide-react';
import { courses } from '@/data/courses';
import { format } from 'date-fns';

interface Registration {
  id: string;
  first_name: string;
  surname: string;
  date_of_birth: string;
  place_of_birth: string;
  address: string;
  phone: string;
  wilaya: string;
  course_slug: string;
  package_type: string;
  payment_method: string;
  total_price: number;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  confirmed: 'bg-green-500/10 text-green-600 border-green-500/20',
  shipped: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  delivered: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  cancelled: 'bg-red-500/10 text-red-600 border-red-500/20'
};

const RegistrationsList = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('course_registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (err) {
      console.error('Error fetching registrations:', err);
      toast({
        title: "Error",
        description: "Failed to fetch registrations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('course_registrations')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setRegistrations(prev => 
        prev.map(r => r.id === id ? { ...r, status: newStatus } : r)
      );

      toast({
        title: "Status Updated",
        description: `Order status changed to ${newStatus}`
      });
    } catch (err) {
      console.error('Error updating status:', err);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive"
      });
    }
  };

  const getCourseTitle = (slug: string) => {
    const course = courses.find(c => c.slug === slug);
    return course?.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || slug;
  };

  const getPackageLabel = (type: string) => {
    switch (type) {
      case 'single': return '1 Cert';
      case 'double': return '2 Certs';
      case 'triple': return '3 Certs';
      default: return type;
    }
  };

  const filteredRegistrations = registrations.filter(r => {
    const matchesSearch = 
      r.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm) ||
      r.wilaya.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex items-center justify-center">
            <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Course Registrations
            </CardTitle>
            <CardDescription>{registrations.length} total registrations</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={fetchRegistrations}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, phone, or wilaya..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {filteredRegistrations.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            {registrations.length === 0 
              ? "No registrations yet" 
              : "No registrations match your filters"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Wilaya</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegistrations.map((reg) => (
                  <TableRow key={reg.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{reg.first_name} {reg.surname}</p>
                        <p className="text-xs text-muted-foreground">{reg.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      {getCourseTitle(reg.course_slug)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{getPackageLabel(reg.package_type)}</Badge>
                    </TableCell>
                    <TableCell>{reg.wilaya}</TableCell>
                    <TableCell className="font-medium">
                      {reg.total_price.toLocaleString()} DZD
                    </TableCell>
                    <TableCell>
                      <Badge variant={reg.payment_method === 'cod' ? 'secondary' : 'default'}>
                        {reg.payment_method === 'cod' ? 'COD' : 'Card'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[reg.status]}>
                        {reg.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(reg.created_at), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={reg.status} 
                        onValueChange={(value) => updateStatus(reg.id, value)}
                      >
                        <SelectTrigger className="w-28 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RegistrationsList;
