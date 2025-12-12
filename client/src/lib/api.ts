const API_BASE = "/api";

// Auth token management
let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
  if (token) {
    localStorage.setItem("auth_token", token);
  } else {
    localStorage.removeItem("auth_token");
  }
}

export function getAuthToken(): string | null {
  if (!authToken) {
    authToken = localStorage.getItem("auth_token");
  }
  return authToken;
}

// Generic fetch with auth
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Erro desconhecido" }));
    throw new Error(error.message || `HTTP error ${response.status}`);
  }

  return response.json();
}

// ==================== AUTH API ====================

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  email: string;
  name: string;
}

export interface AuthResponse {
  user: { id: string; username: string };
  token: string;
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const data = await fetchWithAuth("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  setAuthToken(data.token);
  return data;
}

export async function register(userData: RegisterData): Promise<AuthResponse> {
  const data = await fetchWithAuth("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
  setAuthToken(data.token);
  return data;
}

export async function getCurrentUser() {
  return fetchWithAuth("/auth/me");
}

export function logout() {
  setAuthToken(null);
}

// ==================== WEATHER API ====================

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

export async function getCurrentWeather(location: string): Promise<WeatherData> {
  return fetchWithAuth(`/weather/current?location=${encodeURIComponent(location)}`);
}

export async function getWeatherForecast(location: string): Promise<ForecastData[]> {
  return fetchWithAuth(`/weather/forecast?location=${encodeURIComponent(location)}`);
}

// ==================== MARKET API ====================

export interface CommodityPrice {
  commodity: string;
  price: number;
  unit: string;
  variation: number;
  source: string;
  lastUpdate: string;
}

export async function getCommodityPrices(): Promise<CommodityPrice[]> {
  return fetchWithAuth("/market/prices");
}

export async function getCommodityPrice(commodity: string): Promise<CommodityPrice> {
  return fetchWithAuth(`/market/prices/${encodeURIComponent(commodity)}`);
}

export async function getHistoricalPrices(commodity: string, days = 30): Promise<{ date: string; price: number }[]> {
  return fetchWithAuth(`/market/history/${encodeURIComponent(commodity)}?days=${days}`);
}

// ==================== CHAT API ====================

export interface ChatContext {
  farmName?: string;
  farmLocation?: string;
  activeCrops?: string[];
  weather?: {
    temp: number;
    condition: string;
    humidity: number;
  };
  marketPrices?: Array<{
    commodity: string;
    price: number;
    variation: number;
  }>;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export async function sendChatMessage(
  message: string,
  context?: ChatContext,
  history?: ChatMessage[]
): Promise<ChatMessage> {
  return fetchWithAuth("/chat", {
    method: "POST",
    body: JSON.stringify({ message, context, history }),
  });
}

// ==================== HEALTH CHECK ====================

export async function getHealthStatus() {
  return fetchWithAuth("/health");
}
