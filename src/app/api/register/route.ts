import db from "@/db/db";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type registerhProps = {
  email: string;
  password: string;
  confirmPassword: string;
};

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { email, confirmPassword, password }: registerhProps = req.body;
  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Password doesn't match" });
  }

  try {
    // Check if the email is already registered
    const existingUser = await db.auth.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user and authentication records
    const user = await db.user.create({
      data: {
        createdAt: new Date(),
        Auth: {
          create: {
            createdAt: new Date(),
            email: email,
            password: hashedPassword,
          },
        },
      },
      include: {
        Auth: true,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" } // Token expiration time
    );

    // Return JWT token
    return res.status(200).json({ token });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Internal server error" });
  }
}
