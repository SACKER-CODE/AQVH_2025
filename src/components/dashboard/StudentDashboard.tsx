import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  BookOpen, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Heart,
  Users,
  Video,
  Headphones,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const [upcomingAppointments] = useState([
    {
      id: "1",
      counsellor: "Dr. Sarah Johnson",
      date: "2024-01-15",
      time: "10:00 AM",
      type: "scheduled",
      status: "confirmed"
    },
    {
      id: "2",
      counsellor: "Dr. Michael Chen",
      date: "2024-01-20",
      time: "2:00 PM",
      type: "scheduled",
      status: "pending"
    }
  ]);

  const [recentResources] = useState([
    {
      id: "1",
      title: "Managing Exam Stress",
      type: "video",
      duration: "15 min",
      category: "stress"
    },
    {
      id: "2",
      title: "Mindfulness Meditation",
      type: "audio",
      duration: "20 min",
      category: "wellness"
    },
    {
      id: "3",
      title: "Study-Life Balance Guide",
      type: "guide",
      duration: "10 min read",
      category: "wellness"
    }
  ]);

  const wellnessScore = 75;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-soft to-tertiary-soft rounded-2xl p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-tertiary rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to Your Wellness Journey</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Take care of your mental health with our comprehensive support system. 
          Book appointments, access resources, and connect with peers.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/student/booking">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Book Appointment</h3>
              <p className="text-sm text-muted-foreground">Schedule a session with a counsellor</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/student/resources">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-tertiary" />
              </div>
              <h3 className="font-semibold mb-2">Wellness Resources</h3>
              <p className="text-sm text-muted-foreground">Access guides, videos, and audio content</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/student/forum">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Peer Support</h3>
              <p className="text-sm text-muted-foreground">Connect with fellow students</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wellness Score */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Wellness Score</span>
            </CardTitle>
            <CardDescription>
              Your current mental wellness indicator
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">{wellnessScore}%</span>
                <Badge variant="outline" className="text-tertiary border-tertiary">
                  Good
                </Badge>
              </div>
              <Progress value={wellnessScore} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Based on your recent activities and check-ins. Keep up the good work!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Upcoming Appointments</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <div 
                    key={appointment.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div>
                      <p className="font-medium">{appointment.counsellor}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.date} at {appointment.time}
                      </p>
                    </div>
                    <Badge 
                      variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}
                      className="flex items-center space-x-1"
                    >
                      {appointment.status === 'confirmed' ? 
                        <CheckCircle className="w-3 h-3" /> : 
                        <AlertCircle className="w-3 h-3" />
                      }
                      <span className="capitalize">{appointment.status}</span>
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No upcoming appointments</p>
                  <Link to="/student/booking">
                    <Button variant="outline" size="sm" className="mt-2">
                      Book Now
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span>Recommended Resources</span>
            </CardTitle>
            <CardDescription>
              Personalized content for your wellness journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentResources.map((resource) => (
                <div 
                  key={resource.id}
                  className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    {resource.type === 'video' && <Video className="w-5 h-5 text-primary" />}
                    {resource.type === 'audio' && <Headphones className="w-5 h-5 text-primary" />}
                    {resource.type === 'guide' && <FileText className="w-5 h-5 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{resource.title}</p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{resource.duration}</span>
                      <span>•</span>
                      <Badge variant="outline" className="text-xs">
                        {resource.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/student/resources">
              <Button variant="outline" className="w-full mt-4">
                View All Resources
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Community Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span>Community Activity</span>
            </CardTitle>
            <CardDescription>
              Stay connected with your peer support network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">24</p>
                <p className="text-sm text-muted-foreground">Active discussions today</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-tertiary">156</p>
                <p className="text-sm text-muted-foreground">Students helped this week</p>
              </div>
              <Link to="/student/forum">
                <Button variant="outline" className="w-full">
                  Join Conversations
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;