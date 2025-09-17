import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { CalendarIcon, Clock, User, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface Counsellor {
  id: string;
  name: string;
  specialization: string;
  department: string;
  avatar?: string;
  availability: string[];
  rating: number;
}

const BookingForm = () => {
  const [bookingType, setBookingType] = useState<'emergency' | 'scheduled'>('scheduled');
  const [selectedCounsellor, setSelectedCounsellor] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [cause, setCause] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const counsellors: Counsellor[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialization: "Anxiety & Stress Management",
      department: "Psychology",
      avatar: "/counsellor1.jpg",
      availability: ["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM"],
      rating: 4.8
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialization: "Depression & Mood Disorders",
      department: "Clinical Psychology",
      avatar: "/counsellor2.jpg",
      availability: ["10:00 AM", "11:00 AM", "1:00 PM", "4:00 PM"],
      rating: 4.9
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialization: "Academic Stress & Career Counseling",
      department: "Educational Psychology",
      avatar: "/counsellor3.jpg",
      availability: ["9:00 AM", "11:00 AM", "2:00 PM", "5:00 PM"],
      rating: 4.7
    },
    {
      id: "4",
      name: "Dr. James Wilson",
      specialization: "Relationship & Social Issues",
      department: "Counseling Psychology",
      avatar: "/counsellor4.jpg",
      availability: ["8:00 AM", "10:00 AM", "1:00 PM", "3:00 PM"],
      rating: 4.6
    }
  ];

  const timeSlots = [
    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const selectedCounsellorData = counsellors.find(c => c.id === selectedCounsellor);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!selectedCounsellor) {
      toast({
        title: "Please select a counsellor",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    if (bookingType === 'scheduled' && (!selectedDate || !selectedTime)) {
      toast({
        title: "Please select date and time",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    if (!cause.trim()) {
      toast({
        title: "Please describe your concern",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Booking submitted successfully!",
      description: `Your ${bookingType} appointment request has been sent to ${selectedCounsellorData?.name}.`,
    });

    // Reset form
    setSelectedCounsellor('');
    setSelectedDate(undefined);
    setSelectedTime('');
    setReason('');
    setCause('');
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Book an Appointment</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Schedule a session with one of our qualified counsellors. Choose between emergency 
          support or a scheduled appointment based on your needs.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
          <CardDescription>
            Fill out the form below to request an appointment with a counsellor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Booking Type */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Appointment Type</Label>
              <RadioGroup 
                value={bookingType} 
                onValueChange={(value: 'emergency' | 'scheduled') => setBookingType(value)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="emergency" id="emergency" />
                  <Label 
                    htmlFor="emergency" 
                    className="flex items-center space-x-2 cursor-pointer p-3 rounded-lg border border-emergency/20 bg-emergency-soft hover:bg-emergency-soft/80 transition-colors flex-1"
                  >
                    <AlertTriangle className="w-5 h-5 text-emergency" />
                    <div>
                      <p className="font-medium">Emergency</p>
                      <p className="text-sm text-muted-foreground">Immediate support needed</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="scheduled" id="scheduled" />
                  <Label 
                    htmlFor="scheduled" 
                    className="flex items-center space-x-2 cursor-pointer p-3 rounded-lg border border-primary/20 bg-primary-soft hover:bg-primary-soft/80 transition-colors flex-1"
                  >
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Scheduled</p>
                      <p className="text-sm text-muted-foreground">Plan ahead with calendar</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Counsellor Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Select a Counsellor</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {counsellors.map((counsellor) => (
                  <div
                    key={counsellor.id}
                    className={cn(
                      "p-4 rounded-lg border cursor-pointer transition-all duration-200",
                      selectedCounsellor === counsellor.id 
                        ? "border-primary bg-primary-soft shadow-md" 
                        : "border-border hover:border-primary/50 hover:bg-accent"
                    )}
                    onClick={() => setSelectedCounsellor(counsellor.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar>
                        <AvatarImage src={counsellor.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {counsellor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{counsellor.name}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{counsellor.specialization}</p>
                        <p className="text-xs text-muted-foreground mb-2">{counsellor.department}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            ⭐ {counsellor.rating}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Available
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date and Time Selection (for scheduled appointments) */}
            {bookingType === 'scheduled' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold">Select Time</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {(selectedCounsellorData?.availability || timeSlots).map((time) => (
                        <SelectItem key={time} value={time}>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{time}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Reason and Cause */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="reason" className="text-base font-semibold">
                  Reason (Optional)
                </Label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic-stress">Academic Stress</SelectItem>
                    <SelectItem value="anxiety">Anxiety</SelectItem>
                    <SelectItem value="depression">Depression</SelectItem>
                    <SelectItem value="relationship-issues">Relationship Issues</SelectItem>
                    <SelectItem value="family-problems">Family Problems</SelectItem>
                    <SelectItem value="career-guidance">Career Guidance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="cause" className="text-base font-semibold">
                  Describe Your Concern *
                </Label>
                <Textarea
                  id="cause"
                  placeholder="Please briefly describe what you'd like to discuss..."
                  value={cause}
                  onChange={(e) => setCause(e.target.value)}
                  rows={4}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  setSelectedCounsellor('');
                  setSelectedDate(undefined);
                  setSelectedTime('');
                  setReason('');
                  setCause('');
                }}
              >
                Reset Form
              </Button>
              <Button 
                type="submit" 
                variant={bookingType === 'emergency' ? 'emergency' : 'default'}
                disabled={isSubmitting}
                className="min-w-32"
              >
                {isSubmitting ? "Submitting..." : `Book ${bookingType === 'emergency' ? 'Emergency' : 'Appointment'}`}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;