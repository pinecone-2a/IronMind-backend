import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const donationRouter = Router();





// donationRouter.post("/create-donation", async (req: Request, res: Response) => {
//   const { amount, specialMessage, socialURLOrBuyMeACoffee, donorId, recipientId } = req.body;
//   if (!donorId || !recipientId) {
//     return res.status(400).json({ error: "Both donorId and recipientId are required" });
//   }
//   try {
//     const donation = await prisma.donation.create({
//       data: {
//         amount,
//         specialMessage,
//         socialURLOrBuyMeACoffee,
//         donor: {
//           connect: { id: donorId }, // Connect donor by ID
//         },
//         recipient: {
//           connect: { id: recipientId }, // Connect recipient by ID
//         },
//       },
//     });

//     res.json(donation);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "ERROR" });
//   }
// });





donationRouter.get("/received/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const donations = await prisma.donation.findMany({
      where: { recipientId: userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "ERROR" });
  }
});


donationRouter.get("/total-earnings/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const today = new Date();
    const last30Days = new Date();
    last30Days.setDate(today.getDate() - 30); 

    const donations = await prisma.donation.findMany({
      where: {
        recipientId: userId,
        createdAt: { gte: last30Days }, 
      },
    });

    const totalEarnings = donations.reduce((sum, donation) => sum + donation.amount, 0);

    res.json({ earnings: totalEarnings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "ERROR" });
  }
});



donationRouter.get("/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const sentDonations = await prisma.donation.findMany({
      where: { donorId: userId},
      orderBy: { createdAt: "desc" },
    });

    res.json(sentDonations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "ERROR" });
  }
});

export default donationRouter;
