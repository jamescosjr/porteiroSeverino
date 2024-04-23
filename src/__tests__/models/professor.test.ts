import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { Professor } from '../../models/professor';

describe('Professor Model Test', () => {
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
        await Professor.deleteMany({});
    });

    test('should create a professor', async () => {
        const professorData = {
            name: 'John Doe',
            email: 'john@example.com',
            subjects: ['Math', 'Physics']
        };

        const newProfessor = new Professor(professorData);
        await newProfessor.save();

        const foundProfessor = await Professor.findOne({ email: 'john@example.com' });

        expect(foundProfessor).toBeDefined();
        expect(foundProfessor.name).toBe(professorData.name);
        expect(foundProfessor.email).toBe(professorData.email);
        expect(foundProfessor.subjects).toEqual(professorData.subjects);
    });

    test('should not allow duplicate email', async () => {
        const professorData1 = {
            name: 'John Doe',
            email: 'john@example.com',
            subjects: ['Math', 'Physics']
        };

        const professorData2 = {
            name: 'Jane Doe',
            email: 'john@example.com',
            subjects: ['Chemistry', 'Biology']
        };

        const professor1 = new Professor(professorData1);
        await professor1.save();

        const professor2 = new Professor(professorData2);

        await expect(professor2.save()).rejects.toThrow('duplicate key error');
    });
});