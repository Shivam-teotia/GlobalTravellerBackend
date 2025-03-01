import { Request, Response } from "express";
import Challenge from "../models/Challenge";
import User from "../models/User";

export const createChallenge = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            res.status(400).json({ error: "User ID is required" });
            return;
        }
        const imageLink = `https://unsplash.com/photos/two-people-playing-sony-ps4-game-console-eCktzGjC-iU`; // Placeholder dynamic image

        const challenge = new Challenge({
            creatorId: userId,
            imageUrl: imageLink,
        });
        await challenge.save();

        res.status(201).json({ message: "Challenge created", challenge });
    } catch (error) {
        res.status(500).json({ error: "Failed to create challenge" });
    }
};

export const getChallengeInfo = async (req: Request, res: Response) => {
    try {
        const { challengeId } = req.params;
        const challenge = await Challenge.findById(challengeId).populate(
            "creatorId"
        );

        if (!challenge) {
            res.status(404).json({ error: "Challenge not found" });
            return;
        }

        const creator = await User.findById(challenge.creatorId);
        if (!creator) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.json({
            creatorScore: creator.score,
            creatorUsername: creator.username,
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
