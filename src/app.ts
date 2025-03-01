import express from "express";
import cors from "cors";
import DestinationRoutes from "./routes/DestinationRoutes";
import UserRoute from "./routes/UserRoutes";
import cookieParser from "cookie-parser";
import challengeRoutes from "./routes/ChallengeRoute";
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true, // Allows cookies
    })
);

app.use("/api/users", UserRoute);
app.use("/api/destinations", DestinationRoutes);
app.use("/api/challenges", challengeRoutes);

export default app;
