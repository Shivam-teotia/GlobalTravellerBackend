import express from "express";
import {
    getRandomDestination,
    insertDestination,
} from "../controller/DestinationController";
import { body } from "express-validator";
const router = express.Router();

router.get("/random", getRandomDestination);
router.post(
    "/",
    body("city").notEmpty(),
    body("country").notEmpty(),
    insertDestination
);
export default router;
