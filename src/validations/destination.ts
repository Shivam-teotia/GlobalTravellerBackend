import { body } from "express-validator";

export const validateDestination = [
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("clues")
        .isArray({ min: 1 })
        .withMessage("At least one clue is required"),
    body("funFacts")
        .isArray({ min: 1 })
        .withMessage("At least one fun fact is required"),
    body("trivia")
        .isArray({ min: 1 })
        .withMessage("At least one trivia fact is required"),
];
