import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarComponentProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  bookedDates: string[];
}

export function CalendarComponent({ selectedDate, onDateSelect, bookedDates }: CalendarComponentProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isToday = (year: number, month: number, day: number) => {
    const today = new Date();
    return year === today.getFullYear() && 
           month === today.getMonth() && 
           day === today.getDate();
  };

  const isPastDate = (year: number, month: number, day: number) => {
    const today = new Date();
    const checkDate = new Date(year, month, day);
    today.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    
    const days = [];
    
    // Previous month's trailing days
    const prevMonth = new Date(year, month - 1, 0);
    const daysInPrevMonth = prevMonth.getDate();
    
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      days.push(
        <button
          key={`prev-${day}`}
          className="p-2 text-slate-300 text-sm"
          disabled
        >
          {day}
        </button>
      );
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(year, month, day);
      const isSelected = selectedDate === dateString;
      const hasBooking = bookedDates.includes(dateString);
      const isPast = isPastDate(year, month, day);
      const todayClass = isToday(year, month, day) ? "ring-2 ring-academic-blue" : "";
      
      days.push(
        <button
          key={day}
          className={`p-2 text-sm rounded transition-colors ${
            isPast
              ? "text-slate-300 cursor-not-allowed"
              : isSelected
              ? "bg-academic-blue text-white"
              : hasBooking
              ? "bg-red-100 text-red-700"
              : "text-slate-700 hover:bg-blue-50"
          } ${todayClass}`}
          disabled={isPast}
          onClick={() => !isPast && onDateSelect(dateString)}
        >
          {day}
        </button>
      );
    }
    
    // Next month's leading days
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (firstDay + daysInMonth);
    
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <button
          key={`next-${day}`}
          className="p-2 text-slate-300 text-sm"
          disabled
        >
          {day}
        </button>
      );
    }
    
    return days;
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg text-slate-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-slate-500 py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {renderCalendarDays()}
        </div>
        
        {/* Legend */}
        <div className="mt-4 text-xs text-slate-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-academic-blue rounded mr-2"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-100 rounded mr-2"></div>
              <span>Has Booking</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
