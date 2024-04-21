import mongoose, { Schema, Document } from 'mongoose';

interface IStudent extends Document {
    name: string;
    email: string;
    classes: mongoose.Types.ObjectId[];
}

const Student = mongoose.models.Student || mongoose.model<IStudent>('Student', new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }]
}, {
    timestamps: true
}));

export { Student };