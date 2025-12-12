import axios from "axios";

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  temp: number;
  humidity: number;
  windSpeed: number;
  condition: "sunny" | "cloudy" | "rainy";
  description: string;
  icon: string;
  feelsLike: number;
  pressure: number;
}

export interface ForecastData {
  date: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  condition: "sunny" | "cloudy" | "rainy";
  description: string;
  icon: string;
  rainProbability: number;
}

function mapCondition(weatherId: number): "sunny" | "cloudy" | "rainy" {
  if (weatherId >= 200 && weatherId < 600) return "rainy";
  if (weatherId >= 600 && weatherId < 700) return "rainy"; // snow treated as rainy
  if (weatherId >= 801) return "cloudy";
  return "sunny";
}

export async function getCurrentWeather(lat: number, lon: number): Promise<WeatherData | null> {
  if (!OPENWEATHER_API_KEY) {
    console.warn("⚠️ OpenWeather API key not configured, using mock data");
    return getMockWeather();
  }

  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: OPENWEATHER_API_KEY,
        units: "metric",
        lang: "pt_br",
      },
    });

    const data = response.data;
    return {
      temp: Math.round(data.main.temp),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // m/s to km/h
      condition: mapCondition(data.weather[0].id),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      feelsLike: Math.round(data.main.feels_like),
      pressure: data.main.pressure,
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    return getMockWeather();
  }
}

export async function getForecast(lat: number, lon: number): Promise<ForecastData[]> {
  if (!OPENWEATHER_API_KEY) {
    console.warn("⚠️ OpenWeather API key not configured, using mock data");
    return getMockForecast();
  }

  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: OPENWEATHER_API_KEY,
        units: "metric",
        lang: "pt_br",
        cnt: 40, // 5 days * 8 (3-hour intervals)
      },
    });

    const dailyData: Map<string, any[]> = new Map();
    
    response.data.list.forEach((item: any) => {
      const date = item.dt_txt.split(" ")[0];
      if (!dailyData.has(date)) {
        dailyData.set(date, []);
      }
      dailyData.get(date)!.push(item);
    });

    const forecast: ForecastData[] = [];
    dailyData.forEach((items, date) => {
      const temps = items.map((i) => i.main.temp);
      const humidities = items.map((i) => i.main.humidity);
      const middayItem = items[Math.floor(items.length / 2)];
      
      forecast.push({
        date,
        temp: Math.round(temps.reduce((a, b) => a + b) / temps.length),
        tempMin: Math.round(Math.min(...temps)),
        tempMax: Math.round(Math.max(...temps)),
        humidity: Math.round(humidities.reduce((a, b) => a + b) / humidities.length),
        condition: mapCondition(middayItem.weather[0].id),
        description: middayItem.weather[0].description,
        icon: middayItem.weather[0].icon,
        rainProbability: Math.round((middayItem.pop || 0) * 100),
      });
    });

    return forecast.slice(0, 5);
  } catch (error) {
    console.error("Error fetching forecast:", error);
    return getMockForecast();
  }
}

// Mock data for development without API key
function getMockWeather(): WeatherData {
  return {
    temp: 28,
    humidity: 65,
    windSpeed: 12,
    condition: "sunny",
    description: "céu limpo",
    icon: "01d",
    feelsLike: 30,
    pressure: 1015,
  };
}

function getMockForecast(): ForecastData[] {
  const conditions: ("sunny" | "cloudy" | "rainy")[] = ["sunny", "cloudy", "rainy", "sunny", "cloudy"];
  const forecast: ForecastData[] = [];
  
  for (let i = 0; i < 5; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    forecast.push({
      date: date.toISOString().split("T")[0],
      temp: 25 + Math.floor(Math.random() * 10),
      tempMin: 20 + Math.floor(Math.random() * 5),
      tempMax: 30 + Math.floor(Math.random() * 5),
      humidity: 50 + Math.floor(Math.random() * 40),
      condition: conditions[i],
      description: conditions[i] === "sunny" ? "céu limpo" : conditions[i] === "cloudy" ? "nublado" : "chuva",
      icon: conditions[i] === "sunny" ? "01d" : conditions[i] === "cloudy" ? "03d" : "10d",
      rainProbability: conditions[i] === "rainy" ? 75 : conditions[i] === "cloudy" ? 30 : 10,
    });
  }
  
  return forecast;
}

// Weather for Brazilian cities (coordinates)
export const CITY_COORDINATES: Record<string, { lat: number; lon: number }> = {
  "Sorriso, MT": { lat: -12.5463, lon: -55.7114 },
  "Rio Verde, GO": { lat: -17.7928, lon: -50.9194 },
  "Cascavel, PR": { lat: -24.9578, lon: -53.4595 },
  "Luís Eduardo Magalhães, BA": { lat: -12.0966, lon: -45.7871 },
  "Patrocínio, MG": { lat: -18.9438, lon: -46.9936 },
  "Dourados, MS": { lat: -22.2231, lon: -54.8118 },
  "Ribeirão Preto, SP": { lat: -21.1783, lon: -47.8067 },
  "Pedro Afonso, TO": { lat: -8.9697, lon: -48.1753 },
  "Passo Fundo, RS": { lat: -28.2576, lon: -52.4091 },
};
