"use client";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // JWT decoding library

type JwtToken = {
  userId: string;
  email: string;
  iat: number;
  exp: number;
};

export const authJwtData = (): JwtToken | null => {
  // Get the JWT token from cookies
  const authToken = Cookies.get("auth_token");
  if (authToken) {
    try {
      const decodedToken = jwtDecode(authToken) as JwtToken;

      return decodedToken;
    } catch (error) {
      console.error({ error });
      throw error; // Re-throwing with original error for better debugging
    }
  } else {
    return null;
  }
};
