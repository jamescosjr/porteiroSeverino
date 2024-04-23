import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { Subject } from '../../models/subject';

describe('Subject Model Test', () => {
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
        await Subject.deleteMany({});
    });

    test('should create a subject', async () => {
        const subjectData = {
            id: 'subj01',
            name: 'Mathematics'
        };

        const newSubject = new Subject(subjectData);
        await newSubject.save();

        const foundSubject = await Subject.findOne({ id: 'subj01' });

        expect(foundSubject).toBeDefined();
        expect(foundSubject.id).toBe(subjectData.id);
        expect(foundSubject.name).toBe(subjectData.name);
    });

    test('should not allow duplicate id', async () => {
        const subjectData1 = {
            id: 'subj01',
            name: 'Mathematics'
        };

        const subjectData2 = {
            id: 'subj01',
            name: 'Physics'
        };

        const subject1 = new Subject(subjectData1);
        await subject1.save();

        const subject2 = new Subject(subjectData2);

        await expect(subject2.save()).rejects.toThrow('duplicate key error');
    });
});