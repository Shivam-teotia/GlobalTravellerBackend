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
exports.updateUserScore = exports.getCurrentUser = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // Use env for security
const JWT_EXPIRY = "1d"; // 1-day expiration
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({
                error: "both username and password is required",
            });
            return;
        }
        const userFromDb = yield User_1.default.findOne({ username });
        if (userFromDb) {
            res.status(403).json({
                error: "user already exist",
            });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = new User_1.default({ username, password: hashedPassword });
        yield user.save();
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRY,
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 50 * 60 * 60 * 1000,
        });
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(400).json({ error: "User already exists" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield User_1.default.findOne({ username });
        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const isValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isValid) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRY,
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 50 * 60 * 60 * 1000,
        });
        res.json({ token: token, user: user });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.login = login;
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const user = yield User_1.default.findById(decoded.userId).select("-password");
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json({ user });
    }
    catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
});
exports.getCurrentUser = getCurrentUser;
const updateUserScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correct } = req.body;
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const user = yield User_1.default.findById(decoded.userId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        // Update score logic (increment if correct)
        if (correct) {
            user.score = (user.score || 0) + 1; // Initialize if undefined
            yield user.save();
        }
        res.json({ message: "Score updated successfully", score: user.score });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateUserScore = updateUserScore;
