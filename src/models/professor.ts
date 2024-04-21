import mongoose, { Schema, Document } from 'mongoose';

interface IProfessor extends Document {
    name: string;
    email: string;
    subjects: string[];
}

const professorSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    subjects: [{ type: String }]
}, {
    timestamps: true
});

const Professor = mongoose.models.Professor || mongoose.model<IProfessor>('Professor', professorSchema);

export { Professor };