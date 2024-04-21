import mongoose, { Schema, Document } from 'mongoose';

interface IStudent extends Document {
    name: string;
    cpf: string;
    email: string;
    classes: mongoose.Types.ObjectId[];
}

const studentSchema: Schema = new Schema({
    name: { type: String, required: true },
    cpf: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }]
}, {
    timestamps: true
});

const Student = mongoose.model<IStudent>('Student', studentSchema);

export { Student };