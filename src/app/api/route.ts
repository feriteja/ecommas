import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log({ body });

    const response = "good";
    if (response) {
      return NextResponse.json({
        message: "reCAPTCHA verification successful",
      });
    } else {
      return NextResponse.json({ message: "reCAPTCHA verification failed" });
    }
  } catch (err) {
    return NextResponse.json({ message: "Internal server error" });
  }
}
