import mongoose, { Schema, Document } from 'mongoose';

interface IClass extends Document {
    name: string;
    subjects: string;
    classId: string;
    students: string[];
    professors: string[];
}

const classSchema = new Schema({
    name: { type: String, required: true },
    subjects: { type: String },
    classId: { type: String, required: true, unique: true },
    students: [{ type: String }],
    professors: [{ type: String }]
});

const Class = mongoose.models.Class || mongoose.model<IClass>('Class', classSchema);

export { Class };