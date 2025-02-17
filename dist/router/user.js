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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const __1 = require("..");
const bcryptjs_1 = require("bcryptjs");
const bcryptjs_2 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const verify_1 = __importDefault(require("./verify"));
const jwt_decode_1 = require("jwt-decode");
require('dotenv').config();
dotenv.config();
const express = require("express");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/auth/sign-up", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const existingUser = yield __1.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
    const user = yield __1.prisma.user.create({
        data: {
            email: req.body.email,
            password: hashedPassword,
            username: req.body.username,
        },
    });
    res.status(201).json({ user });
}));
exports.userRouter.put("/update/userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for port 465, false for other ports
        auth: {
            user: "ironmind012@gmail.com",
            pass: "mllr ygjj lwub vxyh",
        },
    });
    const { email, password } = req.body;
    const user = yield __1.prisma.user.findUnique({ where: { email } });
    if (!user) {
        res.status(400).json({ message: "User doesn't exists" });
    }
    else {
        const otp = Math.floor(100000 + Math.random() * 900000);
        const info = yield transporter.sendMail({
            from: "<ironmind012@gmail.com>", // sender address
            to: email, // list of receivers
            subject: "Buy me Coffee OTP", // Subject line
            text: "uabduwdb", // plain text body
            html: `<div style="max-width:600px;margin:20px auto;background:#fff;padding:20px;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,0.1);text-align:center;font-family:Arial,sans-serif;">
    <div style="font-size:24px;font-weight:bold;color:#ff9900;">☕ BuyMeCoffee</div>
    <h2>Verify Your Email</h2>
    <p>Use the OTP below to reset your password:</p>
    <div style="font-size:28px;font-weight:bold;color:#333;background:#f8f8f8;padding:10px 20px;display:inline-block;border-radius:5px;margin:20px 0;">${otp}</div>
    <p>If you didn't request this, ignore this email.</p>
    <div style="font-size:12px;color:#777;margin-top:20px;">&copy; 2025 BuyMeCoffee IronMind. All rights reserved.</div>
</div>
`, // html body
        });
        console.log(String(otp));
        yield __1.prisma.otp.create({
            data: {
                email: req.body.email,
                code: Number(otp),
            }
        });
        res.status(200).json({ message: "OTP sent to your email" });
    }
}));
exports.userRouter.patch("/auth/verifyOTP", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const code = req.body.code;
    const user = yield __1.prisma.user.findUnique({ where: { email } });
    if (user) {
        const otp = yield __1.prisma.otp.findFirst({
            where: {
                email: email,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        if ((otp === null || otp === void 0 ? void 0 : otp.code) === code) {
            res.status(200).json({ message: "OTP Verified" });
        }
        else {
            res.status(400).json({ message: "Invalid OTP" });
        }
    }
}));
exports.userRouter.post("/auth/sign-in", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield __1.prisma.user.findUnique({ where: { email } });
    if (!user) {
        res.status(400).json({ error: "User doesn't exists" });
    }
    if (user === null || user === void 0 ? void 0 : user.password) {
        const isMatch = bcryptjs_2.default.compareSync(password, user.password);
        if (!isMatch) {
            res.status(400).json({ error: "Invalid password" });
        }
        else {
            const userId = yield __1.prisma.user.findUnique({
                where: { email: email },
                select: { id: true },
            });
            const refreshToken = jsonwebtoken_1.default.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
            const accessToken = jsonwebtoken_1.default.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
            res
                .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
            })
                .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
            })
                .json({
                message: "Log-in Completed",
                accessToken: accessToken
            });
            console.log("accessToken", accessToken);
        }
    }
}));
exports.userRouter.post("/profile", verify_1.default, (req, res) => {
    console.log("req_cookies", req.cookies);
    const decodedUser = (0, jwt_decode_1.jwtDecode)(req.cookies.accessToken);
    console.log("decodedUser", decodedUser);
    res.json({ message: "User authenticated", user: decodedUser });
});
exports.userRouter.post("/token", (req, res) => {
    const decodedUser = jsonwebtoken_1.default.decode(req.cookies.accessToken);
    console.log("decodedUser", decodedUser);
    res.json({ message: "User authenticated", user: decodedUser });
});
exports.userRouter.get("/getUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const data = yield __1.prisma.user.findUnique({
        where: { id: id },
        select: { profile: true, donations: true, },
    });
    res.json(data);
}));
// userRouter.get("/getId", async (req: Request, res: Response) => {
//   const username = req.query.username as string; 
//   const userId = await prisma.user.findUnique({
//     where: { email: email },
//     select: { id: true }, 
//   });
//   res.json(userId)
// })
