import db from "@/db/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

type loginProps = {
  email: string;
  password: string;
  confirmPassword: string;
};

export async function POST(req: Request) {
  try {
    const { email, password }: loginProps = await req.json();

    // Find the user by email
    const auth = await db.auth.findUnique({
      where: {
        email: email,
      },
    });

    // Check if user exists and password is correct
    if (
      !auth ||
      !auth.userId ||
      !(await bcrypt.compare(password, auth.password))
    ) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 400 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: auth.userId, email: auth.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" } // Token expiration time
    );

    return new NextResponse(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    console.error("Error logging in:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 400 }
    );
  }
}
