import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SOSButton from "@/components/emergency/SOSButton";
import { 
  Menu, 
  X, 
  Calendar, 
  BookOpen, 
  MessageSquare, 
  Users, 
  BarChart3, 
  Settings,
  Shield,
  Heart,
  Phone,
  Home,
  UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: 'admin' | 'counsellor' | 'student' | 'student_volunteer';
  userName: string;
  userAvatar?: string;
}

const DashboardLayout = ({ children, userRole, userName, userAvatar }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getNavigationItems = () => {
    const baseItems = [
      { icon: Home, label: "Dashboard", href: "/dashboard" },
    ];

    switch (userRole) {
      case 'admin':
        return [
          ...baseItems,
          { icon: Users, label: "User Management", href: "/admin/users" },
          { icon: Calendar, label: "Bookings", href: "/admin/bookings" },
          { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
          { icon: BookOpen, label: "Resources", href: "/admin/resources" },
          { icon: MessageSquare, label: "Forum Moderation", href: "/admin/forum" },
          { icon: Shield, label: "Emergency Management", href: "/admin/emergency" },
          { icon: Settings, label: "Settings", href: "/admin/settings" },
        ];
      case 'counsellor':
        return [
          ...baseItems,
          { icon: Calendar, label: "Appointments", href: "/counsellor/appointments" },
          { icon: Users, label: "Students", href: "/counsellor/students" },
          { icon: BookOpen, label: "Resources", href: "/counsellor/resources" },
          { icon: Shield, label: "Emergency Cases", href: "/counsellor/emergency" },
          { icon: Settings, label: "Profile", href: "/counsellor/profile" },
        ];
      case 'student':
      case 'student_volunteer':
        return [
          ...baseItems,
          { icon: Calendar, label: "Book Appointment", href: "/student/booking" },
          { icon: Calendar, label: "My Appointments", href: "/student/appointments" },
          { icon: BookOpen, label: "Resources", href: "/student/resources" },
          { icon: MessageSquare, label: "Peer Support", href: "/student/forum" },
          ...(userRole === 'student_volunteer' 
            ? [{ icon: UserCheck, label: "Moderation", href: "/student/moderation" }] 
            : []
          ),
          { icon: Settings, label: "Profile", href: "/student/profile" },
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  const handleSOSClick = () => {
    navigate('/emergency');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full w-64 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-tertiary rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg text-foreground">MindCare</h1>
                  <p className="text-xs text-muted-foreground">Digital Wellness Hub</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* SOS Button */}
          <div className="p-4 border-t border-border">
            <Button
              variant="emergency"
              className="w-full"
              onClick={handleSOSClick}
            >
              <Phone className="w-4 h-4 mr-2" />
              Emergency SOS
            </Button>
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={userAvatar} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground truncate">{userName}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole.replace('_', ' ')}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Mobile header */}
        <header className="lg:hidden bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg">MindCare</span>
            </div>
            <Button
              variant="emergency"
              size="sm"
              onClick={handleSOSClick}
            >
              <Phone className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Floating SOS Button */}
      <SOSButton />
    </div>
  );
};

export default DashboardLayout;