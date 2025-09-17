import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserPlus, Edit, Trash2, Search, Circle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@university.edu",
      role: "student",
      rollNumber: "CS21001",
      department: "Computer Science",
      section: "A",
      phone: "+91 9876543210",
      address: "Hostel Block A, Room 201",
      isOnline: true,
      lastSeen: "Just now",
      joinedDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.c@university.edu",
      role: "student_volunteer",
      rollNumber: "ME21045",
      department: "Mechanical Engineering",
      section: "B",
      phone: "+91 9876543211",
      address: "Hostel Block B, Room 305",
      isOnline: false,
      lastSeen: "2 hours ago",
      joinedDate: "2024-02-10"
    },
    {
      id: 3,
      name: "Dr. Sarah Williams",
      email: "dr.williams@university.edu",
      role: "counsellor",
      rollNumber: "STAFF001",
      department: "Psychology",
      section: "Staff",
      phone: "+91 9876543212",
      address: "Faculty Housing, Block C",
      isOnline: true,
      lastSeen: "Just now",
      joinedDate: "2024-01-05"
    },
    {
      id: 4,
      name: "Priya Sharma",
      email: "priya.s@university.edu",
      role: "student",
      rollNumber: "EC21089",
      department: "Electronics",
      section: "A",
      phone: "+91 9876543213",
      address: "Day Scholar",
      isOnline: true,
      lastSeen: "5 minutes ago",
      joinedDate: "2024-03-01"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "student",
    rollNumber: "",
    department: "",
    section: "",
    phone: "",
    address: ""
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const onlineUsers = users.filter(user => user.isOnline);
  const studentCount = users.filter(user => user.role === 'student' || user.role === 'student_volunteer').length;
  const counsellorCount = users.filter(user => user.role === 'counsellor').length;

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.rollNumber) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const user = {
      id: users.length + 1,
      ...newUser,
      isOnline: false,
      lastSeen: "Never",
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setUsers([...users, user]);
    setNewUser({
      name: "",
      email: "",
      role: "student",
      rollNumber: "",
      department: "",
      section: "",
      phone: "",
      address: ""
    });
    setIsAddUserOpen(false);
    
    toast({
      title: "User Added",
      description: `${user.name} has been added successfully`
    });
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
    toast({
      title: "User Deleted",
      description: "User has been deleted successfully"
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'counsellor': return 'bg-blue-100 text-blue-800';
      case 'student_volunteer': return 'bg-green-100 text-green-800';
      case 'student': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'student_volunteer': return 'Student Volunteer';
      default: return role.charAt(0).toUpperCase() + role.slice(1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold text-foreground">{users.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Circle className="w-5 h-5 text-green-600 fill-current" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Online Now</p>
                <p className="text-2xl font-bold text-foreground">{onlineUsers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Students</p>
                <p className="text-2xl font-bold text-foreground">{studentCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Counsellors</p>
                <p className="text-2xl font-bold text-foreground">{counsellorCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-64"
                />
              </div>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="student">Students</SelectItem>
                  <SelectItem value="student_volunteer">Student Volunteers</SelectItem>
                  <SelectItem value="counsellor">Counsellors</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user account with their details
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Role *</Label>
                    <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="student_volunteer">Student Volunteer</SelectItem>
                        <SelectItem value="counsellor">Counsellor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="rollNumber">Roll Number *</Label>
                    <Input
                      id="rollNumber"
                      value={newUser.rollNumber}
                      onChange={(e) => setNewUser({...newUser, rollNumber: e.target.value})}
                      placeholder="Enter roll number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={newUser.department}
                      onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                      placeholder="Enter department"
                    />
                  </div>
                  <div>
                    <Label htmlFor="section">Section</Label>
                    <Input
                      id="section"
                      value={newUser.section}
                      onChange={(e) => setNewUser({...newUser, section: e.target.value})}
                      placeholder="Enter section"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={newUser.address}
                      onChange={(e) => setNewUser({...newUser, address: e.target.value})}
                      placeholder="Enter address"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleAddUser} className="flex-1">Add User</Button>
                    <Button variant="outline" onClick={() => setIsAddUserOpen(false)} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>Manage all users in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-foreground">{user.name}</h3>
                        {user.isOnline ? (
                          <Badge className="bg-green-100 text-green-800">
                            <Circle className="w-3 h-3 mr-1 fill-current" />
                            Online
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            <Circle className="w-3 h-3 mr-1" />
                            {user.lastSeen}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getRoleColor(user.role)}>
                          {getRoleDisplayName(user.role)}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {user.rollNumber} • {user.department} • {user.section}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                  <div>📞 {user.phone || 'Not provided'}</div>
                  <div>🏠 {user.address || 'Not provided'}</div>
                  <div>📅 Joined: {user.joinedDate}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;