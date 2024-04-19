import mongoose, { Document, Schema } from 'mongoose';

export interface IProfessor extends Document {
    nome: string;
}

const ProfessorSchema: Schema = new Schema({
    nome: { type: String, required: true }
});

export default mongoose.model<IProfessor>('Professor', ProfessorSchema);