import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, Users, AlertTriangle, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      studentName: "Sarah Johnson",
      studentRoll: "CS21001",
      counsellorName: "Dr. Sarah Williams",
      counsellorId: 1,
      type: "Emergency",
      date: "2024-12-05",
      time: "10:00 AM",
      reason: "Academic Stress",
      cause: "Facing difficulty in managing multiple assignments and feeling overwhelmed",
      status: "pending",
      submittedAt: "2024-12-05 09:30 AM"
    },
    {
      id: 2,
      studentName: "Michael Chen",
      studentRoll: "ME21045",
      counsellorName: "Dr. Sarah Williams",
      counsellorId: 1,
      type: "Scheduled",
      date: "2024-12-06",
      time: "2:00 PM",
      reason: "Anxiety",
      cause: "Experiencing social anxiety in group projects and presentations",
      status: "accepted",
      submittedAt: "2024-12-04 11:15 AM"
    },
    {
      id: 3,
      studentName: "Priya Sharma",
      studentRoll: "EC21089",
      counsellorName: "Dr. Mark Johnson",
      counsellorId: 2,
      type: "Scheduled",
      date: "2024-12-04",
      time: "11:00 AM",
      reason: "Depression",
      cause: "Feeling isolated and having trouble connecting with peers",
      status: "declined",
      submittedAt: "2024-12-03 03:20 PM"
    },
    {
      id: 4,
      studentName: "Alex Kumar",
      studentRoll: "IT21067",
      counsellorName: "Dr. Sarah Williams",
      counsellorId: 1,
      type: "Emergency",
      date: "2024-12-05",
      time: "3:00 PM",
      reason: "Panic Attacks",
      cause: "Experiencing frequent panic attacks during exams",
      status: "completed",
      submittedAt: "2024-12-05 02:45 PM"
    }
  ]);

  const [counsellors] = useState([
    { id: 1, name: "Dr. Sarah Williams", department: "Psychology" },
    { id: 2, name: "Dr. Mark Johnson", department: "Counselling" },
    { id: 3, name: "Dr. Emily Davis", department: "Mental Health" }
  ]);

  const [filterStatus, setFilterStatus] = useState("all");

  const filteredBookings = bookings.filter(booking => 
    filterStatus === "all" || booking.status === filterStatus
  );

  const handleStatusChange = (bookingId: number, newStatus: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
    
    toast({
      title: "Booking Updated",
      description: `Booking status changed to ${newStatus}`
    });
  };

  const handleReassignCounsellor = (bookingId: number, newCounsellorId: number) => {
    const counsellor = counsellors.find(c => c.id === newCounsellorId);
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId ? { 
        ...booking, 
        counsellorId: newCounsellorId,
        counsellorName: counsellor?.name || ""
      } : booking
    ));
    
    toast({
      title: "Counsellor Reassigned",
      description: `Booking reassigned to ${counsellor?.name}`
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'Emergency' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    accepted: bookings.filter(b => b.status === 'accepted').length,
    emergency: bookings.filter(b => b.type === 'Emergency').length
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
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
                <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
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
                <p className="text-2xl font-bold text-foreground">{stats.accepted}</p>
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
                <p className="text-2xl font-bold text-foreground">{stats.emergency}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Bookings</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <Card>
        <CardHeader>
          <CardTitle>All Bookings ({filteredBookings.length})</CardTitle>
          <CardDescription>Manage and monitor all appointment bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>
                        {booking.studentName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground">{booking.studentName}</h3>
                      <p className="text-sm text-muted-foreground">Roll: {booking.studentRoll}</p>
                      <p className="text-sm text-muted-foreground">Counsellor: {booking.counsellorName}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className={getTypeColor(booking.type)}>
                      {booking.type}
                    </Badge>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{booking.date} at {booking.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Submitted: {booking.submittedAt}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">Reason:</p>
                      <p className="text-sm text-muted-foreground">{booking.reason}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Details:</p>
                      <p className="text-sm text-muted-foreground">{booking.cause}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t">
                  <Select
                    value={booking.status}
                    onValueChange={(value) => handleStatusChange(booking.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="declined">Declined</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={booking.counsellorId.toString()}
                    onValueChange={(value) => handleReassignCounsellor(booking.id, parseInt(value))}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {counsellors.map((counsellor) => (
                        <SelectItem key={counsellor.id} value={counsellor.id.toString()}>
                          {counsellor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingManagement;