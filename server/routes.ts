import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  authMiddleware, 
  optionalAuthMiddleware, 
  generateToken, 
  hashPassword, 
  comparePassword,
  type AuthRequest 
} from "./middleware/auth";
import { getCurrentWeather, getForecast, CITY_COORDINATES } from "./services/weather";
import { getCommodityPrices, getCommodityPrice, getHistoricalPrices } from "./services/market";
import { generateChatResponse, type ChatContext } from "./services/ai";
import { loginSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // ==================== AUTH ROUTES ====================
  
  // Register new user
  app.post("/api/auth/register", async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(data.username);
      if (existingUser) {
        return res.status(400).json({ message: "Usuário já existe" });
      }

      // Hash password and create user
      const hashedPassword = await hashPassword(data.password);
      const user = await storage.createUser({
        ...data,
        password: hashedPassword,
      });

      // Generate token
      const token = generateToken({
        userId: user.id,
        username: user.username,
        role: "user",
      });

      res.status(201).json({
        user: { id: user.id, username: user.username },
        token,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      }
      console.error("Register error:", error);
      res.status(500).json({ message: "Erro ao registrar usuário" });
    }
  });

  // Login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const token = generateToken({
        userId: user.id,
        username: user.username,
        role: "user",
      });

      res.json({
        user: { id: user.id, username: user.username },
        token,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      }
      console.error("Login error:", error);
      res.status(500).json({ message: "Erro ao fazer login" });
    }
  });

  // Get current user
  app.get("/api/auth/me", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const user = await storage.getUser(req.user!.userId);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.json({ id: user.id, username: user.username });
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuário" });
    }
  });

  // ==================== WEATHER ROUTES ====================

  // Get current weather for a location
  app.get("/api/weather/current", async (req, res) => {
    try {
      const { location } = req.query;
      
      if (!location || typeof location !== "string") {
        return res.status(400).json({ message: "Localização é obrigatória" });
      }

      const coords = CITY_COORDINATES[location];
      if (!coords) {
        // Default to Sorriso, MT if location not found
        const defaultCoords = CITY_COORDINATES["Sorriso, MT"];
        const weather = await getCurrentWeather(defaultCoords.lat, defaultCoords.lon);
        return res.json(weather);
      }

      const weather = await getCurrentWeather(coords.lat, coords.lon);
      res.json(weather);
    } catch (error) {
      console.error("Weather error:", error);
      res.status(500).json({ message: "Erro ao buscar clima" });
    }
  });

  // Get weather forecast
  app.get("/api/weather/forecast", async (req, res) => {
    try {
      const { location } = req.query;
      
      const coords = location && typeof location === "string" 
        ? CITY_COORDINATES[location] || CITY_COORDINATES["Sorriso, MT"]
        : CITY_COORDINATES["Sorriso, MT"];

      const forecast = await getForecast(coords.lat, coords.lon);
      res.json(forecast);
    } catch (error) {
      console.error("Forecast error:", error);
      res.status(500).json({ message: "Erro ao buscar previsão" });
    }
  });

  // ==================== MARKET ROUTES ====================

  // Get all commodity prices
  app.get("/api/market/prices", async (req, res) => {
    try {
      const prices = await getCommodityPrices();
      res.json(prices);
    } catch (error) {
      console.error("Market prices error:", error);
      res.status(500).json({ message: "Erro ao buscar cotações" });
    }
  });

  // Get single commodity price
  app.get("/api/market/prices/:commodity", async (req, res) => {
    try {
      const { commodity } = req.params;
      const price = await getCommodityPrice(commodity);
      
      if (!price) {
        return res.status(404).json({ message: "Commodity não encontrada" });
      }
      
      res.json(price);
    } catch (error) {
      console.error("Commodity price error:", error);
      res.status(500).json({ message: "Erro ao buscar cotação" });
    }
  });

  // Get historical prices
  app.get("/api/market/history/:commodity", async (req, res) => {
    try {
      const { commodity } = req.params;
      const days = parseInt(req.query.days as string) || 30;
      
      const history = await getHistoricalPrices(commodity, days);
      
      if (!history.length) {
        return res.status(404).json({ message: "Commodity não encontrada" });
      }
      
      res.json(history);
    } catch (error) {
      console.error("Historical prices error:", error);
      res.status(500).json({ message: "Erro ao buscar histórico" });
    }
  });

  // ==================== AI CHAT ROUTES ====================

  // Chat with AgroGPT
  app.post("/api/chat", optionalAuthMiddleware, async (req: AuthRequest, res) => {
    try {
      const { message, context, history } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ message: "Mensagem é obrigatória" });
      }

      const chatContext: ChatContext | undefined = context;
      const chatHistory = Array.isArray(history) ? history : [];

      const response = await generateChatResponse(message, chatContext, chatHistory);

      res.json({ 
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ message: "Erro ao processar mensagem" });
    }
  });

  // ==================== FARMS ROUTES (Mock for now) ====================

  // Get all farms
  app.get("/api/farms", optionalAuthMiddleware, async (req, res) => {
    // Returns mock data for now - in production, fetch from database
    res.json({ message: "Use client-side mock data for now" });
  });

  // ==================== HEALTH CHECK ====================
  
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      services: {
        api: true,
        database: !!process.env.DATABASE_URL,
        weather: !!process.env.OPENWEATHER_API_KEY,
        ai: !!process.env.OPENAI_API_KEY,
      }
    });
  });

  return httpServer;
}
