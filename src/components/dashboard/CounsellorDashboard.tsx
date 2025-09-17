import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock, User, Phone, Mail, MapPin, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CounsellorDashboard = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      studentName: "Sarah Johnson",
      rollNumber: "CS21001",
      department: "Computer Science",
      phone: "+91 9876543210",
      email: "sarah.j@university.edu",
      type: "Emergency",
      date: "2024-12-05",
      time: "10:00 AM",
      reason: "Academic Stress",
      cause: "Facing difficulty in managing multiple assignments and feeling overwhelmed",
      status: "pending"
    },
    {
      id: 2,
      studentName: "Michael Chen",
      rollNumber: "ME21045",
      department: "Mechanical Engineering",
      phone: "+91 9876543211",
      email: "michael.c@university.edu",
      type: "Scheduled",
      date: "2024-12-06",
      time: "2:00 PM",
      reason: "Anxiety",
      cause: "Experiencing social anxiety in group projects and presentations",
      status: "pending"
    },
    {
      id: 3,
      studentName: "Priya Sharma",
      rollNumber: "EC21089",
      department: "Electronics",
      phone: "+91 9876543212",
      email: "priya.s@university.edu",
      type: "Scheduled",
      date: "2024-12-04",
      time: "11:00 AM",
      reason: "Depression",
      cause: "Feeling isolated and having trouble connecting with peers",
      status: "accepted"
    }
  ]);

  const handleAppointmentAction = (id: number, action: 'accept' | 'decline', reason?: string) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, status: action === 'accept' ? 'accepted' : 'declined' } : apt
    ));
    
    toast({
      title: `Appointment ${action === 'accept' ? 'Accepted' : 'Declined'}`,
      description: `The appointment has been ${action === 'accept' ? 'accepted' : 'declined'} successfully.`
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'Emergency' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';
  };

  const stats = {
    totalAppointments: appointments.length,
    pendingAppointments: appointments.filter(apt => apt.status === 'pending').length,
    acceptedAppointments: appointments.filter(apt => apt.status === 'accepted').length,
    emergencyAppointments: appointments.filter(apt => apt.type === 'Emergency').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Counsellor Dashboard</h1>
        <p className="text-muted-foreground">Manage your appointments and support students</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Appointments</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalAppointments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-foreground">{stats.pendingAppointments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Accepted</p>
                <p className="text-2xl font-bold text-foreground">{stats.acceptedAppointments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Emergency</p>
                <p className="text-2xl font-bold text-foreground">{stats.emergencyAppointments}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Appointment Requests</CardTitle>
          <CardDescription>Review and manage student appointment requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>
                        {appointment.studentName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground">{appointment.studentName}</h3>
                      <p className="text-sm text-muted-foreground">Roll: {appointment.rollNumber}</p>
                      <p className="text-sm text-muted-foreground">{appointment.department}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className={getTypeColor(appointment.type)}>
                      {appointment.type}
                    </Badge>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{appointment.date} at {appointment.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{appointment.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{appointment.email}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">Reason:</p>
                      <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Details:</p>
                      <p className="text-sm text-muted-foreground">{appointment.cause}</p>
                    </div>
                  </div>
                </div>

                {appointment.status === 'pending' && (
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleAppointmentAction(appointment.id, 'accept')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Accept
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleAppointmentAction(appointment.id, 'decline')}
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Decline
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CounsellorDashboard;