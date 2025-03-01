"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const DestinationRoutes_1 = __importDefault(require("./routes/DestinationRoutes"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const ChallengeRoute_1 = __importDefault(require("./routes/ChallengeRoute"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://globaltravellerfrontend.onrender.com",
    ],
    credentials: true, // Allows cookies
}));
app.use("/api/users", UserRoutes_1.default);
app.use("/api/destinations", DestinationRoutes_1.default);
app.use("/api/challenges", ChallengeRoute_1.default);
exports.default = app;
