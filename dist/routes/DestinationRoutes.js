"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DestinationController_1 = require("../controller/DestinationController");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.get("/random", DestinationController_1.getRandomDestination);
router.post("/", (0, express_validator_1.body)("city").notEmpty(), (0, express_validator_1.body)("country").notEmpty(), DestinationController_1.insertDestination);
exports.default = router;
