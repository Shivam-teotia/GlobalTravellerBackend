import { Request, Response } from "express";
import Destination from "../models/Destination";
import { validationResult } from "express-validator";

export const getRandomDestination = async (req: Request, res: Response) => {
    try {
        const count = await Destination.countDocuments();
        const random = Math.floor(Math.random() * count);
        const destination = await Destination.findOne().skip(random);

        if (!destination) {
            res.status(404).json({ error: "No destinations found" });
            return;
        }

        res.json(destination);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch destination" });
    }
};
export const insertDestination = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    try {
        const { city, country, clues, fun_facts, trivia } = req.body;
        const newDestination = new Destination({
            city,
            country,
            clues,
            fun_facts,
            trivia,
        });
        const savedDestination = await newDestination.save();
        res.status(201).json(savedDestination);
    } catch (error) {
        console.error("Error inserting destination:", error);
        res.status(500).json({ error: "Server Error" });
    }
};
