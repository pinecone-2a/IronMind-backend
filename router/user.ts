import { Router, Request, Response } from "express";
import { prisma } from "..";
const express = require("express");
export const userRouter = Router();

userRouter.post("/create", async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: {
      bankCardId: "djwdad",
    },
  });
  res.json(user);
});
userRouter.get("/get", async (req: Request, res: Response) => {
  const data = await prisma.user.findMany();
  res.json(data);
});
