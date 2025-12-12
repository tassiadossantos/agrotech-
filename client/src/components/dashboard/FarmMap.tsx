import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map as MapIcon, Maximize2 } from 'lucide-react';
import { useAppStore } from "@/lib/store";
import { FARMS_DATA } from "@/lib/mock-data";
import L from 'leaflet';
import { Button } from '@/components/ui/button';

// Fix Leaflet marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Mock coordinates for Brazil farms (approximate)
const FARM_COORDS: Record<string, [number, number]> = {
  '1': [-12.542, -55.717], // Sorriso, MT
  '2': [-17.791, -50.919], // Rio Verde, GO
  '3': [-24.957, -53.459], // Cascavel, PR
  '4': [-12.096, -45.792], // LEM, BA
  '5': [-18.943, -46.993], // Patrocínio, MG
  '6': [-22.221, -54.806], // Dourados, MS
  '7': [-21.170, -47.810], // Ribeirão Preto, SP
  '8': [-8.966, -48.173], // Pedro Afonso, TO
  '9': [-28.262, -52.408], // Passo Fundo, RS
};

export function FarmMap() {
  const { selectedFarmId } = useAppStore();
  const selectedFarm = FARMS_DATA.find(f => f.id === selectedFarmId) || FARMS_DATA[0];
  const center = FARM_COORDS[selectedFarmId] || FARM_COORDS['1'];

  // Mock polygon for the farm field
  const fieldPolygon = [
    [center[0] + 0.005, center[1] - 0.005],
    [center[0] + 0.005, center[1] + 0.005],
    [center[0] - 0.005, center[1] + 0.005],
    [center[0] - 0.005, center[1] - 0.008],
  ];

  return (
    <Card className="h-full border-border overflow-hidden relative group">
      <CardHeader className="absolute top-0 left-0 right-0 z-[400] bg-gradient-to-b from-black/60 to-transparent p-4 flex flex-row items-center justify-between pb-10 pointer-events-none">
        <CardTitle className="text-sm font-medium text-white font-outfit uppercase tracking-wider flex items-center gap-2">
          <MapIcon className="h-4 w-4" />
          Monitoramento Satelital
        </CardTitle>
        <Button variant="secondary" size="icon" className="h-8 w-8 bg-white/20 hover:bg-white/40 border-none backdrop-blur-md pointer-events-auto">
          <Maximize2 className="h-4 w-4 text-white" />
        </Button>
      </CardHeader>
      <CardContent className="p-0 h-full">
        <MapContainer 
          key={selectedFarmId} // Force re-render on farm change
          center={center} 
          zoom={13} 
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
          <Marker position={center}>
            <Popup>
              <div className="font-outfit">
                <h3 className="font-bold">{selectedFarm.name}</h3>
                <p className="text-sm">{selectedFarm.size} hectares</p>
                <div className="mt-2 text-xs font-mono bg-green-100 text-green-800 px-2 py-1 rounded w-fit">
                   Status: {selectedFarm.activeCrops.length} culturas ativas
                </div>
              </div>
            </Popup>
          </Marker>
          <Polygon 
            positions={fieldPolygon as [number, number][]} 
            pathOptions={{ color: 'yellow', fillColor: 'yellow', fillOpacity: 0.2, weight: 2, dashArray: '5, 5' }} 
          />
        </MapContainer>
        
        <div className="absolute bottom-4 left-4 z-[400] bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/10 text-white max-w-[200px]">
           <p className="text-xs font-mono mb-1 text-white/70">NDVI Médio</p>
           <div className="flex items-center gap-2">
             <span className="text-2xl font-bold font-outfit text-green-400">0.72</span>
             <span className="text-xs bg-green-500/20 text-green-300 px-1.5 rounded">Saudável</span>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
