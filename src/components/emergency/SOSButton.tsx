import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, MapPin, Clock, Heart, Shield, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  availability: string;
  responseTime: string;
  location?: string;
}

const SOSButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const emergencyContacts: EmergencyContact[] = [
    {
      id: "1",
      name: "Campus Crisis Helpline",
      role: "24/7 Emergency Support",
      phone: "1800-599-0019",
      availability: "Available 24/7",
      responseTime: "Immediate",
      location: "Campus Health Center"
    },
    {
      id: "2", 
      name: "Dr. Emergency Response",
      role: "On-Call Counsellor",
      phone: "+1-555-0123",
      availability: "Available Now",
      responseTime: "< 5 minutes",
      location: "Student Services Building"
    },
    {
      id: "3",
      name: "National Suicide Prevention",
      role: "Crisis Support",
      phone: "988",
      availability: "Available 24/7",
      responseTime: "Immediate",
      location: "National Hotline"
    }
  ];

  const handleEmergencyCall = async (contact: EmergencyContact) => {
    setIsConnecting(true);
    
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Connecting to emergency support...",
      description: `Calling ${contact.name} at ${contact.phone}`,
    });

    // In a real app, this would initiate a call or connect to emergency services
    window.open(`tel:${contact.phone}`, '_self');
    
    setIsConnecting(false);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="emergency" 
          size="lg"
          className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full shadow-2xl hover:shadow-emergency/50"
        >
          <Phone className="w-8 h-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-emergency">
            <AlertTriangle className="w-6 h-6" />
            <span>Emergency Support</span>
          </DialogTitle>
          <DialogDescription>
            Get immediate help from trained professionals. All calls are confidential.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Crisis Warning */}
          <Card className="border-emergency bg-emergency-soft">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-emergency mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-emergency">Crisis Support Available</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    If you're in immediate danger, call emergency services (911) or go to your nearest emergency room.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Available Support Options</h4>
            {emergencyContacts.map((contact) => (
              <Card 
                key={contact.id} 
                className="cursor-pointer hover:shadow-md transition-all duration-200 hover:border-primary"
                onClick={() => handleEmergencyCall(contact)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Heart className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">{contact.name}</h5>
                        <p className="text-xs text-muted-foreground mb-2">{contact.role}</p>
                        
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-xs">
                            <Phone className="w-3 h-3" />
                            <span className="font-mono">{contact.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{contact.availability}</span>
                          </div>
                          {contact.location && (
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              <span>{contact.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs border-tertiary text-tertiary">
                      {contact.responseTime}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Self-Care Reminder */}
          <Card className="border-primary bg-primary-soft">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Heart className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-primary">You're Not Alone</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Reaching out for help is a sign of strength. Our trained professionals are here to support you.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Close Button */}
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setIsDialogOpen(false)}
            disabled={isConnecting}
          >
            {isConnecting ? "Connecting..." : "Close"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SOSButton;