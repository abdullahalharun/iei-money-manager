import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../lib/errors";
import type { SignupInput, LoginInput } from "./auth.validation";

const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-production";
const JWT_EXPIRES_IN = "7d";

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string | null;
    tenantId: string;
  };
}

export class AuthService {
  async signup(input: SignupInput): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: input.email }
    });

    if (existingUser) {
      throw new AppError(400, "Email already registered", "EMAIL_EXISTS");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(input.password, 10);

    // Find or create tenant
    let tenant = await prisma.tenant.findFirst({
      where: { name: input.email.split("@")[0] }
    });

    if (!tenant) {
      tenant = await prisma.tenant.create({
        data: { name: input.email.split("@")[0] }
      });
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
        name: input.name,
        tenantId: tenant.id
      }
    });

    // Generate token
    const token = this.generateToken(user.id, user.tenantId);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        tenantId: user.tenantId
      }
    };
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: input.email }
    });

    if (!user) {
      throw new AppError(401, "Invalid email or password", "INVALID_CREDENTIALS");
    }

    // Verify password
    const isValid = await bcrypt.compare(input.password, user.password);
    if (!isValid) {
      throw new AppError(401, "Invalid email or password", "INVALID_CREDENTIALS");
    }

    // Generate token
    const token = this.generateToken(user.id, user.tenantId);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        tenantId: user.tenantId
      }
    };
  }

  generateToken(userId: string, tenantId: string): string {
    return jwt.sign({ userId, tenantId }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });
  }

  async getUserById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        tenantId: true
      }
    });
  }
}

export const authService = new AuthService();

