import { PrismaClient, Prisma } from "@prisma/client";
import { Express } from "express";
import { Router } from "express";
import { Request, Response } from "express";
import { bankCardRouter } from "./router/bankCard";

import { donationRouter } from "./router/donation";
import { profileRouter } from "./router/profile";
import { userRouter } from "./router/user";
const express = require("express");
const app = express();
const port = 5000;

export const prisma = new PrismaClient();

app.use(express.json());

app.use("/bankcard/", bankCardRouter);
app.use("/donation/", donationRouter);
app.use("/profile/", profileRouter);
app.use("/user/", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
