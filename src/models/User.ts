import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    score: number;
    password: string;
    createdAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        username: { type: String, required: true, unique: true },
        score: { type: Number, default: 0 },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
