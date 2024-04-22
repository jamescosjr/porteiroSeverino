import mongoose, { Schema, Document } from 'mongoose';

interface IStudent extends Document {
    name: string;
    email: string;
    classId: string;
}

const studentSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    classId: { type: String }
});

const Student = mongoose.models.Student || mongoose.model<IStudent>('Student', studentSchema);

export { Student };