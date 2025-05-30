
/**
 * Travelling Salesman Problem (TSP) solver using a greedy nearest neighbor approach
 * with a fixed depot as start and end location
 */

// Calculate distance between two points using the Haversine formula (for geographic coordinates)
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI/180);
};

// Convert DMS (degrees, minutes, seconds) to decimal degrees
export const dmsToDecimal = (degrees: number, minutes: number, seconds: number, direction: string): number => {
  let decimal = degrees + minutes/60 + seconds/3600;
  if (direction === "S" || direction === "W") {
    decimal = -decimal;
  }
  return decimal;
};

// Depot location - Tambaram
export const DEPOT = {
  id: 0,
  location: 'Tambaram',
  lat: 12.9249,
  lng: 80.1000
};

// TSP solver using greedy nearest neighbor algorithm with fixed start/end at depot
export const solveTSP = (bins: { id: number; lat: number; lng: number }[]): number[] => {
  if (bins.length === 0) return [DEPOT.id];
  if (bins.length === 1) return [DEPOT.id, bins[0].id, DEPOT.id];
  
  // Create a combined array with depot and bins
  const allLocations = [DEPOT, ...bins];
  const n = allLocations.length;
  
  const visited: boolean[] = Array(n).fill(false);
  const tour: number[] = [];
  
  // Start with depot (index 0)
  let currentLocationIndex = 0;
  tour.push(allLocations[currentLocationIndex].id);
  visited[currentLocationIndex] = true;
  
  // Find nearest unvisited location until all locations are visited
  while (tour.length < n) {
    let nearestLocationIndex = -1;
    let shortestDistance = Infinity;
    
    for (let i = 0; i < n; i++) {
      if (!visited[i]) {
        const distance = calculateDistance(
          allLocations[currentLocationIndex].lat, allLocations[currentLocationIndex].lng,
          allLocations[i].lat, allLocations[i].lng
        );
        
        if (distance < shortestDistance) {
          shortestDistance = distance;
          nearestLocationIndex = i;
        }
      }
    }
    
    if (nearestLocationIndex !== -1) {
      currentLocationIndex = nearestLocationIndex;
      tour.push(allLocations[currentLocationIndex].id);
      visited[currentLocationIndex] = true;
    }
  }
  
  // Add depot as the final location to return to
  tour.push(DEPOT.id);
  
  return tour;
};

// Calculate the total distance of a tour
export const calculateTotalDistance = (
  tour: number[], 
  locations: { id: number; lat: number; lng: number }[]
): number => {
  let totalDistance = 0;
  
  for (let i = 0; i < tour.length - 1; i++) {
    const currentId = tour[i];
    const nextId = tour[i + 1];
    
    const currentLocation = locations.find(loc => loc.id === currentId);
    const nextLocation = locations.find(loc => loc.id === nextId);
    
    if (currentLocation && nextLocation) {
      const distance = calculateDistance(
        currentLocation.lat, currentLocation.lng,
        nextLocation.lat, nextLocation.lng
      );
      totalDistance += distance;
    }
  }
  
  return totalDistance;
};

// Get basic driving directions between two points based on cardinal directions
export const getBasicDirections = (from: { lat: number; lng: number; location: string }, to: { lat: number; lng: number; location: string }): string[] => {
  const directions: string[] = [];
  
  // Calculate the overall direction
  const latDiff = to.lat - from.lat;
  const lngDiff = to.lng - from.lng;
  
  // Get direction string
  let latDirection = latDiff > 0 ? "north" : "south";
  let lngDirection = lngDiff > 0 ? "east" : "west";
  
  // Starting instruction
  directions.push(`Start from ${from.location}.`);
  
  // Main travel direction
  directions.push(`Head ${latDirection}${lngDiff !== 0 ? "-" + lngDirection : ""} towards ${to.location}.`);
  
  // Distance calculation
  const distance = calculateDistance(from.lat, from.lng, to.lat, to.lng);
  directions.push(`Continue for approximately ${distance.toFixed(2)} km.`);
  
  // Arrival instruction
  directions.push(`Arrive at ${to.location}.`);
  
  return directions;
};

// Generate route legs with locations, distances, and estimated times
export const generateRouteLegDetails = (tour: number[], allLocations: { id: number; lat: number; lng: number; location: string }[]) => {
  if (tour.length <= 1) return [];
  
  const legs = [];
  
  for (let i = 0; i < tour.length - 1; i++) {
    const currentLocationId = tour[i];
    const nextLocationId = tour[i + 1];
    
    const currentLocation = allLocations.find(loc => loc.id === currentLocationId);
    const nextLocation = allLocations.find(loc => loc.id === nextLocationId);
    
    if (currentLocation && nextLocation) {
      const distance = calculateDistance(
        currentLocation.lat, currentLocation.lng, 
        nextLocation.lat, nextLocation.lng
      );
      
      // Assuming an average speed of 40 km/h in urban areas
      const timeMinutes = (distance / 40) * 60;
      
      legs.push({
        from: currentLocation.location,
        to: nextLocation.location,
        fromCoords: { lat: currentLocation.lat, lng: currentLocation.lng },
        toCoords: { lat: nextLocation.lat, lng: nextLocation.lng },
        distance: distance.toFixed(2),
        time: timeMinutes.toFixed(0),
        directions: getBasicDirections(currentLocation, nextLocation)
      });
    }
  }
  
  return legs;
};
