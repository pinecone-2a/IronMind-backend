import { Express } from "express";
import { Router, Request, Response } from "express";
import { prisma } from "..";
import { profile } from "console";
import { ALL } from "dns";
const express = require("express");
export const profileRouter = Router();

profileRouter.post("/", async (req: Request, res: Response) => {
  try {
    const profile = await prisma.profile.create({
      data: {
        name: req.body.name,
        about: req.body.about,
        avatarImage: req.body.avatarImage,
        socialMediaURL: req.body.socialMediaURL,
        backgroundImage: req.body.backgroundImage,
        successMessage: req.body.successMessage,
        userId: req.body.userId,
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

// profileRouter.get("/:userId", async (req: Request, res: Response)=> {
//   console.log(req.params.userId)
//   try {
//     const profile = await prisma.user.findUnique({
//       where: {
//         id: req.params.userId },
//         select: {profile: true, bankCard: true}
//     });
//     res.json(profile);
//     console.log(profile);
//   } catch(e) {
//     res.send("failed to fetch");
//   }

// });
profileRouter.get("/:userId", async (req: Request, res: Response) => {
  console.log(req.params.userId)
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        id: req.params.userId },

    });
    res.json(profile);
    console.log(profile);
  } catch(e) {
    res.send("failed to fetch");
  }
});

profileRouter.get("/avatarImage/:userId", async (req: Request, res: Response) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: req.params.userId,
      },
    });
    res.json(profile);
  } catch(e) {
    res.send("failed to fetch");
  }
})


profileRouter.put("/:userId", async (req: Request, res: Response) => {
  try {
    const {body} = req
    const profile = await prisma.profile.update({
      where: {
        id: req.params.id,
      },
      data: {
        ...body
      },
    });
    res.json(profile);
  } catch {
    res.send("failed to fetch");
  }
});

profileRouter.get("view/userId", async (req: Request, res:  Response) => {
  const userId = req.query.username as string
  try {
    const data = await prisma.profile.findUnique({
      where: { userId : userId },
      select: {name: true, about: true, backgroundImage: true,}
    })
  } catch(error){
    console.log(error)
  }
})

