import mongoose, { Schema, Document } from 'mongoose';

interface IClass extends Document {
    name: string;
    description?: string;
    students: mongoose.Types.ObjectId[];
}

const classSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
}, {
    timestamps: true
});

const Class = mongoose.model<IClass>('Class', classSchema);

export { Class };