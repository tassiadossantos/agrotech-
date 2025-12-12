import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ==================== USERS ====================
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("user"), // admin, user, viewer
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// ==================== FARMS ====================
export const farms = pgTable("farms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  city: text("city"),
  state: text("state"),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  size: integer("size").notNull(), // hectares
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertFarmSchema = createInsertSchema(farms).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertFarm = z.infer<typeof insertFarmSchema>;
export type Farm = typeof farms.$inferSelect;

// ==================== CROPS ====================
export const crops = pgTable("crops", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  farmId: varchar("farm_id").references(() => farms.id).notNull(),
  name: text("name").notNull(), // Soja, Milho, Café, etc.
  type: text("type").notNull(), // summer, winter, perennial
  progress: integer("progress").default(0), // 0-100%
  plantedDate: timestamp("planted_date"),
  expectedHarvestDate: timestamp("expected_harvest_date"),
  harvestedDate: timestamp("harvested_date"),
  status: text("status").notNull().default("planning"), // planning, growing, harvesting, completed
  areaHectares: integer("area_hectares"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCropSchema = createInsertSchema(crops).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertCrop = z.infer<typeof insertCropSchema>;
export type Crop = typeof crops.$inferSelect;

// ==================== MACHINERY ====================
export const machinery = pgTable("machinery", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  farmId: varchar("farm_id").references(() => farms.id).notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(), // tractor, harvester, sprayer, truck
  brand: text("brand"),
  model: text("model"),
  year: integer("year"),
  status: text("status").notNull().default("idle"), // working, maintenance, idle
  fuelLevel: integer("fuel_level").default(100), // 0-100%
  hoursUsed: integer("hours_used").default(0),
  lastMaintenanceDate: timestamp("last_maintenance_date"),
  nextMaintenanceDate: timestamp("next_maintenance_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertMachinerySchema = createInsertSchema(machinery).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertMachinery = z.infer<typeof insertMachinerySchema>;
export type Machinery = typeof machinery.$inferSelect;

// ==================== FINANCE ====================
export const finances = pgTable("finances", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  farmId: varchar("farm_id").references(() => farms.id).notNull(),
  type: text("type").notNull(), // revenue, expense
  category: text("category").notNull(), // vendas, insumos, maquinário, mão-de-obra, etc
  description: text("description"),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  date: timestamp("date").defaultNow().notNull(),
  cropId: varchar("crop_id").references(() => crops.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertFinanceSchema = createInsertSchema(finances).omit({
  id: true,
  createdAt: true,
});

export type InsertFinance = z.infer<typeof insertFinanceSchema>;
export type Finance = typeof finances.$inferSelect;

// ==================== WEATHER CACHE ====================
export const weatherCache = pgTable("weather_cache", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  farmId: varchar("farm_id").references(() => farms.id).notNull(),
  data: jsonb("data").notNull(),
  fetchedAt: timestamp("fetched_at").defaultNow().notNull(),
});

// ==================== CHAT HISTORY ====================
export const chatHistory = pgTable("chat_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  farmId: varchar("farm_id").references(() => farms.id),
  role: text("role").notNull(), // user, assistant
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertChatSchema = createInsertSchema(chatHistory).omit({
  id: true,
  createdAt: true,
});

export type InsertChat = z.infer<typeof insertChatSchema>;
export type ChatMessage = typeof chatHistory.$inferSelect;

// ==================== MARKET PRICES ====================
export const marketPrices = pgTable("market_prices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  commodity: text("commodity").notNull(), // soja, milho, café, etc
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  unit: text("unit").notNull().default("R$/sc"), // R$/sc, R$/kg, etc
  variation: decimal("variation", { precision: 5, scale: 2 }), // % variation
  source: text("source"), // B3, CBOT, etc
  fetchedAt: timestamp("fetched_at").defaultNow().notNull(),
});
