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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChallengeInfo = exports.createChallenge = void 0;
const Challenge_1 = __importDefault(require("../models/Challenge"));
const User_1 = __importDefault(require("../models/User"));
const createChallenge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        if (!userId) {
            res.status(400).json({ error: "User ID is required" });
            return;
        }
        const imageLink = `https://unsplash.com/photos/two-people-playing-sony-ps4-game-console-eCktzGjC-iU`; // Placeholder dynamic image
        const challenge = new Challenge_1.default({
            creatorId: userId,
            imageUrl: imageLink,
        });
        yield challenge.save();
        res.status(201).json({ message: "Challenge created", challenge });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create challenge" });
    }
});
exports.createChallenge = createChallenge;
const getChallengeInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { challengeId } = req.params;
        const challenge = yield Challenge_1.default.findById(challengeId).populate("creatorId");
        if (!challenge) {
            res.status(404).json({ error: "Challenge not found" });
            return;
        }
        const creator = yield User_1.default.findById(challenge.creatorId);
        if (!creator) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json({
            creatorScore: creator.score,
            creatorUsername: creator.username,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getChallengeInfo = getChallengeInfo;
