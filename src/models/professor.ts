// /models/professor.ts

import mongoose, { Schema, Document } from 'mongoose';

interface IProfessor extends Document {
    name: string;
    subjects: mongoose.Types.ObjectId[];
}

const professorSchema: Schema = new Schema({
    name: { type: String, required: true },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]
});

export const Professor = mongoose.model<IProfessor>('Professor', professorSchema);