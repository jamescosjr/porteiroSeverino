import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { Class } from '../../models/class';

describe('Class Model Test', () => {
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
        await Class.deleteMany({});
    });

    test('should create a class', async () => {
        const classData = {
            name: 'Math',
            subjects: 'Algebra',
            classId: 'math101',
            students: ['student1', 'student2'],
            professors: ['professor1', 'professor2']
        };

        const newClass = new Class(classData);
        await newClass.save();

        const foundClass = await Class.findOne({ classId: 'math101' });

        expect(foundClass).toBeDefined();
        expect(foundClass.name).toBe(classData.name);
        expect(foundClass.subjects).toBe(classData.subjects);
        expect(foundClass.classId).toBe(classData.classId);
        expect(foundClass.students).toEqual(classData.students);
        expect(foundClass.professors).toEqual(classData.professors);
    });

    test('should not allow duplicate classId', async () => {
        const classData1 = {
            name: 'Math',
            subjects: 'Algebra',
            classId: 'math101',
            students: ['student1', 'student2'],
            professors: ['professor1', 'professor2']
        };

        const classData2 = {
            name: 'History',
            subjects: 'World History',
            classId: 'math101',
            students: ['student3', 'student4'],
            professors: ['professor3', 'professor4']
        };

        const class1 = new Class(classData1);
        await class1.save();

        const class2 = new Class(classData2);

        await expect(class2.save()).rejects.toThrow('duplicate key error');
    });
});