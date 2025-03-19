import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Map, Truck, MapPin, BatteryFull, BatteryMedium, BatteryLow, Clock, CalendarDays, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const binsData = [
  { id: 1, location: 'Main Street #103', lat: 40.7128, lng: -74.006, fillLevel: 85, lastCollected: '2023-04-10', binType: 'General Waste' },
  { id: 2, location: 'Park Avenue #87', lat: 40.7193, lng: -73.9916, fillLevel: 45, lastCollected: '2023-04-15', binType: 'Recycling' },
  { id: 3, location: 'River Road #42', lat: 40.7232, lng: -74.0123, fillLevel: 30, lastCollected: '2023-04-17', binType: 'Organic' },
  { id: 4, location: 'Downtown Plaza #29', lat: 40.7181, lng: -73.9973, fillLevel: 78, lastCollected: '2023-04-12', binType: 'General Waste' },
  { id: 5, location: 'Central Park #76', lat: 40.7736, lng: -73.9712, fillLevel: 20, lastCollected: '2023-04-18', binType: 'Recycling' },
  { id: 6, location: 'Oak Street #113', lat: 40.7264, lng: -74.0094, fillLevel: 65, lastCollected: '2023-04-14', binType: 'General Waste' },
];

const LoginForm = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password) {
      toast({
        title: "Login successful",
        description: "Welcome back driver!",
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
    </form>
  );
};

const BinStatusIndicator = ({ fillLevel }: { fillLevel: number }) => {
  let statusColor = '';
  let statusLabel = '';
  let StatusIcon = BatteryMedium;

  if (fillLevel >= 75) {
    statusColor = 'bg-waste-high';
    statusLabel = 'High';
    StatusIcon = BatteryFull;
  } else if (fillLevel >= 40) {
    statusColor = 'bg-waste-medium';
    statusLabel = 'Medium';
    StatusIcon = BatteryMedium;
  } else {
    statusColor = 'bg-waste-low';
    statusLabel = 'Low';
    StatusIcon = BatteryLow;
  }

  return (
    <div className="flex items-center space-x-2">
      <div className={`h-3 w-3 rounded-full ${statusColor}`}></div>
      <span className="text-sm font-medium">{statusLabel}</span>
      <StatusIcon className="h-4 w-4" />
      <span className="text-sm font-medium">{fillLevel}%</span>
    </div>
  );
};

const DriverDashboard = () => {
  const [activeBin, setActiveBin] = useState<number | null>(null);
  const { toast } = useToast();

  const handleCollectBin = (binId: number) => {
    toast({
      title: "Bin Marked for Collection",
      description: `Bin #${binId} has been added to your collection route.`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle>Driver Profile</CardTitle>
              <CardDescription>Your information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-lg">Michael Johnson</h3>
                <p className="text-muted-foreground">Driver ID: ECO-DR-42698</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Route Zone:</span>
                  <span className="font-medium">Downtown Area</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vehicle:</span>
                  <span className="font-medium">Truck #ECO-78</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">On Duty</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Today's Statistics</CardTitle>
              <CardDescription>Your collection activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground">Bins Collected</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div className="bg-secondary rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                </div>
                <div className="bg-secondary rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground">Total Waste Collected</p>
                  <p className="text-2xl font-bold">842 kg</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Route Completion:</span>
                  <span className="text-sm font-medium">60%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-eco-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full md:w-3/4">
          <Tabs defaultValue="map">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="map">Map View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="map" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Bin Locations</CardTitle>
                  <CardDescription>Real-time map of all bins in your area</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[16/9] bg-background rounded-md border overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Map className="h-12 w-12 text-muted-foreground animate-pulse" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 to-slate-900/40 flex items-center justify-center">
                      <p className="text-white text-lg font-semibold">Interactive Map View</p>
                    </div>
                    
                    <div className="absolute top-1/4 left-1/3 animate-pulse-slow">
                      <div className="relative">
                        <MapPin className="h-6 w-6 text-waste-high" />
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-card p-2 rounded shadow-lg whitespace-nowrap">
                          <p className="text-xs font-medium">Main Street #103</p>
                          <p className="text-xs text-muted-foreground">85% Full</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 left-2/3 animate-pulse-slow" style={{ animationDelay: "1s" }}>
                      <MapPin className="h-6 w-6 text-waste-medium" />
                    </div>
                    
                    <div className="absolute bottom-1/3 right-1/4 animate-pulse-slow" style={{ animationDelay: "1.5s" }}>
                      <MapPin className="h-6 w-6 text-waste-low" />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-waste-high mr-2"></div>
                      <span className="text-sm">High Priority (&gt;75%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-waste-medium mr-2"></div>
                      <span className="text-sm">Medium Priority (40-75%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-waste-low mr-2"></div>
                      <span className="text-sm">Low Priority (&lt;40%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="list" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Bins Status</CardTitle>
                  <CardDescription>Current fill level and status of all bins</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {binsData.map((bin) => (
                      <Card key={bin.id} className={`hover:shadow-md transition cursor-pointer ${activeBin === bin.id ? 'border-eco-500' : ''}`} onClick={() => setActiveBin(bin.id)}>
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 text-primary" />
                                <h3 className="font-medium">{bin.location}</h3>
                                <Badge variant="outline">{bin.binType}</Badge>
                              </div>
                              <div className="mt-2 flex items-center space-x-4">
                                <BinStatusIndicator fillLevel={bin.fillLevel} />
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>Last collected: {bin.lastCollected}</span>
                                </div>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              variant={bin.fillLevel > 75 ? "default" : "outline"} 
                              className="mt-2 md:mt-0"
                              onClick={() => handleCollectBin(bin.id)}
                            >
                              <Truck className="h-4 w-4 mr-1" />
                              Collect
                            </Button>
                          </div>
                          
                          <div className="mt-3 w-full bg-secondary rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                bin.fillLevel >= 75 ? 'bg-waste-high' : 
                                bin.fillLevel >= 40 ? 'bg-waste-medium' : 'bg-waste-low'
                              }`} 
                              style={{ width: `${bin.fillLevel}%` }}
                            ></div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Today's Collection Route</CardTitle>
              <CardDescription className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-2" />
                <span>April 20, 2023</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <h3 className="font-medium mb-2">Route Optimization Active</h3>
                  <p className="text-sm text-muted-foreground">
                    Your route is being continuously optimized based on bin fill levels, traffic conditions, and priority areas.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="text-sm font-medium mb-1">Next Collection</h4>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-waste-high mr-1" />
                      <span className="text-sm">Main Street #103</span>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Estimated arrival: 10 minutes
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="text-sm font-medium mb-1">Total Route Distance</h4>
                    <p className="text-lg font-medium">12.5 km</p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Estimated completion: 3:30 PM
                    </div>
                  </div>
                </div>
                
                <Button className="w-full">
                  <Map className="h-4 w-4 mr-2" />
                  View Complete Route
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const BinAttenders = () => {
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
                    <span className="eco-text-gradient">Bin Attenders</span> Portal
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8">
                    Access your optimized collection routes, monitor bin status in real-time, 
                    and efficiently manage waste collection with our smart system.
                  </p>
                  <div className="bg-secondary/50 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-medium mb-4">Driver Benefits</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="mt-1 bg-eco-100 rounded-full p-1 mr-2">
                          <Map className="h-4 w-4 text-eco-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Smart Navigation</h4>
                          <p className="text-sm text-muted-foreground">Optimized routes based on bin fill levels</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="mt-1 bg-eco-100 rounded-full p-1 mr-2">
                          <BatteryMedium className="h-4 w-4 text-eco-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Real-time Monitoring</h4>
                          <p className="text-sm text-muted-foreground">Live updates on bin status and fill levels</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="mt-1 bg-eco-100 rounded-full p-1 mr-2">
                          <Truck className="h-4 w-4 text-eco-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Efficient Collection</h4>
                          <p className="text-sm text-muted-foreground">Focus on high-priority bins first</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Driver Login</CardTitle>
                      <CardDescription>
                        Login to access your route and bin information
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
          <DriverDashboard />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BinAttenders;
