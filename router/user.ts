import { Express } from "express";
import { Router, Request, Response } from "express";
import { prisma } from "..";
import { hash } from "bcryptjs";
import bcryptjs from "bcryptjs"
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
    html: `<h1>Your OTP is ${otp}</h1>`, // html body
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
  const { name, email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(400).json({ error: "User doesn't exists" });
 }


  if (user?.password) {
    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
       res.status(400).json({ error: "Invalid password" });
    } else {
       res.status(200).json({message: "Log-in Completed"})
    }
  }

//  bcry(existingUser?.password === password) {
  

//  }
  
})

userRouter.get("/", async (req: Request, res: Response) => {
  const data = await prisma.user.findMany();
  res.json(data);
});






// userRouter.get("/getId", async (req: Request, res: Response) => {

//   const username = req.query.username as string; 
//   const userId = await prisma.user.findUnique({
//     where: { username: username },
//     select: { id: true }, 
//   });
//   res.json(userId)

// })