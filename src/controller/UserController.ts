import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // Use env for security
const JWT_EXPIRY = "1d"; // 1-day expiration

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({
                error: "both username and password is required",
            });
            return;
        }
        const userFromDb = await User.findOne({ username });
        if (userFromDb) {
            res.status(403).json({
                error: "user already exist",
            });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRY,
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 50 * 60 * 60 * 1000,
        });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ error: "User already exists" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            res.status(404).json({ error: "Invalid credentials" });
            return;
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            res.status(404).json({ error: "Invalid credentials" });
            return;
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRY,
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 50 * 60 * 60 * 1000,
        });

        res.json({ token: token, user: user });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.json({ user });
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};

export const updateUserScore = async (req: Request, res: Response) => {
    try {
        const { correct } = req.body;
        const token = req.cookies.token;

        if (!token) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        const user = await User.findById(decoded.userId);

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        // Update score logic (increment if correct)
        if (correct) {
            user.score = (user.score || 0) + 1; // Initialize if undefined
            await user.save();
        }

        res.json({ message: "Score updated successfully", score: user.score });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
