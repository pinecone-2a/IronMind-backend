import { Express } from "express";
import { Router, Request, Response } from "express";
import { prisma } from "..";
const express = require("express");
export const userRouter = Router();

userRouter.post("/", async (req: Request, res: Response) => {
  const bankcard = await prisma.user.create({
    data: {
      email: "3283dwdfesdw",
      password: "Mongoliasczszscdw",
      username: "dwgcszczcwd",
    },
  });
  res.json(bankcard);
});
userRouter.get("/", async (req: Request, res: Response) => {
  const data = await prisma.user.findMany();
  res.json(data);
});
