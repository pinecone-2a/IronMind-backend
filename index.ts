import { PrismaClient, Prisma } from "@prisma/client";
import { Express } from "express";
import { Router } from "express";
import { Request, Response } from "express";
import { bankCardRouter } from "./router/bankCard";
import * as dotenv from "dotenv";
import { donationRouter } from "./router/donation";
import { profileRouter } from "./router/profile";
import { userRouter } from "./router/user";
import cookieParser from "cookie-parser";

require("dotenv").config();
dotenv.config();
const express = require("express");
const app = express();

const port = 4000;
const cors = require("cors");


export const prisma = new PrismaClient();
app.use(
  cors({
    origin: ["http://localhost:3001", "https://iron-mind-frontend.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/bankcard/", bankCardRouter);
app.use("/donation/", donationRouter);
app.use("/profile/", profileRouter);
app.use("/user/", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
