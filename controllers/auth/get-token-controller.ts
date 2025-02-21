import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const getTokenController = (req: Request, res: Response) => {
  const refreshToken = req.body["refreshToken"];
  if (!refreshToken) {
    res.status(401).send("Access Denied. No refresh token provided.");
    return;
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
    if (typeof decoded != "string") {
      const accessToken = jwt.sign(
        { userId: decoded.userId },
        process.env.ACCESS_TOKEN_SECRET!,
        {
          expiresIn: "15s",
        }
      );
      res.cookie("accessToken", accessToken).send(decoded.user);
      res.status(201).send({
        result: {
          accessToken,
        },
        success: true
      })
    }
  } catch (error) {
    res.status(400).send("Invalid refresh token.");
  }
};