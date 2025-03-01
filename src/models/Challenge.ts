import mongoose, { Schema, Document } from "mongoose";

export interface IChallenge extends Document {
    creatorId: mongoose.Types.ObjectId;
    imageUrl: string;
    createdAt: Date;
}

const ChallengeSchema = new Schema<IChallenge>(
    {
        creatorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        imageUrl: { type: String, required: false },
    },
    { timestamps: true }
);

export default mongoose.model<IChallenge>("Challenge", ChallengeSchema);
