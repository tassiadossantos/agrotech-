import { describe, it, expect } from "vitest";
import { 
  hashPassword, 
  comparePassword, 
  generateToken, 
  verifyToken 
} from "../server/middleware/auth";

describe("Auth Middleware", () => {
  describe("Password Hashing", () => {
    it("should hash a password", async () => {
      const password = "mySecurePassword123";
      const hash = await hashPassword(password);
      
      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);
      expect(hash.length).toBeGreaterThan(0);
    });

    it("should verify a correct password", async () => {
      const password = "mySecurePassword123";
      const hash = await hashPassword(password);
      
      const isValid = await comparePassword(password, hash);
      expect(isValid).toBe(true);
    });

    it("should reject an incorrect password", async () => {
      const password = "mySecurePassword123";
      const hash = await hashPassword(password);
      
      const isValid = await comparePassword("wrongPassword", hash);
      expect(isValid).toBe(false);
    });
  });

  describe("JWT Tokens", () => {
    it("should generate a valid token", () => {
      const payload = {
        userId: "123",
        username: "testuser",
        role: "user",
      };
      
      const token = generateToken(payload);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
      expect(token.split(".").length).toBe(3); // JWT has 3 parts
    });

    it("should verify a valid token", () => {
      const payload = {
        userId: "123",
        username: "testuser",
        role: "user",
      };
      
      const token = generateToken(payload);
      const decoded = verifyToken(token);
      
      expect(decoded).not.toBeNull();
      expect(decoded?.userId).toBe(payload.userId);
      expect(decoded?.username).toBe(payload.username);
      expect(decoded?.role).toBe(payload.role);
    });

    it("should return null for invalid token", () => {
      const decoded = verifyToken("invalid.token.here");
      expect(decoded).toBeNull();
    });
  });
});
