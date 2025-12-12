import { describe, it, expect } from "vitest";
import { 
  getCommodityPrices, 
  getCommodityPrice, 
  getHistoricalPrices 
} from "../server/services/market";

describe("Market Service", () => {
  describe("getCommodityPrices", () => {
    it("should return all commodity prices", async () => {
      const prices = await getCommodityPrices();
      
      expect(prices).toBeInstanceOf(Array);
      expect(prices.length).toBeGreaterThan(0);
      
      prices.forEach(price => {
        expect(price).toHaveProperty("commodity");
        expect(price).toHaveProperty("price");
        expect(price).toHaveProperty("unit");
        expect(price).toHaveProperty("variation");
        expect(price).toHaveProperty("source");
      });
    });

    it("should include major Brazilian commodities", async () => {
      const prices = await getCommodityPrices();
      const commodities = prices.map(p => p.commodity.toLowerCase());
      
      expect(commodities).toContain("soja");
      expect(commodities).toContain("milho");
      expect(commodities).toContain("cafe"); // without accent
    });
  });

  describe("getCommodityPrice", () => {
    it("should return price for a valid commodity", async () => {
      const price = await getCommodityPrice("soja");
      
      expect(price).not.toBeNull();
      expect(price?.commodity.toLowerCase()).toBe("soja");
      expect(price?.price).toBeGreaterThan(0);
    });

    it("should return null for invalid commodity", async () => {
      const price = await getCommodityPrice("invalid-commodity");
      expect(price).toBeNull();
    });
  });

  describe("getHistoricalPrices", () => {
    it("should return historical prices for a commodity", async () => {
      const history = await getHistoricalPrices("soja", 30);
      
      expect(history).toBeInstanceOf(Array);
      expect(history.length).toBe(31); // 30 days + today
      
      history.forEach(item => {
        expect(item).toHaveProperty("date");
        expect(item).toHaveProperty("price");
        expect(item.price).toBeGreaterThan(0);
      });
    });

    it("should return empty array for invalid commodity", async () => {
      const history = await getHistoricalPrices("invalid");
      expect(history).toEqual([]);
    });
  });
});
