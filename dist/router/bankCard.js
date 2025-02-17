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
exports.bankCardRouter = void 0;
const express_1 = require("express");
const __1 = require("..");
const express = require("express");
exports.bankCardRouter = (0, express_1.Router)();
exports.bankCardRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bankcard = yield __1.prisma.bankcard.create({
        data: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            cardNumber: req.body.cardNumber,
            country: req.body.country,
            expiryDate: req.body.expiryDate,
            userId: req.body.userId,
        },
    });
    res.json(bankcard);
}));
exports.bankCardRouter.get("/get", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield __1.prisma.bankcard.findMany();
    res.json(data);
}));
// bankCardRouter.patch("/patch",async (req:Request,res:Response)=>{
//     const data=await
// })
