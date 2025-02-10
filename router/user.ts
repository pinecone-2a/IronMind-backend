import { Express } from "express";
import { Router, Request, Response } from "express";
import { prisma } from "..";
import { error } from "console";
const express = require("express");
export const userRouter = Router();

userRouter.post("/", async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    },
  });
  res.json(user);
});
userRouter.get("/", async (req: Request, res: Response) => {
  const data = await prisma.user.findMany();
  res.json(data);
});

userRouter.get("/getId", async (req: Request, res: Response) => {

  const username = req.query.username as string; 
  const userId = await prisma.user.findUnique({
    where: { username: username },
    select: { id: true }, 
  });
  res.json(userId)

})