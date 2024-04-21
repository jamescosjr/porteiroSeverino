import mongoose, { Schema, Document } from 'mongoose';

interface ISubject extends Document {
    id: string;
    name: string;
}

const subjectSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
});

const Subject = mongoose.models.Subject || mongoose.model<ISubject>('Subject', subjectSchema);

export { Subject };