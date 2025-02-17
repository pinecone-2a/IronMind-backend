"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const bankCard_1 = require("./router/bankCard");
const dotenv = __importStar(require("dotenv"));
const donation_1 = require("./router/donation");
const profile_1 = require("./router/profile");
const user_1 = require("./router/user");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv").config();
dotenv.config();
const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
exports.prisma = new client_1.PrismaClient();
app.use(express.json());
app.use((0, cookie_parser_1.default)());
app.use(cors({
    origin: "https://iron-mind-frontend.vercel.app/", // Adjust this for production
    credentials: true,
}));
app.use("/bankcard/", bankCard_1.bankCardRouter);
app.use("/donation/", donation_1.donationRouter);
app.use("/profile/", profile_1.profileRouter);
app.use("/user/", user_1.userRouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
