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
exports.insertDestination = exports.getRandomDestination = void 0;
const Destination_1 = __importDefault(require("../models/Destination"));
const express_validator_1 = require("express-validator");
const getRandomDestination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield Destination_1.default.countDocuments();
        const random = Math.floor(Math.random() * count);
        const destination = yield Destination_1.default.findOne().skip(random);
        if (!destination) {
            res.status(404).json({ error: "No destinations found" });
            return;
        }
        res.json(destination);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch destination" });
    }
});
exports.getRandomDestination = getRandomDestination;
const insertDestination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const { city, country, clues, fun_facts, trivia } = req.body;
        const newDestination = new Destination_1.default({
            city,
            country,
            clues,
            fun_facts,
            trivia,
        });
        const savedDestination = yield newDestination.save();
        res.status(201).json(savedDestination);
    }
    catch (error) {
        console.error("Error inserting destination:", error);
        res.status(500).json({ error: "Server Error" });
    }
});
exports.insertDestination = insertDestination;
