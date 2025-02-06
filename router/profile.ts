import { Router, Request, Response } from "express";
import { prisma } from "..";
const express = require("express");
export const profileRouter = Router();

profileRouter.post("/create", async (req: Request, res: Response) => {
  const { body } = req;
  const profile = await prisma.profile.create({
    data: {
      name: body.name,
      about: body.about,
      avatarImage: body.avatarImage,
      socialMediaURL: body.socialMediaURL,
      backgroundImage: body.backgroundImage,
      successMessage: body.successMessage,
    },
  });
  res.json(profile);
});
profileRouter.get("/get", async (req: Request, res: Response) => {
  const data = await prisma.profile.findMany();
  res.json(data);
});
