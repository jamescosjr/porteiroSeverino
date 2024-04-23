import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { Student } from '../../models/student';

describe('Student Model Test', () => {
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
        await Student.deleteMany({});
    });

    test('should create a student', async () => {
        const studentData = {
            name: 'John Doe',
            email: 'john@example.com',
            classId: 'class01'
        };

        const newStudent = new Student(studentData);
        await newStudent.save();

        const foundStudent = await Student.findOne({ email: 'john@example.com' });

        expect(foundStudent).toBeDefined();
        expect(foundStudent.name).toBe(studentData.name);
        expect(foundStudent.email).toBe(studentData.email);
        expect(foundStudent.classId).toBe(studentData.classId);
    });

    test('should not allow duplicate email', async () => {
        const studentData1 = {
            name: 'John Doe',
            email: 'john@example.com',
            classId: 'class01'
        };

        const studentData2 = {
            name: 'Jane Doe',
            email: 'john@example.com',
            classId: 'class02'
        };

        const student1 = new Student(studentData1);
        await student1.save();

        const student2 = new Student(studentData2);

        await expect(student2.save()).rejects.toThrow('duplicate key error');
    });
});