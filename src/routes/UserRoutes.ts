import express from "express";
import {
    getCurrentUser,
    login,
    register,
    updateUserScore,
} from "../controller/UserController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", getCurrentUser);
router.put("/score", updateUserScore);

export default router;
