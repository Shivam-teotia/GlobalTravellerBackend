"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ChallengeController_1 = require("../controller/ChallengeController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/create", auth_1.authenticateJWT, ChallengeController_1.createChallenge);
router.get("/challenge/:challengeId", ChallengeController_1.getChallengeInfo);
exports.default = router;
