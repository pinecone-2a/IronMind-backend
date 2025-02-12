import { Router, Request, Response } from "express";
import { Prisma } from "@prisma/client";
export const donationRouter = Router();



donationRouter.post("/create-donation", async (req: Request, res: Response) => {
  const { amount, specialMessage, socialURLOrBuyMeACoffee, donorId, recipientId } = req.body;

  try {
    const donation = await Prisma.donation.create({
      data: { amount, specialMessage, socialURLOrBuyMeACoffee, donorId, recipientId },
    });

    res.json(donation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Donation could not be created." });
  }
});


donationRouter.get("/donation/received/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const donations = await Prisma.donation.findMany({
      where: { recipientId: parseInt(userId) },
      orderBy: { createdAt: "desc" },
    });

    res.json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch donations." });
  }
});


donationRouter.get("/total-earnings/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const today = new Date();
    const last30Days = new Date();
    last30Days.setDate(today.getDate() - 30); 

    const totalEarnings = await Prisma.donation.aggregate({
      where: {
        recipientId: parseInt(userId),
        createdAt: { gte: last30Days }, 
      },
      _sum: { amount: true },
    });

    res.json({ earnings: totalEarnings._sum.amount || 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not calculate earnings." });
  }
});


donationRouter.get("/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const sentDonations = await Prisma.donation.findMany({
      where: { donorId: parseInt(userId) },
      orderBy: { createdAt: "desc" },
    });

    res.json(sentDonations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch sent donations." });
  }
});

export default donationRouter;
