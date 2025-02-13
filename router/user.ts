import { Express } from "express";
import { Router, Request, Response } from "express";
import { prisma } from "..";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import * as dotenv from 'dotenv';
import { generateAccessToken } from "./generateAccessToken";
import verify from "./verify";
import jwtdecode, { jwtDecode } from "jwt-decode";

require('dotenv').config();
dotenv.config()

const express = require("express");
export const userRouter = Router();


userRouter.post("/auth/sign-up", async (req: Request, res: Response) => {

  const { username, email, password } = req.body;
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
     res.status(400).json({ error: "User already exists" });
  }
  const hashedPassword = await hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      password: hashedPassword,
      username: req.body.username,
    },
  });
  res.status(201).json({user});
});

userRouter.put("/update/userId", async (req: Request, res: Response) => {
  
  const nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: "ironmind012@gmail.com",
      pass: "mllr ygjj lwub vxyh",
    },

   
  });



    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ message: "User doesn't exists" });
    } else {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const info = await transporter.sendMail({
    from: "<ironmind012@gmail.com>", // sender address
    to: email, // list of receivers
    subject: "Buy me Coffee OTP", // Subject line
    text:"uabduwdb", // plain text body
    html: `<div style="max-width:600px;margin:20px auto;background:#fff;padding:20px;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,0.1);text-align:center;font-family:Arial,sans-serif;">
    <div style="font-size:24px;font-weight:bold;color:#ff9900;">☕ BuyMeCoffee</div>
    <h2>Verify Your Email</h2>
    <p>Use the OTP below to reset your password:</p>
    <div style="font-size:28px;font-weight:bold;color:#333;background:#f8f8f8;padding:10px 20px;display:inline-block;border-radius:5px;margin:20px 0;">${otp}</div>
    <p>If you didn't request this, ignore this email.</p>
    <div style="font-size:12px;color:#777;margin-top:20px;">&copy; 2025 BuyMeCoffee IronMind. All rights reserved.</div>
</div>
`, // html body
  });
  console.log(String(otp))

  await prisma.otp.create({
    data: {
      email: req.body.email,
      code: Number(otp),
  
    }
      
  })

  res.status(200).json({message: "OTP sent to your email" })

}

})

userRouter.patch("/auth/verifyOTP", async (req: Request, res: Response) => {  
  const email = req.body.email;
  const code = req.body.code;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {  
  
      const otp = await prisma.otp.findFirst({
        where: {
          email: email, 
        },
        orderBy: {
          createdAt: "desc",
        },
        
  }); 

  if (otp?.code === code) {
    res.status(200).json({message: "OTP Verified"})
  } else {
    res.status(400).json({message: "Invalid OTP"})
  }
  }
})




userRouter.post("/auth/sign-in", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(400).json({ error: "User doesn't exists" });
   }

  if (user?.password) {
    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
       res.status(400).json({ error: "Invalid password" });
    }  else {
      const refreshToken = jwt.sign({ email: email}, process.env.REFRESH_TOKEN_SECRET!, {
      
      expiresIn: "7d",
      });

      const accessToken = generateAccessToken(user.email);
       res.status(200)
        .cookie("accessToken", accessToken, {
           httpOnly: true,
           
           sameSite: "strict",
           })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",

        })
        .json({
        message: "Log-in Completed",
        accessToken: accessToken  

       })
       console.log(accessToken)
       return;
      
    }
  }

  
})

userRouter.post("/profile", verify, (req, res) => {
  console.log("req_cookies",req.cookies)
  const decodedUser = jwtDecode(req.cookies.accessToken!);
  console.log("decodedUser", decodedUser);
  res.json({ message: "User authenticated", user: decodedUser });
});

userRouter.post("/token", (req: Request, res: Response) => {
  const decodedUser = jwt.decode(req.cookies.accessToken!);
  console.log("decodedUser", decodedUser);
  res.json({ message: "User authenticated", user: decodedUser });
});






// userRouter.get("/getId", async (req: Request, res: Response) => {

//   const username = req.query.username as string; 
//   const userId = await prisma.user.findUnique({
//     where: { username: username },
//     select: { id: true }, 
//   });
//   res.json(userId)

// })