import { useAuth } from "@/hooks/use-auth";
import { CalendarComponent } from "@/components/calendar-component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Calendar, Clock, User, Shield, Users, Settings, Info } from "lucide-react";
import type { Meeting, MeetingWithUser } from "@shared/schema";

export function BookingPanel() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");

  const timeSlots = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"
  ];

  // Get booked slots for selected date
  const { data: bookedSlotsData } = useQuery({
    queryKey: ["/api/meetings/date", selectedDate],
    enabled: !!selectedDate,
  });

  const bookedSlots = bookedSlotsData?.bookedSlots || [];

  // Get user's meetings
  const { data: userMeetings = [] } = useQuery<MeetingWithUser[]>({
    queryKey: ["/api/meetings"],
    enabled: !!user,
  });

  // Book meeting mutation
  const bookMeetingMutation = useMutation({
    mutationFn: async (meetingData: any) => {
      const res = await apiRequest("POST", "/api/meetings", meetingData);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/meetings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/meetings/date", selectedDate] });
      setTopic("");
      setNotes("");
      setSelectedTime("");
      toast({
        title: "Meeting booked successfully",
        description: `Your meeting is scheduled for ${selectedDate} at ${selectedTime}`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Booking failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !topic.trim()) {
      toast({
        title: "Missing information",
        description: "Please select a date, time, and enter a meeting topic",
        variant: "destructive",
      });
      return;
    }

    bookMeetingMutation.mutate({
      date: selectedDate,
      timeSlot: selectedTime,
      topic: topic.trim(),
      notes: notes.trim(),
    });
  };

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8 space-y-6">
        {/* Booking Header */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-slate-900">
              <Calendar className="w-5 h-5 mr-3 text-academic-blue" />
              Schedule a Meeting
            </CardTitle>
            <p className="text-slate-600 text-sm">Book a consultation or discussion session</p>
          </CardHeader>
        </Card>

        {/* Calendar Interface */}
        <CalendarComponent
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          bookedDates={userMeetings.map(m => m.date)}
        />

        {/* Time Slot Selection */}
        {selectedDate && (
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-lg text-slate-900">
                <Clock className="w-5 h-5 mr-2 text-academic-blue" />
                Available Time Slots
              </CardTitle>
              <p className="text-sm text-slate-600">{selectedDate}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((time) => {
                  const isBooked = bookedSlots.includes(time);
                  const isSelected = selectedTime === time;
                  
                  return (
                    <Button
                      key={time}
                      variant={isSelected ? "default" : "outline"}
                      className={`p-3 text-sm ${
                        isBooked
                          ? "bg-red-50 border-red-200 text-red-600 cursor-not-allowed"
                          : isSelected
                          ? "bg-academic-blue border-academic-blue"
                          : "hover:border-academic-blue hover:bg-blue-50"
                      }`}
                      disabled={isBooked}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Booking Form */}
        {selectedDate && selectedTime && (
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">Meeting Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Meeting Topic</Label>
                <Input
                  id="topic"
                  placeholder="Brief description of meeting purpose"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  rows={3}
                  placeholder="Any specific topics or questions you'd like to discuss..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <Button
                className="w-full bg-academic-blue hover:bg-blue-700"
                onClick={handleBooking}
                disabled={bookMeetingMutation.isPending}
              >
                {bookMeetingMutation.isPending ? "Booking..." : "Book Meeting"}
              </Button>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Meeting details are private and only visible to you and the administrator.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Admin Panel */}
        {user?.role === "admin" && (
          <Card className="border-blue-200 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center text-lg text-slate-900">
                <Shield className="w-5 h-5 mr-2 text-academic-blue" />
                Admin Panel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-slate-600">
                Total Meetings: {userMeetings.length}
              </div>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                View All Bookings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                System Settings
              </Button>
            </CardContent>
          </Card>
        )}

        {/* User Bookings */}
        {user?.role !== "admin" && userMeetings.length > 0 && (
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-lg text-slate-900">
                <User className="w-5 h-5 mr-2 text-academic-blue" />
                My Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userMeetings.slice(0, 3).map((meeting) => (
                  <div key={meeting.id} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-slate-900">{meeting.topic}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {meeting.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      {meeting.date} at {meeting.timeSlot}
                    </p>
                    {meeting.notes && (
                      <p className="text-xs text-slate-500">{meeting.notes}</p>
                    )}
                  </div>
                ))}
                {userMeetings.length > 3 && (
                  <p className="text-xs text-slate-500 text-center">
                    ...and {userMeetings.length - 3} more meetings
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
