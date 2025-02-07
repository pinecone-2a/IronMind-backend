import { Express } from "express";
import { Router, Request, Response } from "express";
import { prisma } from "..";
const express = require("express");
export const profileRouter = Router();

profileRouter.post("/", async (req: Request, res: Response) => {
  try {
    const profile = await prisma.profile.create({
      data: {
        name: "hellowcz",
        about: "hellow",
        avatarImage: "hellow",
        socialMediaURL: "hellow",
        backgroundImage: "hellow",
        successMessage: "hellow",
        userId: "hellofewwdwdwad",
      },
    });
    res.json(profile);
  } catch {
    res.send("failed to fetch");
  }
});
profileRouter.get("/", async (req: Request, res: Response) => {
  try {
    const data = await prisma.profile.findMany();
    res.json(data);
  } catch {
    res.send("failed to fetch");
  }
});
