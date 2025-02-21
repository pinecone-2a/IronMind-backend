import jwt from "jsonwebtoken"

export const generateAccessToken = (email: string) => {
  const token = jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET!, 
    { expiresIn: "10m" });

    return token;
}