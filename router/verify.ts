import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: any; // ✅ Attach user object to request
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  console.log("Cookies Received:", req.cookies); // ✅ Debugging log

  const accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  if (!accessToken) {
    res.status(401).json({ message: "Access Denied. No token provided." });
    return;
  }

  try {
    // ✅ Verify Access Token
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as { userId: string; email: string };
    req.user = decoded; // ✅ Attach user info to request
    next(); // ✅ Ensure the next middleware is called
  } catch (error) {
    console.error("Access Token Expired:", error);

    if (!refreshToken) {
      res.status(401).json({ message: "Access Denied. No refresh token provided." });
      return;
    }

    try {
      // ✅ Verify Refresh Token & Generate New Access Token
      const decodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as {
        userId: string;
        email: string;
      };

      const newAccessToken = jwt.sign(
        { userId: decodedRefresh.userId, email: decodedRefresh.email },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "15m" }
      );

      // ✅ Set new access token in cookies
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // ✅ Secure only in production
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      req.user = decodedRefresh;
      next();
    } catch (refreshError) {
      res.status(403).json({ message: "Invalid refresh token." });
      return;
    }
  }
};

export default verifyToken;
