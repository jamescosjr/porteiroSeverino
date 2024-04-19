import mongoose, { Schema, Document } from 'mongoose';

export interface IAluno extends Document {
    cpf: string;
    nome: string;
}

const AlunoSchema: Schema = new Schema({
    cpf: { type: String, required: true },
    nome: { type: String, required: true }
});

export default mongoose.model<IAluno>('Aluno', AlunoSchema);