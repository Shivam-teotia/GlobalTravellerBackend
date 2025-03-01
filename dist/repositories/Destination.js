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
exports.addNewDestination = exports.findDestinationByCityOrCountry = exports.getRandomDestinationFromDB = void 0;
const Destination_1 = __importDefault(require("../models/Destination"));
const getRandomDestinationFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield Destination_1.default.countDocuments();
    const random = Math.floor(Math.random() * count);
    return yield Destination_1.default.findOne().skip(random);
});
exports.getRandomDestinationFromDB = getRandomDestinationFromDB;
const findDestinationByCityOrCountry = (city, country) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Destination_1.default.findOne({
        $or: [
            { city: { $regex: new RegExp("^" + city + "$", "i") } },
            { country: { $regex: new RegExp("^" + country + "$", "i") } },
        ],
    });
});
exports.findDestinationByCityOrCountry = findDestinationByCityOrCountry;
const addNewDestination = (city, country, clues, funFacts, trivia) => __awaiter(void 0, void 0, void 0, function* () {
    const newDestination = new Destination_1.default({
        city,
        country,
        clues,
        funFacts,
        trivia,
    });
    return newDestination.save();
});
exports.addNewDestination = addNewDestination;
