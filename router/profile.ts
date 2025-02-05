import { Router, Request, Response } from "express";
import { prisma } from "..";
const express = require("express");
export const profileRouter = Router();

profileRouter.post("/create", async (req: Request, res: Response) => {
  const profile = await prisma.profile.create({
    data: {
      name: req.body.name,
      about: req.body.about,
      avatarImage: req.body.avatarImage,
      socialMediaURL: req.body.socialMediaURL,
      backgroundImage: req.body.backgroundImage,
      successMessage: req.body.successMessage,
    },
  });
  res.json(profile);
});
profileRouter.get("/get", async (req: Request, res: Response) => {
  const data = await prisma.profile.findMany();
  res.json(data);
});
