"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
const router = express_1.default.Router();
router.post("/register", UserController_1.register);
router.post("/login", UserController_1.login);
router.get("/me", UserController_1.getCurrentUser);
router.put("/score", UserController_1.updateUserScore);
exports.default = router;
