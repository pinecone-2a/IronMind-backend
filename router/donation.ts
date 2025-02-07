import { Express } from "express";
import { Router, Request, Response } from "express";
import { prisma } from "..";
const express = require("express");
export const donationRouter = Router();

donationRouter.post("/create-donation/:recipientId", async (req: Request, res: Response) => {
  const {recipientId} = req.params
  const {body} = req
  const donation = await prisma.donation.create({
    data: {
      ...body,
      donorId: "KEUUmof9rIwwDRYAGGzni",
      recipientId: recipientId,
    },
  });
  res.json(donation);
});


// donationRouter.get("/", async (req: Request, res: Response) => {
//   const data = await prisma.donation.findMany({
//     include: {
//       donor: true,
//       recipient: true,
//     },
//   });
//   res.json(data);
// });

donationRouter.get("/total-earnings/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId
  const today = new Date()
  const before30Day = today.getDay() - 30
  const donations = await prisma.donation.findMany({
    where: {
      recipientId : userId
    }
  })

  const totalEarnings = donations.reduce((acc, donation) => {
    return acc + donation.amount;
  },0)
  res.json({totalEarnings : totalEarnings})
})

donationRouter.get("/recieved/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId
  // const {} = req.body
  const donations = await prisma.donation.findMany({
    where: {
      recipientId : userId,
      amount:{
        equals : 10
      }
    }
  })
  res.json(donations)
})
