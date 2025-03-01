import express from "express";
import {
    createChallenge,
    getChallengeInfo,
} from "../controller/ChallengeController";
import { authenticateJWT } from "../middleware/auth";

const router = express.Router();

router.post("/create", authenticateJWT, createChallenge);
router.get("/challenge/:challengeId", getChallengeInfo);
export default router;
