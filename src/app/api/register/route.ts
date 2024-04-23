import db from "@/db/db";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type registerhProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export async function POST(req: Request) {
  const { name, email, confirmPassword, password }: registerhProps =
    await req.json();
  // Check if passwords match
  if (password !== confirmPassword) {
    return new NextResponse(
      JSON.stringify({ error: "Password doesn't match" }),
      { status: 400 }
    );
  }

  try {
    // Check if the email is already registered
    const existingUser = await db.auth.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ error: "Email is already registered" }),
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user and authentication records
    const user = await db.user.create({
      data: {
        createdAt: new Date(),
        Profile: {
          create: {
            name: name,
          },
        },
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
      { expiresIn: "24h" } // Token expiration time
    );

    // Return JWT token
    return new NextResponse(JSON.stringify({ token }), { status: 201 });
  } catch (error) {
    console.log({ error });
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
