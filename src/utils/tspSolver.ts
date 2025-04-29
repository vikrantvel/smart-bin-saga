
/**
 * Travelling Salesman Problem (TSP) solver using a greedy nearest neighbor approach
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

// TSP solver using greedy nearest neighbor algorithm
export const solveTSP = (bins: { id: number; lat: number; lng: number }[]): number[] => {
  if (bins.length <= 1) return bins.map(bin => bin.id);
  
  const visited: boolean[] = Array(bins.length).fill(false);
  const tour: number[] = [];
  
  // Start with the first bin
  let currentBinIndex = 0;
  tour.push(bins[currentBinIndex].id);
  visited[currentBinIndex] = true;
  
  // Find nearest neighbor until all bins are visited
  while (tour.length < bins.length) {
    let nearestBinIndex = -1;
    let shortestDistance = Infinity;
    
    for (let i = 0; i < bins.length; i++) {
      if (!visited[i]) {
        const distance = calculateDistance(
          bins[currentBinIndex].lat, bins[currentBinIndex].lng,
          bins[i].lat, bins[i].lng
        );
        
        if (distance < shortestDistance) {
          shortestDistance = distance;
          nearestBinIndex = i;
        }
      }
    }
    
    if (nearestBinIndex !== -1) {
      currentBinIndex = nearestBinIndex;
      tour.push(bins[currentBinIndex].id);
      visited[currentBinIndex] = true;
    }
  }
  
  return tour;
};
