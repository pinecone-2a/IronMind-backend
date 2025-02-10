import { Express } from "express";
import { Router, Request, Response } from "express";
import { prisma } from "..";
const express = require("express");
export const bankCardRouter = Router();

bankCardRouter.post("/create", async (req: Request, res: Response) => {
  const bankcard = await prisma.bankcard.create({
    data: {
      cardNumber: req.body.cardNumber,
      country: req.body.country,
      expiryDate: req.body.expiryDate,
      userId: req.body.userId,
    },
  });
  res.json(bankcard);
});
bankCardRouter.get("/get", async (req: Request, res: Response) => {
  const data = await prisma.bankcard.findMany();
  res.json(data);
});

// bankCardRouter.patch("/patch",async (req:Request,res:Response)=>{
//     const data=await
// })
