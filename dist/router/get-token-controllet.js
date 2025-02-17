"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getTokenController = (req, res) => {
    const refreshToken = req.body["refreshToken"];
    if (!refreshToken) {
        res.status(401).send("Access Denied. No refresh token provided.");
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (typeof decoded != "string") {
            const accessToken = jsonwebtoken_1.default.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "1h",
            });
            res.cookie("accessToken", accessToken).send(decoded.user);
        }
    }
    catch (error) {
        res.status(400).send("Invalid refresh token.");
    }
};
exports.getTokenController = getTokenController;
