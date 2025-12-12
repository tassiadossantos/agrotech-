import axios from "axios";

export interface CommodityPrice {
  commodity: string;
  price: number;
  unit: string;
  variation: number;
  source: string;
  lastUpdate: string;
}

// Brazilian commodity prices (simulated - in production, use real APIs)
// Real APIs: CEPEA/ESALQ, B3, Agrolink, etc.

const COMMODITY_BASE_PRICES: Record<string, { price: number; unit: string }> = {
  soja: { price: 142.0, unit: "R$/sc" },
  milho: { price: 58.5, unit: "R$/sc" },
  cafe: { price: 1450.0, unit: "R$/sc" },
  algodao: { price: 135.0, unit: "R$/@" },
  trigo: { price: 75.0, unit: "R$/sc" },
  "cana-de-acucar": { price: 145.0, unit: "R$/ton" },
  arroz: { price: 95.0, unit: "R$/sc" },
  feijao: { price: 280.0, unit: "R$/sc" },
  girassol: { price: 85.0, unit: "R$/sc" },
  sorgo: { price: 42.0, unit: "R$/sc" },
};

// Simulates price variation (in production, fetch from real API)
function getVariation(): number {
  return parseFloat((Math.random() * 10 - 5).toFixed(2)); // -5% to +5%
}

export async function getCommodityPrices(): Promise<CommodityPrice[]> {
  // In production, you would call real APIs here:
  // - CEPEA: https://www.cepea.esalq.usp.br/
  // - B3: https://www.b3.com.br/
  // - Agrolink: https://www.agrolink.com.br/cotacoes/
  
  const prices: CommodityPrice[] = [];
  const now = new Date().toISOString();

  for (const [commodity, data] of Object.entries(COMMODITY_BASE_PRICES)) {
    const variation = getVariation();
    const adjustedPrice = data.price * (1 + variation / 100);
    
    prices.push({
      commodity: commodity.charAt(0).toUpperCase() + commodity.slice(1).replace("-", " "),
      price: parseFloat(adjustedPrice.toFixed(2)),
      unit: data.unit,
      variation,
      source: "CEPEA/ESALQ",
      lastUpdate: now,
    });
  }

  return prices;
}

export async function getCommodityPrice(commodity: string): Promise<CommodityPrice | null> {
  const normalizedCommodity = commodity.toLowerCase().replace(" ", "-");
  const baseData = COMMODITY_BASE_PRICES[normalizedCommodity];
  
  if (!baseData) return null;

  const variation = getVariation();
  const adjustedPrice = baseData.price * (1 + variation / 100);

  return {
    commodity: commodity.charAt(0).toUpperCase() + commodity.slice(1),
    price: parseFloat(adjustedPrice.toFixed(2)),
    unit: baseData.unit,
    variation,
    source: "CEPEA/ESALQ",
    lastUpdate: new Date().toISOString(),
  };
}

// Historical prices (mock - in production, fetch from database or API)
export async function getHistoricalPrices(
  commodity: string,
  days: number = 30
): Promise<{ date: string; price: number }[]> {
  const normalizedCommodity = commodity.toLowerCase().replace(" ", "-");
  const baseData = COMMODITY_BASE_PRICES[normalizedCommodity];
  
  if (!baseData) return [];

  const history: { date: string; price: number }[] = [];
  let currentPrice = baseData.price;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Simulate price fluctuation
    const change = (Math.random() - 0.5) * 2; // -1% to +1%
    currentPrice = currentPrice * (1 + change / 100);
    
    history.push({
      date: date.toISOString().split("T")[0],
      price: parseFloat(currentPrice.toFixed(2)),
    });
  }

  return history;
}
