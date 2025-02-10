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