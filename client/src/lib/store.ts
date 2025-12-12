import { create } from 'zustand';

export interface Crop {
  id: string;
  name: string;
  type: 'summer' | 'winter' | 'perennial';
  progress: number;
  plantedDate: string;
  harvestEstimate: string;
  status: 'planning' | 'growing' | 'harvesting' | 'completed';
}

export interface Farm {
  id: string;
  name: string;
  location: string;
  size: number; // hectares
  weather: {
    temp: number;
    humidity: number;
    windSpeed: number;
    condition: 'sunny' | 'cloudy' | 'rainy';
    forecast: 'sunny' | 'cloudy' | 'rainy';
  };
  finance: {
    revenue: number;
    cost: number;
    roi: number;
  };
  activeCrops: Crop[];
}

interface AppState {
  selectedFarmId: string;
  setSelectedFarmId: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedFarmId: '1',
  setSelectedFarmId: (id) => set({ selectedFarmId: id }),
}));
