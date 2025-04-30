
import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Navigation, 
  Route as RouteIcon, 
  Car, 
  Map, 
  ArrowRight,
  User,
  Info,
  Clock,
  Truck,
  BatteryFull,
  BatteryMedium,
  BatteryLow 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Polyline } from '@react-google-maps/api';
import { solveTSP, calculateTotalDistance, DEPOT, generateRouteLegDetails } from '@/utils/tspSolver';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Updated bin locations with the coordinates provided
const binsData = [
  { id: 1, location: 'Mylapore', lat: 13.035, lng: 80.2672, fillLevel: 85, lastCollected: '2023-04-10', binType: 'General Waste' },
  { id: 2, location: 'Velachery', lat: 12.9697, lng: 80.1789, fillLevel: 45, lastCollected: '2023-04-15', binType: 'Recycling' },
  { id: 3, location: 'Avadi', lat: 13.0950, lng: 80.1303, fillLevel: 30, lastCollected: '2023-04-17', binType: 'Organic' },
  { id: 4, location: 'Mandaveli', lat: 13.035, lng: 80.2672, fillLevel: 78, lastCollected: '2023-04-12', binType: 'General Waste' },
  { id: 5, location: 'Alwarpet', lat: 13.06, lng: 80.21, fillLevel: 20, lastCollected: '2023-04-18', binType: 'Recycling' },
];

// All locations including the depot
const allLocations = [DEPOT, ...binsData];

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

// Updated center for Chennai area with Tambaram included
const center = {
  lat: 13.0000,
  lng: 80.1500
};

// Get bin marker icon based on fill level
const getBinMarkerIcon = (fillLevel) => {
  if (fillLevel >= 75) {
    return { url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' };
  } else if (fillLevel >= 40) {
    return { url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png' };
  } else {
    return { url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' };
  }
};

// Get depot marker icon - different from bin markers
const getDepotMarkerIcon = () => {
  return { 
    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
  };
};

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

const FeatureInfoPopup = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => {
  return (
    <div className="p-4 bg-card border rounded-lg shadow-md animate-in fade-in-50 duration-300">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 bg-eco-100 rounded-full flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-lg">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

const DashboardSectionCard = ({ 
  title, 
  shortDescription, 
  icon, 
  popoverTitle, 
  popoverDescription,
  isActive,
  onClick 
}: { 
  title: string; 
  shortDescription: string; 
  icon: React.ReactNode; 
  popoverTitle: string; 
  popoverDescription: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] ${isActive ? 'border-eco-500 shadow-lg shadow-eco-500/20' : ''}`}
          onClick={onClick}
        >
          <CardContent className="p-6 flex items-start gap-4">
            <div className={`h-12 w-12 rounded-full ${isActive ? 'bg-eco-500' : 'bg-secondary'}`}>
              {React.cloneElement(icon as React.ReactElement, { 
                className: `h-6 w-6 ${isActive ? 'text-white' : 'text-muted-foreground'}` 
              })}
            </div>
            <div>
              <h3 className="font-medium text-lg">{title}</h3>
              <p className="text-muted-foreground">{shortDescription}</p>
            </div>
          </CardContent>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-0 animate-in fade-in-50 zoom-in-95">
        <FeatureInfoPopup 
          title={popoverTitle} 
          description={popoverDescription}
          icon={icon}
        />
      </HoverCardContent>
    </HoverCard>
  );
};

const GoogleMapComponent = () => {
  const [selectedLocation, setSelectedLocation] = useState<null | (typeof binsData[0] | typeof DEPOT)>(null);
  const [optimizedRoute, setOptimizedRoute] = useState<number[]>([]);
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCbz8lwBmWJXZsLZuYyylD8T3cqatpIGb0'
  });

  const onMarkerClick = (location: typeof binsData[0] | typeof DEPOT) => {
    setSelectedLocation(location);
  };

  const onInfoWindowClose = () => {
    setSelectedLocation(null);
  };

  // Calculate optimized route using TSP
  useEffect(() => {
    if (binsData.length > 0) {
      const tour = solveTSP(binsData);
      setOptimizedRoute(tour);
      console.log("Optimized route:", tour);
    }
  }, []);

  // Generate polyline path based on optimized route
  const getPolylinePath = () => {
    if (!optimizedRoute.length) return [];
    
    const path = [];
    for (const locationId of optimizedRoute) {
      const location = allLocations.find(l => l.id === locationId);
      if (location) {
        path.push({ lat: location.lat, lng: location.lng });
      }
    }
    
    return path;
  };

  return isLoaded ? (
    <div className="w-full h-full" style={{ minHeight: '400px' }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
        options={{
          mapTypeControl: true,
          zoomControl: true,
          fullscreenControl: true,
          streetViewControl: true
        }}
      >
        {/* Render depot marker */}
        <Marker
          position={{ lat: DEPOT.lat, lng: DEPOT.lng }}
          onClick={() => onMarkerClick(DEPOT)}
          icon={getDepotMarkerIcon()}
          title={DEPOT.location}
          label="D"
        />

        {/* Render bin markers */}
        {binsData.map(bin => (
          <Marker
            key={bin.id}
            position={{ lat: bin.lat, lng: bin.lng }}
            onClick={() => onMarkerClick(bin)}
            icon={getBinMarkerIcon(bin.fillLevel)}
            title={bin.location}
            label={bin.id.toString()}
          />
        ))}
        
        {/* Render the optimized route */}
        <Polyline
          path={getPolylinePath()}
          options={{
            strokeColor: '#2563eb',
            strokeOpacity: 0.8,
            strokeWeight: 4,
            geodesic: true,
          }}
        />
        
        {selectedLocation && (
          <InfoWindow
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            onCloseClick={onInfoWindowClose}
          >
            <div className="p-2">
              <p className="font-semibold">{selectedLocation.location}</p>
              {'fillLevel' in selectedLocation ? (
                <>
                  <p className="text-sm">Fill Level: {selectedLocation.fillLevel}%</p>
                  <p className="text-sm">Type: {selectedLocation.binType}</p>
                  <p className="text-sm">Last Collected: {selectedLocation.lastCollected}</p>
                </>
              ) : (
                <p className="text-sm text-blue-600 font-medium">Depot Location</p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  ) : (
    <div className="w-full h-80 flex items-center justify-center bg-secondary rounded-md">
      <p>Loading Map...</p>
    </div>
  );
};

const RouteDirectionsComponent = ({ optimizedRoute }) => {
  const [directionsData, setDirectionsData] = useState([]);
  const [totalTripDistance, setTotalTripDistance] = useState(0);
  const [totalTripTime, setTotalTripTime] = useState(0);
  
  useEffect(() => {
    if (optimizedRoute.length > 0) {
      const legDetails = generateRouteLegDetails(optimizedRoute, allLocations);
      setDirectionsData(legDetails);
      
      // Calculate total trip distance and time
      const totalDistance = legDetails.reduce((sum, leg) => sum + parseFloat(leg.distance), 0);
      const totalTime = legDetails.reduce((sum, leg) => sum + parseInt(leg.time), 0);
      
      setTotalTripDistance(totalDistance);
      setTotalTripTime(totalTime);
    }
  }, [optimizedRoute]);

  if (!directionsData.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Car className="h-5 w-5 mr-2" />
          Turn-by-Turn Directions
        </CardTitle>
        <CardDescription>
          Total trip distance: {totalTripDistance.toFixed(2)} km | Estimated time: {Math.floor(totalTripTime / 60)}h {totalTripTime % 60}min
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {directionsData.map((leg, index) => (
            <AccordionItem value={`leg-${index}`} key={`leg-${index}`}>
              <AccordionTrigger className="hover:bg-secondary/50 px-4 py-2 rounded-md">
                <div className="flex items-center w-full justify-between pr-4">
                  <div className="flex items-center">
                    <Badge className="mr-2">{index + 1}</Badge>
                    <span>{leg.from} <ArrowRight className="h-4 w-4 inline mx-1" /> {leg.to}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="mr-2">{leg.distance} km</span>
                    <span>{leg.time} min</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="border-l-2 border-secondary ml-4 pl-4">
                <div className="space-y-2 py-2">
                  {leg.directions.map((direction, dirIndex) => (
                    <div key={`dir-${index}-${dirIndex}`} className="flex items-start">
                      <div className="bg-secondary h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-xs font-medium">{dirIndex + 1}</span>
                      </div>
                      <p>{direction}</p>
                    </div>
                  ))}
                  <div className="px-2 py-4 bg-secondary/30 rounded-md mt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Coordinates:</p>
                        <p className="text-xs">From: {leg.fromCoords.lat.toFixed(4)}°N, {leg.fromCoords.lng.toFixed(4)}°E</p>
                        <p className="text-xs">To: {leg.toCoords.lat.toFixed(4)}°N, {leg.toCoords.lng.toFixed(4)}°E</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Distance: {leg.distance} km</p>
                        <p className="text-sm">Est. time: {leg.time} min</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-6 flex justify-between items-center">
          <Button variant="outline" className="w-1/2 sm:w-auto">
            <Map className="h-4 w-4 mr-2" />
            View on Google Maps
          </Button>
          <Button className="w-1/2 sm:w-auto">
            <Navigation className="h-4 w-4 mr-2" />
            Start Navigation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const OptimizedRouteInfo = ({ optimizedRoute }: { optimizedRoute: number[] }) => {
  if (!optimizedRoute.length) return null;
  
  // Calculate total distance using the utility function
  const totalDistance = calculateTotalDistance(optimizedRoute, allLocations);
  
  return (
    <div className="p-4 bg-secondary/50 rounded-lg">
      <h3 className="font-medium mb-2 flex items-center">
        <RouteIcon className="h-4 w-4 mr-2" /> 
        Optimized Route Information
      </h3>
      <div className="text-sm text-muted-foreground mb-2">
        <p>Route starts and ends at the <span className="font-semibold">{DEPOT.location} Depot</span></p>
        <p>Using Travelling Salesman Problem algorithm to find shortest route between bins.</p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {optimizedRoute.map((locationId, index) => {
          const location = allLocations.find(l => l.id === locationId);
          const isDepot = locationId === DEPOT.id;
          
          if (!location) return null;
          
          return (
            <div key={index} className="flex items-center">
              <Badge 
                variant="outline" 
                className={isDepot ? "bg-blue-100" : "bg-eco-100"}
              >
                {location.location}{isDepot ? " (Depot)" : ""}
              </Badge>
              {index < optimizedRoute.length - 1 && (
                <span className="px-1">→</span>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-3 text-sm">
        Total route distance: <span className="font-semibold">{totalDistance.toFixed(2)} km</span>
      </div>
    </div>
  );
};

const DriverDashboard = () => {
  const [activeBin, setActiveBin] = useState<number | null>(null);
  const [activeFeature, setActiveFeature] = useState<string>("map");
  const [optimizedRoute, setOptimizedRoute] = useState<number[]>([]);
  const { toast } = useToast();

  // Calculate optimized route using TSP
  useEffect(() => {
    if (binsData.length > 0) {
      const tour = solveTSP(binsData);
      setOptimizedRoute(tour);
    }
  }, []);

  const handleCollectBin = (binId: number) => {
    toast({
      title: "Bin Marked for Collection",
      description: `Bin #${binId} has been added to your collection route.`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 gap-6 mb-8">
        <h2 className="text-2xl font-bold">Driver Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DashboardSectionCard
            title="Map View"
            shortDescription="View bin locations"
            icon={<MapPin className="text-eco-600" />}
            popoverTitle="Interactive Map View"
            popoverDescription="Access a detailed map showing all bin locations. Get optimized routes to efficiently collect from multiple bins in an area."
            isActive={activeFeature === "map"}
            onClick={() => setActiveFeature("map")}
          />
          <DashboardSectionCard
            title="Route Directions"
            shortDescription="Turn-by-turn navigation"
            icon={<Navigation className="text-eco-600" />}
            popoverTitle="Route Directions"
            popoverDescription="Get detailed turn-by-turn directions for the optimized route between all bins. Includes distance and time estimates."
            isActive={activeFeature === "directions"}
            onClick={() => setActiveFeature("directions")}
          />
          <DashboardSectionCard
            title="Fuel Efficiency"
            shortDescription="Optimize fuel consumption"
            icon={<Car className="text-eco-600" />}
            popoverTitle="Fuel-Efficient Routing"
            popoverDescription="The route is optimized to minimize total distance traveled, helping to reduce fuel consumption and emissions."
            isActive={activeFeature === "fuel"}
            onClick={() => setActiveFeature("fuel")}
          />
        </div>
      </div>

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
                <h3 className="font-medium text-lg">Eric Rene Jhon</h3>
                <p className="text-muted-foreground">Driver ID: ECO-DR-42698</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Route Zone:</span>
                  <span className="font-medium">Chennai Area</span>
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="map">Map View</TabsTrigger>
              <TabsTrigger value="directions">Directions</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="map" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Bin Locations with TSP Route</span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                          <RouteIcon className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 animate-in fade-in-50 zoom-in-95">
                        <div className="space-y-2">
                          <h4 className="font-semibold">Travelling Salesman Route</h4>
                          <p className="text-sm text-muted-foreground">
                            This map shows the optimized route between all bins using the Travelling Salesman Problem algorithm.
                            The blue line represents the shortest path to visit all bins once.
                          </p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </CardTitle>
                  <CardDescription>Optimized collection route based on TSP algorithm</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[16/9] rounded-md border overflow-hidden relative">
                    <GoogleMapComponent />
                  </div>
                  
                  <div className="mt-6">
                    <OptimizedRouteInfo optimizedRoute={optimizedRoute} />
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
            
            <TabsContent value="directions" className="mt-4">
              <RouteDirectionsComponent optimizedRoute={optimizedRoute} />
            </TabsContent>
            
            <TabsContent value="list" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Bins Status</span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                          <Info className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 animate-in fade-in-50 zoom-in-95">
                        <div className="space-y-2">
                          <h4 className="font-semibold">Bin Status List</h4>
                          <p className="text-sm text-muted-foreground">
                            This list shows all bins with their current fill levels, sorted by priority.
                            Click on a bin to see more details or click 'Collect' to add it to your route.
                          </p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </CardTitle>
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
                              <div className="mt-1 text-xs text-muted-foreground">
                                <span>Lat: {bin.lat.toFixed(4)}, Lng: {bin.lng.toFixed(4)}</span>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              variant={bin.fillLevel > 75 ? "default" : "outline"} 
                              className="mt-2 md:mt-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCollectBin(bin.id);
                              }}
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
              <CardTitle className="flex items-center justify-between">
                <span>Fuel-Efficient Route</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <Car className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 animate-in fade-in-50 zoom-in-95">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Fuel Optimization</h4>
                      <p className="text-sm text-muted-foreground">
                        The route is optimized to minimize the total distance traveled, which helps reduce fuel consumption.
                        The TSP algorithm ensures that the driver visits all locations once before returning to the depot.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </CardTitle>
              <CardDescription>Details about fuel efficiency and route optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Car className="h-4 w-4 mr-2" /> 
                    Fuel-Efficient Routing Active
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your route minimizes total distance, helping to reduce fuel consumption and carbon emissions.
                  </p>
                </div>

                {optimizedRoute.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="text-sm font-medium mb-1">Total Route Distance</h4>
                      <p className="text-lg font-medium">
                        {calculateTotalDistance(optimizedRoute, allLocations).toFixed(2)} km
                      </p>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Optimized for minimum distance traveled
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="text-sm font-medium mb-1">Estimated Fuel Savings</h4>
                      <p className="text-lg font-medium text-green-600">
                        {(calculateTotalDistance(optimizedRoute, allLocations) * 0.05).toFixed(2)} liters
                      </p>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Compared to non-optimized route (estimated)
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="text-sm font-medium mb-1">Eco Tips</h4>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Maintain steady speed for better fuel economy</li>
                      <li>• Avoid rapid acceleration and braking</li>
                      <li>• Follow the optimized route sequence</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="text-sm font-medium mb-1">CO₂ Reduction</h4>
                    <p className="text-lg font-medium text-green-600">
                      {(calculateTotalDistance(optimizedRoute, allLocations) * 0.12).toFixed(2)} kg
                    </p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Estimated CO₂ emissions saved with optimal routing
                    </div>
                  </div>
                </div>
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
                          <MapPin className="h-4 w-4 text-eco-600" />
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
