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
exports.profileRouter = void 0;
const express_1 = require("express");
const __1 = require("..");
const express = require("express");
exports.profileRouter = (0, express_1.Router)();
exports.profileRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield __1.prisma.profile.create({
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
    }
    catch (_a) {
        res.send("failed to fetch");
    }
}));
exports.profileRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield __1.prisma.profile.findMany();
        res.json(data);
    }
    catch (_a) {
        res.send("failed to fetch");
    }
}));
