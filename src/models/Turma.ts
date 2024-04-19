import mongoose, { Document, Schema } from 'mongoose';

export interface ITurma extends Document {
    title: string;
    alunos: mongoose.Types.ObjectId[];
    professores: mongoose.Types.ObjectId[];
    adicionarAluno(alunoId: mongoose.Types.ObjectId): Promise<void>;
    adicionarProfessor(professorId: mongoose.Types.ObjectId): Promise<void>;
}

const TurmaSchema: Schema = new Schema({
    title: { type: String, required: true },
    alunos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Aluno' }],
    professores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Professor' }]
});

TurmaSchema.methods.adicionarAluno = async function(alunoId: mongoose.Types.ObjectId): Promise<void> {
    if (this.alunos.length >= 55) {
        throw new Error('A turma já atingiu o limite máximo de alunos.');
    }

    if (!this.alunos.includes(alunoId)) {
        this.alunos.push(alunoId);
        await this.save();
    }
};

TurmaSchema.methods.adicionarProfessor = async function(professorId: mongoose.Types.ObjectId): Promise<void> {
    if (this.professores.length >= 2) {
        throw new Error('A turma já atingiu o limite máximo de professores.');
    }

    if (!this.professores.includes(professorId)) {
        this.professores.push(professorId);
        await this.save();
    }
};

export default mongoose.model<ITurma>('Turma', TurmaSchema);