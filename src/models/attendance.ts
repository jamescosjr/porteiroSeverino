import mongoose, { Schema } from 'mongoose';
import { Student } from './student';

interface IQuestionnaire {
    feelings: string;
    meme: string;
    villain: string;
    expectations: string;
    mood: string;
}

interface IAttendance extends mongoose.Document {
    classId: mongoose.Types.ObjectId;
    studentId: string;
    startTime: Date;
    endTime?: Date;
    questionnaire: IQuestionnaire;
}

const questionnaireSchema = new mongoose.Schema({
    feelings: { type: String, required: true },
    meme: { type: String, required: true },
    villain: { type: String, required: true },
    expectations: { type: String, required: true },
    mood: { type: String, required: true },
});

const attendanceSchema = new mongoose.Schema({
    classId: { type: mongoose.Schema.Types.ObjectId, required: true },
    studentId: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    questionnaire: { type: questionnaireSchema, required: true }
});

attendanceSchema.pre<IAttendance>('save', async function (next) {
    try {
        const student = await Student.findOne({ email: this.studentId });
        if (student) {
            this.studentId = student._id;
        } else {
            throw new Error('Estudante não encontrado');
        }
        next();
    } catch (error: any) {
        next(error);
    }
});

const Attendance = mongoose.model<IAttendance>('Attendance', attendanceSchema);

export { Attendance };