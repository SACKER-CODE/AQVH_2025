import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, Phone, Clock, MapPin, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const EmergencyManagement = () => {
  const [emergencyContacts, setEmergencyContacts] = useState([
    {
      id: 1,
      name: "National Mental Health Helpline",
      phone: "1800-599-0019",
      description: "24/7 free mental health support helpline",
      region: "National",
      isActive: true,
      priority: 1
    },
    {
      id: 2,
      name: "Campus Counselling Center",
      phone: "+91 11-2659-1000",
      description: "On-campus emergency mental health support",
      region: "Campus",
      isActive: true,
      priority: 2
    },
    {
      id: 3,
      name: "Crisis Intervention Team",
      phone: "+91 11-2659-1001",
      description: "Immediate crisis intervention and support",
      region: "Local",
      isActive: true,
      priority: 3
    },
    {
      id: 4,
      name: "Student Support Services",
      phone: "+91 11-2659-1002",
      description: "General student support and guidance",
      region: "Campus",
      isActive: false,
      priority: 4
    }
  ]);

  const [sosRequests, setSosRequests] = useState([
    {
      id: 1,
      studentName: "Anonymous",
      timestamp: "2024-12-05 14:30:00",
      location: "Library Block A",
      status: "responded",
      respondedBy: "Dr. Sarah Williams",
      responseTime: "3 minutes"
    },
    {
      id: 2,
      studentName: "Alex Kumar",
      timestamp: "2024-12-05 11:15:00",
      location: "Hostel Block B",
      status: "resolved",
      respondedBy: "Crisis Team",
      responseTime: "5 minutes"
    },
    {
      id: 3,
      studentName: "Anonymous",
      timestamp: "2024-12-05 09:45:00",
      location: "Academic Block C",
      status: "pending",
      respondedBy: null,
      responseTime: null
    }
  ]);

  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    description: "",
    region: "Campus",
    priority: 1
  });

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const contact = {
      id: emergencyContacts.length + 1,
      ...newContact,
      isActive: true
    };

    setEmergencyContacts([...emergencyContacts, contact]);
    setNewContact({
      name: "",
      phone: "",
      description: "",
      region: "Campus",
      priority: 1
    });
    setIsAddContactOpen(false);
    
    toast({
      title: "Contact Added",
      description: `${contact.name} has been added successfully`
    });
  };

  const handleDeleteContact = (id: number) => {
    setEmergencyContacts(emergencyContacts.filter(contact => contact.id !== id));
    toast({
      title: "Contact Deleted",
      description: "Emergency contact has been deleted successfully"
    });
  };

  const toggleContactStatus = (id: number) => {
    setEmergencyContacts(emergencyContacts.map(contact => 
      contact.id === id ? { ...contact, isActive: !contact.isActive } : contact
    ));
    toast({
      title: "Status Updated",
      description: "Contact status has been updated"
    });
  };

  const handleSOSResponse = (id: number) => {
    setSosRequests(sosRequests.map(request => 
      request.id === id ? { 
        ...request, 
        status: "responded",
        respondedBy: "Admin Response",
        responseTime: "Just now"
      } : request
    ));
    toast({
      title: "SOS Response Sent",
      description: "Emergency response has been dispatched"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-red-100 text-red-800';
      case 'responded': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRegionColor = (region: string) => {
    switch (region) {
      case 'National': return 'bg-blue-100 text-blue-800';
      case 'Campus': return 'bg-green-100 text-green-800';
      case 'Local': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    totalContacts: emergencyContacts.length,
    activeContacts: emergencyContacts.filter(c => c.isActive).length,
    totalSOS: sosRequests.length,
    pendingSOS: sosRequests.filter(r => r.status === 'pending').length
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Contacts</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalContacts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Contacts</p>
                <p className="text-2xl font-bold text-foreground">{stats.activeContacts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">SOS Requests</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalSOS}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending SOS</p>
                <p className="text-2xl font-bold text-foreground">{stats.pendingSOS}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Emergency Contacts</CardTitle>
              <CardDescription>Manage emergency helplines and contact numbers</CardDescription>
            </div>
            <Dialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Contact
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Emergency Contact</DialogTitle>
                  <DialogDescription>
                    Add a new emergency contact or helpline
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={newContact.name}
                      onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                      placeholder="Enter contact name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={newContact.phone}
                      onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newContact.description}
                      onChange={(e) => setNewContact({...newContact, description: e.target.value})}
                      placeholder="Enter description"
                    />
                  </div>
                  <div>
                    <Label htmlFor="region">Region</Label>
                    <select
                      id="region"
                      value={newContact.region}
                      onChange={(e) => setNewContact({...newContact, region: e.target.value})}
                      className="w-full px-3 py-2 border border-input rounded-md"
                    >
                      <option value="National">National</option>
                      <option value="Campus">Campus</option>
                      <option value="Local">Local</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority (1-10)</Label>
                    <Input
                      id="priority"
                      type="number"
                      min="1"
                      max="10"
                      value={newContact.priority}
                      onChange={(e) => setNewContact({...newContact, priority: parseInt(e.target.value)})}
                      placeholder="Enter priority"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleAddContact} className="flex-1">Add Contact</Button>
                    <Button variant="outline" onClick={() => setIsAddContactOpen(false)} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emergencyContacts.map((contact) => (
              <div key={contact.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-foreground">{contact.name}</h3>
                        <Badge className={getRegionColor(contact.region)}>
                          {contact.region}
                        </Badge>
                        <Badge variant={contact.isActive ? "default" : "secondary"}>
                          {contact.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Badge variant="outline">Priority {contact.priority}</Badge>
                      </div>
                      <p className="text-lg font-mono text-foreground mb-2">{contact.phone}</p>
                      <p className="text-sm text-muted-foreground">{contact.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toggleContactStatus(contact.id)}
                    >
                      {contact.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteContact(contact.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SOS Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Recent SOS Requests</CardTitle>
          <CardDescription>Monitor and respond to emergency SOS requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sosRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-foreground">{request.studentName}</h3>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{request.timestamp}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{request.location}</span>
                        </div>
                        {request.respondedBy && (
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4" />
                            <span>Responded by: {request.respondedBy}</span>
                            {request.responseTime && <span>({request.responseTime})</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {request.status === 'pending' && (
                    <Button 
                      onClick={() => handleSOSResponse(request.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Respond Now
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyManagement;