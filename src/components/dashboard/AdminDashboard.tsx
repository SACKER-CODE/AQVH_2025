import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Calendar, 
  BookOpen, 
  TrendingUp, 
  AlertTriangle,
  Shield,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  Activity
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data for charts
  const usageData = [
    { date: '2024-01-01', bookings: 12, emergencies: 3, resources: 45 },
    { date: '2024-01-02', bookings: 18, emergencies: 5, resources: 67 },
    { date: '2024-01-03', bookings: 15, emergencies: 2, resources: 52 },
    { date: '2024-01-04', bookings: 22, emergencies: 4, resources: 78 },
    { date: '2024-01-05', bookings: 19, emergencies: 6, resources: 89 },
    { date: '2024-01-06', bookings: 25, emergencies: 3, resources: 95 },
    { date: '2024-01-07', bookings: 21, emergencies: 4, resources: 72 }
  ];

  const categoryData = [
    { name: 'Stress', value: 35, color: '#FF6B35' },
    { name: 'Anxiety', value: 28, color: '#4ECDC4' },
    { name: 'Depression', value: 20, color: '#8B5CF6' },
    { name: 'Wellness', value: 17, color: '#10B981' }
  ];

  const departmentData = [
    { department: 'Computer Science', students: 145, bookings: 32 },
    { department: 'Engineering', students: 198, bookings: 45 },
    { department: 'Business', students: 167, bookings: 28 },
    { department: 'Arts & Sciences', students: 123, bookings: 35 },
    { department: 'Medicine', students: 89, bookings: 42 }
  ];

  const recentActivity = [
    { id: 1, type: 'booking', message: 'New emergency booking from Sarah M.', time: '5 min ago', status: 'urgent' },
    { id: 2, type: 'user', message: 'New counsellor registration: Dr. Johnson', time: '15 min ago', status: 'success' },
    { id: 3, type: 'forum', message: 'Post flagged for review in Anxiety Support', time: '23 min ago', status: 'warning' },
    { id: 4, type: 'resource', message: 'New resource uploaded: Mindfulness Guide', time: '1 hour ago', status: 'info' },
    { id: 5, type: 'booking', message: 'Appointment completed with Dr. Chen', time: '2 hours ago', status: 'success' }
  ];

  const pendingActions = [
    { id: 1, type: 'Emergency booking approval', count: 3, priority: 'high' },
    { id: 2, type: 'Counsellor applications', count: 2, priority: 'medium' },
    { id: 3, type: 'Flagged forum posts', count: 5, priority: 'medium' },
    { id: 4, type: 'Resource reviews', count: 1, priority: 'low' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking': return <Calendar className="w-4 h-4" />;
      case 'user': return <Users className="w-4 h-4" />;
      case 'forum': return <MessageSquare className="w-4 h-4" />;
      case 'resource': return <BookOpen className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'bg-emergency text-emergency-foreground';
      case 'success': return 'bg-tertiary text-tertiary-foreground';
      case 'warning': return 'bg-yellow-500 text-white';
      case 'info': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor system activity, manage users, and track mental health support metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-3xl font-bold text-primary">1,247</p>
                <p className="text-sm text-tertiary">+12% from last week</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Bookings</p>
                <p className="text-3xl font-bold text-secondary">89</p>
                <p className="text-sm text-emergency">3 emergency pending</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resource Views</p>
                <p className="text-3xl font-bold text-tertiary">2,456</p>
                <p className="text-sm text-tertiary">+8% from yesterday</p>
              </div>
              <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-tertiary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">System Health</p>
                <p className="text-3xl font-bold text-tertiary">98%</p>
                <p className="text-sm text-muted-foreground">All systems operational</p>
              </div>
              <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-tertiary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Usage Analytics</span>
                <div className="flex space-x-2">
                  <Button 
                    variant={timeRange === '7d' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setTimeRange('7d')}
                  >
                    7D
                  </Button>
                  <Button 
                    variant={timeRange === '30d' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setTimeRange('30d')}
                  >
                    30D
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="bookings" 
                      stackId="1" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="emergencies" 
                      stackId="1" 
                      stroke="hsl(var(--emergency))" 
                      fill="hsl(var(--emergency))" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="resources" 
                      stackId="1" 
                      stroke="hsl(var(--tertiary))" 
                      fill="hsl(var(--tertiary))" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Support Categories</CardTitle>
                <CardDescription>Distribution of student concerns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Engagement</CardTitle>
                <CardDescription>Bookings by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="department" type="category" width={80} />
                      <Tooltip />
                      <Bar dataKey="bookings" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Pending Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-emergency" />
                <span>Pending Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingActions.map((action) => (
                <div key={action.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium text-sm">{action.type}</p>
                    <p className="text-xs text-muted-foreground">{action.count} items</p>
                  </div>
                  <Badge 
                    variant="outline"
                    className={
                      action.priority === 'high' ? 'border-emergency text-emergency' :
                      action.priority === 'medium' ? 'border-yellow-500 text-yellow-600' :
                      'border-muted text-muted-foreground'
                    }
                  >
                    {action.priority}
                  </Badge>
                </div>
              ))}
              <Button className="w-full mt-4" size="sm">
                <Shield className="w-4 h-4 mr-2" />
                Review All
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-primary" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-accent">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(activity.status)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Server Performance</span>
                  <span>98%</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Database Health</span>
                  <span>95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Response Time</span>
                  <span>Fast</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-tertiary" />
                <span className="text-muted-foreground">All services operational</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;