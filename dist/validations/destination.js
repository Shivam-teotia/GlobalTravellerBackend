"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDestination = void 0;
const express_validator_1 = require("express-validator");
exports.validateDestination = [
    (0, express_validator_1.body)("city").notEmpty().withMessage("City is required"),
    (0, express_validator_1.body)("country").notEmpty().withMessage("Country is required"),
    (0, express_validator_1.body)("clues")
        .isArray({ min: 1 })
        .withMessage("At least one clue is required"),
    (0, express_validator_1.body)("funFacts")
        .isArray({ min: 1 })
        .withMessage("At least one fun fact is required"),
    (0, express_validator_1.body)("trivia")
        .isArray({ min: 1 })
        .withMessage("At least one trivia fact is required"),
];
