import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

type JwtToken = {
  userId: string;
  email: string;
  iat: number;
  exp: number;
};
export const authData = (): JwtToken | null => {
  // Get the JWT token from cookies
  const authToken = Cookies.get("auth_token");

  if (authToken) {
    try {
      // Decode the JWT token to extract user ID
      const decodedToken = jwt.verify(
        authToken,
        process.env.JWT_SECRET as string
      ) as JwtToken;

      return decodedToken;
    } catch (error) {
      console.log({ error });

      throw Error("Error decoding JWT token:");
    }
  } else {
    return null;
  }
};
