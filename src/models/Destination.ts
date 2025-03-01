import mongoose, { Schema, Document } from "mongoose";

export interface IDestination extends Document {
    city: string;
    country: string;
    clues: string[];
    fun_facts: string[];
    trivia: string[];
}

const DestinationSchema = new Schema<IDestination>({
    city: { type: String, required: true },
    country: { type: String, required: true },
    clues: { type: [String], required: true },
    fun_facts: { type: [String], required: true },
    trivia: { type: [String], required: true },
});

export default mongoose.model<IDestination>("Destination", DestinationSchema);
