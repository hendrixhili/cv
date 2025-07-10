import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { CVContent } from "@/components/cv-content";
import { BookingPanel } from "@/components/booking-panel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, LogIn, Calendar, UserPlus } from "lucide-react";

export default function HomePage() {
  const { user, isLoading, logoutMutation } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-academic-blue"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen font-inter">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-slate-900">Kun Pang Hendrix</h1>
              <span className="ml-3 text-sm text-slate-500">Academic Portfolio</span>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm text-slate-700">{user.username}</span>
                  {user.role === 'admin' && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      Admin
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => logoutMutation.mutate()}
                    disabled={logoutMutation.isPending}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Link href="/auth">
                  <Button variant="ghost" size="sm">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <CVContent />
          {user ? <BookingPanel /> : <GuestBookingPanel />}
        </div>
      </main>
    </div>
  );
}

function GuestBookingPanel() {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8 space-y-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-slate-900">
              <Calendar className="w-5 h-5 mr-3 text-academic-blue" />
              Meeting Booking
            </CardTitle>
            <p className="text-slate-600 text-sm">Schedule a consultation or discussion session</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-8 bg-slate-50 rounded-lg">
              <UserPlus className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Login Required</h3>
              <p className="text-sm text-slate-600 mb-4">
                To book a meeting, please login with your account or register for a new one.
              </p>
              <Link href="/auth">
                <Button className="w-full bg-academic-blue hover:bg-blue-700">
                  Login / Register
                </Button>
              </Link>
            </div>
            <div className="text-xs text-slate-500 text-center">
              Registration is quick and easy. A password will be automatically generated for you.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
