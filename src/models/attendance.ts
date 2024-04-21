import mongoose from "mongoose";

interface IQuestionnaire {
    feelings: string;
    meme: string;
    villain: string;
    expectations: string;
    mood: string;
}

interface IAttendance extends mongoose.Document {
    classId: mongoose.Types.ObjectId;
    studentId: mongoose.Types.ObjectId;
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
    studentId: { type: mongoose.Schema.Types.ObjectId, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    questionnaire: { type: questionnaireSchema, required: true }
});

const Attendance = mongoose.model<IAttendance>('Attendance', attendanceSchema);

export { Attendance };