
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrCode, Trophy, Clock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LoginForm = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password) {
      // In a real app, this would be a proper authentication
      toast({
        title: "Login successful",
        description: "Welcome back to EcoWaste!",
      });
      onLogin();
    } else {
      toast({
        title: "Login failed",
        description: "Please enter both email and password",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="name@example.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link to="#" className="text-sm text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <Input 
          id="password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
      <div className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="#" className="text-primary hover:underline">
          Sign up
        </Link>
      </div>
    </form>
  );
};

// Mock data for the customer dashboard
const rewardsData = [
  { id: 1, date: '2023-04-01', action: 'Recycled Paper', points: 25 },
  { id: 2, date: '2023-04-05', action: 'Composted Food Waste', points: 30 },
  { id: 3, date: '2023-04-12', action: 'Recycled Glass', points: 20 },
  { id: 4, date: '2023-04-18', action: 'Used Smart Bin', points: 15 },
];

const dumpingHistoryData = [
  { id: 1, date: '2023-04-01', time: '09:30 AM', type: 'Paper', location: 'Main Street Bin #103', weight: '1.2 kg' },
  { id: 2, date: '2023-04-05', time: '02:15 PM', type: 'Food Waste', location: 'Park Avenue Bin #87', weight: '2.5 kg' },
  { id: 3, date: '2023-04-12', time: '11:45 AM', type: 'Glass', location: 'Main Street Bin #103', weight: '3.0 kg' },
  { id: 4, date: '2023-04-18', time: '04:20 PM', type: 'Mixed Recycling', location: 'River Road Bin #42', weight: '1.8 kg' },
];

const CustomerDashboard = () => {
  const { toast } = useToast();
  
  const handleScanQR = () => {
    toast({
      title: "QR Scanner Activated",
      description: "Please scan the QR code on the waste bin",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar / Profile */}
        <div className="w-full md:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Profile</CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-lg">John Smith</h3>
                <p className="text-muted-foreground">john.smith@example.com</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Points:</span>
                  <span className="font-medium">345</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Membership Level:</span>
                  <span className="font-medium text-eco-500">Gold</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Joined:</span>
                  <span className="font-medium">Jan 15, 2023</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="w-full md:w-3/4">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Welcome Back, John!</CardTitle>
              <CardDescription>
                Track your waste management activities and earn rewards for responsible disposal.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button onClick={handleScanQR} className="flex items-center justify-center gap-2 h-auto py-6">
                  <QrCode className="h-5 w-5 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Scan QR Code</div>
                    <div className="text-xs text-primary-foreground/80">Log your waste disposal</div>
                  </div>
                </Button>
                <Button variant="outline" className="flex items-center justify-center gap-2 h-auto py-6">
                  <Trophy className="h-5 w-5 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Redeem Rewards</div>
                    <div className="text-xs text-muted-foreground">Use your earned points</div>
                  </div>
                </Button>
                <Button variant="secondary" className="flex items-center justify-center gap-2 h-auto py-6">
                  <Clock className="h-5 w-5 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Schedule Pickup</div>
                    <div className="text-xs text-muted-foreground">For large or special items</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="dumping-history">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="dumping-history">Dumping History</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dumping-history" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Dumping History</CardTitle>
                  <CardDescription>Track your waste disposal activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">Date</th>
                          <th className="text-left py-3 px-2">Time</th>
                          <th className="text-left py-3 px-2">Waste Type</th>
                          <th className="text-left py-3 px-2">Location</th>
                          <th className="text-left py-3 px-2">Weight</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dumpingHistoryData.map((item) => (
                          <tr key={item.id} className="border-b">
                            <td className="py-3 px-2">{item.date}</td>
                            <td className="py-3 px-2">{item.time}</td>
                            <td className="py-3 px-2">{item.type}</td>
                            <td className="py-3 px-2">{item.location}</td>
                            <td className="py-3 px-2">{item.weight}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="rewards" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Rewards Activity</CardTitle>
                  <CardDescription>Points earned for responsible waste management</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">Date</th>
                          <th className="text-left py-3 px-2">Activity</th>
                          <th className="text-left py-3 px-2">Points Earned</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rewardsData.map((item) => (
                          <tr key={item.id} className="border-b">
                            <td className="py-3 px-2">{item.date}</td>
                            <td className="py-3 px-2">{item.action}</td>
                            <td className="py-3 px-2 text-eco-600 font-medium">+{item.points}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Points Available:</span>
                      <span className="text-xl font-bold text-eco-600">345</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const Customers = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {!isLoggedIn ? (
          <section className="py-12 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight mb-4">
                    <span className="eco-text-gradient">Customer</span> Portal
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8">
                    Join our eco-conscious community to track your waste disposal activities, 
                    earn rewards, and make a positive impact on the environment.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-start">
                      <div className="mt-1 bg-eco-100 rounded-full p-1">
                        <QrCode className="h-4 w-4 text-eco-600" />
                      </div>
                      <div className="ml-2">
                        <h3 className="text-sm font-medium">Scan & Log</h3>
                        <p className="text-xs text-muted-foreground">Easily log your waste disposal</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 bg-eco-100 rounded-full p-1">
                        <Trophy className="h-4 w-4 text-eco-600" />
                      </div>
                      <div className="ml-2">
                        <h3 className="text-sm font-medium">Earn Rewards</h3>
                        <p className="text-xs text-muted-foreground">Get points for responsible disposal</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 bg-eco-100 rounded-full p-1">
                        <Clock className="h-4 w-4 text-eco-600" />
                      </div>
                      <div className="ml-2">
                        <h3 className="text-sm font-medium">Track History</h3>
                        <p className="text-xs text-muted-foreground">View your environmental impact</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 bg-eco-100 rounded-full p-1">
                        <User className="h-4 w-4 text-eco-600" />
                      </div>
                      <div className="ml-2">
                        <h3 className="text-sm font-medium">Personal Profile</h3>
                        <p className="text-xs text-muted-foreground">Manage your account</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Login</CardTitle>
                      <CardDescription>
                        Login to your EcoWaste account to access all features
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <LoginForm onLogin={() => setIsLoggedIn(true)} />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <CustomerDashboard />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Customers;
