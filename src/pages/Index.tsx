import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import CounsellorDashboard from "@/components/dashboard/CounsellorDashboard";
import BookingForm from "@/components/booking/BookingForm";
import ResourceHub from "@/components/resources/ResourceHub";
import PeerSupportForum from "@/components/forum/PeerSupportForum";
import UserManagement from "@/components/admin/UserManagement";
import BookingManagement from "@/components/admin/BookingManagement";
import ResourceManagement from "@/components/admin/ResourceManagement";
import EmergencyManagement from "@/components/admin/EmergencyManagement";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, UserCheck, Shield, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type UserRole = 'admin' | 'counsellor' | 'student' | 'student_volunteer';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [currentView, setCurrentView] = useState('dashboard');
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    role: 'student' as UserRole
  });
  const navigate = useNavigate();

  // Demo login function
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setUserRole(loginForm.role);
    setIsLoggedIn(true);
    toast({
      title: "Login successful!",
      description: `Welcome to MindCare Dashboard`
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('dashboard');
    setLoginForm({ email: '', password: '', role: 'student' });
  };

  // Demo user data
  const userData = {
    name: userRole === 'admin' ? 'Admin User' : 
          userRole === 'counsellor' ? 'Dr. Sarah Johnson' : 
          'Student User',
    avatar: '/user-avatar.jpg'
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-tertiary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">MindCare</h1>
            <p className="text-muted-foreground">Digital Mental Health Support System</p>
          </div>

          {/* Login Card */}
          <Card>
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>
                Sign in to access your mental health support dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Login as</Label>
                  <Select 
                    value={loginForm.role} 
                    onValueChange={(value: UserRole) => setLoginForm({...loginForm, role: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>Student</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="student_volunteer">
                        <div className="flex items-center space-x-2">
                          <UserCheck className="w-4 h-4" />
                          <span>Student Volunteer</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="counsellor">
                        <div className="flex items-center space-x-2">
                          <Heart className="w-4 h-4" />
                          <span>Counsellor</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="admin">
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4" />
                          <span>Administrator</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Demo credentials: Use any email/password with your preferred role
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        if (userRole === 'admin') return <AdminDashboard />;
        if (userRole === 'counsellor') return <CounsellorDashboard />;
        return <StudentDashboard />;
      case 'booking':
        return <BookingForm />;
      case 'resources':
        return <ResourceHub />;
      case 'forum':
        return <PeerSupportForum />;
      case 'users':
        return <UserManagement />;
      case 'bookings':
        return <BookingManagement />;
      case 'resource-management':
        return <ResourceManagement />;
      case 'emergency':
        return <EmergencyManagement />;
      case 'analytics':
        return <AnalyticsDashboard />;
      default:
        if (userRole === 'admin') return <AdminDashboard />;
        if (userRole === 'counsellor') return <CounsellorDashboard />;
        return <StudentDashboard />;
    }
  };

  return (
    <DashboardLayout 
      userRole={userRole} 
      userName={userData.name}
      userAvatar={userData.avatar}
    >
      <div className="space-y-6">
        {/* Navigation Buttons (for demo) */}
        <div className="flex flex-wrap gap-2 p-4 bg-card rounded-lg border">
          <Button 
            variant={currentView === 'dashboard' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setCurrentView('dashboard')}
          >
            Dashboard
          </Button>
          
          {/* Student & Student Volunteer Features */}
          {(userRole === 'student' || userRole === 'student_volunteer') && (
            <>
              <Button 
                variant={currentView === 'booking' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setCurrentView('booking')}
              >
                Booking
              </Button>
              <Button 
                variant={currentView === 'forum' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setCurrentView('forum')}
              >
                Forum
              </Button>
            </>
          )}

          {/* Admin Features */}
          {userRole === 'admin' && (
            <>
              <Button 
                variant={currentView === 'users' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setCurrentView('users')}
              >
                Users
              </Button>
              <Button 
                variant={currentView === 'bookings' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setCurrentView('bookings')}
              >
                Bookings
              </Button>
              <Button 
                variant={currentView === 'resource-management' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setCurrentView('resource-management')}
              >
                Manage Resources
              </Button>
              <Button 
                variant={currentView === 'emergency' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setCurrentView('emergency')}
              >
                Emergency
              </Button>
              <Button 
                variant={currentView === 'analytics' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setCurrentView('analytics')}
              >
                Analytics
              </Button>
            </>
          )}

          {/* Common Features */}
          <Button 
            variant={currentView === 'resources' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setCurrentView('resources')}
          >
            Resources
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleLogout}
            className="ml-auto"
          >
            Logout
          </Button>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

export default Index;
