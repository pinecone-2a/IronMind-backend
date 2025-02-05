import { Router, Request, Response } from "express";
import { prisma } from "..";
const express = require("express");
export const donationRouter = Router();

donationRouter.post("/create", async (req: Request, res: Response) => {
  const user = await prisma.donation.create({
    data: {
      amount: 1000,
      specialMessage: "Hello thank you so much for donating me",
      socialURLOrBuyMeACoffe: "url link comes in ",
      donorId: 1213131,
      recipientId: 131313,
    },
  });
  res.json(user);
});
donationRouter.get("/get", async (req: Request, res: Response) => {
  const data = await prisma.donation.findMany();
  res.json(data);
});
