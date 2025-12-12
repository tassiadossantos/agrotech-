import { Farm } from './store';

export const CROPS_LIST = [
  "Soja", "Milho", "Café", "Algodão", "Trigo", 
  "Cana-de-açúcar", "Arroz", "Feijão", "Girassol", "Sorgo"
];

export const FARMS_DATA: Farm[] = [
  {
    id: '1',
    name: 'Fazenda Boa Vista',
    location: 'Sorriso, MT',
    size: 2500,
    weather: { temp: 32, humidity: 75, windSpeed: 12, condition: 'sunny', forecast: 'rainy' },
    finance: { revenue: 4250000, cost: 2473000, roi: 41.8 },
    activeCrops: [
      { id: 'c1', name: 'Soja', type: 'summer', progress: 82, plantedDate: 'Out 2024', harvestEstimate: '23 dias', status: 'growing' },
      { id: 'c2', name: 'Milho', type: 'winter', progress: 15, plantedDate: 'Set 2025', harvestEstimate: '120 dias', status: 'planning' }
    ]
  },
  {
    id: '2',
    name: 'Fazenda Santa Helena',
    location: 'Rio Verde, GO',
    size: 1800,
    weather: { temp: 29, humidity: 60, windSpeed: 15, condition: 'cloudy', forecast: 'sunny' },
    finance: { revenue: 3100000, cost: 1800000, roi: 38.5 },
    activeCrops: [
      { id: 'c3', name: 'Milho', type: 'winter', progress: 45, plantedDate: 'Fev 2025', harvestEstimate: '60 dias', status: 'growing' },
      { id: 'c4', name: 'Sorgo', type: 'winter', progress: 30, plantedDate: 'Mar 2025', harvestEstimate: '75 dias', status: 'growing' }
    ]
  },
  {
    id: '3',
    name: 'Fazenda Primavera',
    location: 'Cascavel, PR',
    size: 950,
    weather: { temp: 24, humidity: 80, windSpeed: 8, condition: 'rainy', forecast: 'cloudy' },
    finance: { revenue: 1500000, cost: 900000, roi: 45.2 },
    activeCrops: [
      { id: 'c5', name: 'Trigo', type: 'winter', progress: 90, plantedDate: 'Mai 2025', harvestEstimate: '10 dias', status: 'harvesting' },
      { id: 'c6', name: 'Feijão', type: 'summer', progress: 10, plantedDate: 'Set 2025', harvestEstimate: '85 dias', status: 'planning' }
    ]
  },
  {
    id: '4',
    name: 'Fazenda Rio Verde',
    location: 'Luís Eduardo Magalhães, BA',
    size: 5000,
    weather: { temp: 35, humidity: 45, windSpeed: 20, condition: 'sunny', forecast: 'sunny' },
    finance: { revenue: 8900000, cost: 5200000, roi: 42.1 },
    activeCrops: [
      { id: 'c7', name: 'Algodão', type: 'summer', progress: 60, plantedDate: 'Dez 2024', harvestEstimate: '50 dias', status: 'growing' },
      { id: 'c8', name: 'Soja', type: 'summer', progress: 95, plantedDate: 'Out 2024', harvestEstimate: '5 dias', status: 'harvesting' }
    ]
  },
  {
    id: '5',
    name: 'Estância Ouro Branco',
    location: 'Patrocínio, MG',
    size: 600,
    weather: { temp: 26, humidity: 65, windSpeed: 10, condition: 'cloudy', forecast: 'rainy' },
    finance: { revenue: 1200000, cost: 600000, roi: 50.5 },
    activeCrops: [
      { id: 'c9', name: 'Café', type: 'perennial', progress: 70, plantedDate: 'N/A', harvestEstimate: 'Mai 2026', status: 'growing' }
    ]
  },
  {
    id: '6',
    name: 'Fazenda Esperança',
    location: 'Dourados, MS',
    size: 3200,
    weather: { temp: 31, humidity: 70, windSpeed: 14, condition: 'sunny', forecast: 'cloudy' },
    finance: { revenue: 5400000, cost: 3100000, roi: 39.8 },
    activeCrops: [
      { id: 'c10', name: 'Cana-de-açúcar', type: 'perennial', progress: 40, plantedDate: 'N/A', harvestEstimate: 'Ago 2026', status: 'growing' },
      { id: 'c11', name: 'Milho', type: 'winter', progress: 20, plantedDate: 'Jan 2025', harvestEstimate: '100 dias', status: 'growing' }
    ]
  },
  {
    id: '7',
    name: 'Agropecuária Vale do Sol',
    location: 'Ribeirão Preto, SP',
    size: 1500,
    weather: { temp: 28, humidity: 68, windSpeed: 9, condition: 'sunny', forecast: 'sunny' },
    finance: { revenue: 2800000, cost: 1500000, roi: 46.6 },
    activeCrops: [
      { id: 'c12', name: 'Cana-de-açúcar', type: 'perennial', progress: 85, plantedDate: 'N/A', harvestEstimate: '30 dias', status: 'harvesting' },
      { id: 'c13', name: 'Girassol', type: 'summer', progress: 50, plantedDate: 'Nov 2024', harvestEstimate: '45 dias', status: 'growing' }
    ]
  },
  {
    id: '8',
    name: 'Fazenda Nova Aurora',
    location: 'Pedro Afonso, TO',
    size: 4100,
    weather: { temp: 34, humidity: 85, windSpeed: 11, condition: 'rainy', forecast: 'rainy' },
    finance: { revenue: 6200000, cost: 4000000, roi: 35.5 },
    activeCrops: [
      { id: 'c14', name: 'Soja', type: 'summer', progress: 75, plantedDate: 'Nov 2024', harvestEstimate: '35 dias', status: 'growing' },
      { id: 'c15', name: 'Arroz', type: 'summer', progress: 65, plantedDate: 'Dez 2024', harvestEstimate: '55 dias', status: 'growing' }
    ]
  },
  {
    id: '9',
    name: 'Fazenda Terra Prometida',
    location: 'Passo Fundo, RS',
    size: 800,
    weather: { temp: 22, humidity: 78, windSpeed: 16, condition: 'cloudy', forecast: 'rainy' },
    finance: { revenue: 1100000, cost: 750000, roi: 31.8 },
    activeCrops: [
      { id: 'c16', name: 'Trigo', type: 'winter', progress: 95, plantedDate: 'Mai 2025', harvestEstimate: '5 dias', status: 'harvesting' },
      { id: 'c17', name: 'Soja', type: 'summer', progress: 5, plantedDate: 'Out 2025', harvestEstimate: '130 dias', status: 'planning' }
    ]
  }
];
