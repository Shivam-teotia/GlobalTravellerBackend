import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const authenticateJWT = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded; // Attach user info to request
        next();
    } catch (error) {
        res.status(403).json({ error: "Invalid token" });
    }
};
