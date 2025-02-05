import { Router, Request, Response } from "express";
import { prisma } from "..";
const express = require("express");
export const donationRouter = Router();

donationRouter.post("/create", async (req: Request, res: Response) => {
  try{
    const user = await prisma.donation.create({
      data: {
        amount: req.body.amount,
        specialMessage: req.body.specialMessage,
        socialURLOrBuyMeACoffe: req.body.socialURLOrBuyMeACoffe,
        donorId: 1213131,
        recipientId: 131313,
      },
    });
    res.json(user);
  } catch{
    res.send("failed to fetch")
  }
});
donationRouter.get("/get", async (req: Request, res: Response) => {
 try {
  const data = await prisma.donation.findMany();
  res.json(data);
 } catch{
  res.send("failed to fetch")
 }
});
