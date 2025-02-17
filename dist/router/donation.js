"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.donationRouter = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.donationRouter = (0, express_1.Router)();
exports.donationRouter.post("/create-donation", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, specialMessage, socialURLOrBuyMeACoffee, donorId, recipientId } = req.body;
    try {
        const donation = yield prisma.donation.create({
            data: { amount, specialMessage, socialURLOrBuyMeACoffee, donorId, recipientId },
        });
        res.json(donation);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "ERROR" });
    }
}));
exports.donationRouter.get("/donation/received/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const donations = yield prisma.donation.findMany({
            where: { recipientId: userId },
            orderBy: { createdAt: "desc" },
        });
        res.json(donations);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "ERROR" });
    }
}));
exports.donationRouter.get("/total-earnings/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const today = new Date();
        const last30Days = new Date();
        last30Days.setDate(today.getDate() - 30);
        const donations = yield prisma.donation.findMany({
            where: {
                recipientId: userId,
                createdAt: { gte: last30Days },
            },
        });
        const totalEarnings = donations.reduce((sum, donation) => sum + donation.amount, 0);
        res.json({ earnings: totalEarnings });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "ERROR" });
    }
}));
exports.donationRouter.get("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const sentDonations = yield prisma.donation.findMany({
            where: { donorId: userId },
            orderBy: { createdAt: "desc" },
        });
        res.json(sentDonations);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "ERROR" });
    }
}));
exports.default = exports.donationRouter;
