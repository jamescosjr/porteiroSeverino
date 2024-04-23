const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
import { Attendance } from "../../models/attendance";
import { Student } from "../../models/student";

describe('Attendance Model Test', () => {
    let mongoServer: any;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        await Attendance.deleteMany({});
        await Student.deleteMany({});
    });

    test('should create an attendance', async () => {
        const student = new Student({ email: 'test@example.com', name: 'Test Student' });
        await student.save();

        const attendanceData = {
            classId: 'class01',
            studentId: student.email,
            startTime: new Date(),
            questionnaire: {
                feelings: 'good',
                meme: 'funny',
                villain: 'none',
                expectations: 'high',
                mood: 'happy'
            }
        };

        const attendance = new Attendance(attendanceData);
        await attendance.save();

        expect(attendance.studentId).toBe(student._id.toString());
        expect(attendance.classId).toBe('class01');
        expect(attendance.questionnaire.feelings).toBe('good');
    });

    test('should handle error when student not found', async () => {
        const attendanceData = {
            classId: 'class01',
            studentId: 'nonexistent@example.com',
            startTime: new Date(),
            questionnaire: {
                feelings: 'good',
                meme: 'funny',
                villain: 'none',
                expectations: 'high',
                mood: 'happy'
            }
        };

        const attendance = new Attendance(attendanceData);

        await expect(attendance.save()).rejects.toThrow('Estudante não encontrado');
    });
});