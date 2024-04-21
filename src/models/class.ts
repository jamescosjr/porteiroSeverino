import mongoose, { Schema, Document } from 'mongoose';

interface IClass extends Document {
    name: string;
    description?: string;
    classId: string;
    students: string[];
}

const classSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    classId: { type: String, required: true, unique: true },
    students: [{ type: String }]
});

const Class = mongoose.models.Class || mongoose.model<IClass>('Class', classSchema);

export { Class };