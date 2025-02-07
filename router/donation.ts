import { Express } from "express";
import { Router, Request, Response } from "express";
import { prisma } from "..";
const express = require("express");
export const donationRouter = Router();

donationRouter.post("/", async (req: Request, res: Response) => {
  const donation = await prisma.donation.create({
    data: {
      amount: 8210,
      specialMessage: "buy coffee",
      socialURLOrBuyMeACoffee: "dhiwahdidaw",
      donorId: "KEUUmof9rIwwDRYAGGzni",
      recipientId: "nHvliOYxZesv2rMZ2lv1cdwdaw",
    },
  });
  res.json(donation);
});
donationRouter.get("/", async (req: Request, res: Response) => {
  const data = await prisma.donation.findMany({
    include: {
      donor: true,
      recipient: true,
    },
  });
  res.json(data);
});
