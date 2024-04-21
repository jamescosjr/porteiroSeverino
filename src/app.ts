import express from 'express';
import connectDB from './database';
import subjectsRouter from './routes/subjects';
import professorsRouter from './routes/professors';
import studentsRouter from './routes/students';
import classesRouter from './routes/classes';
import attendancesRouter from './routes/attendances';
import dotenv from 'dotenv';
import { Student } from './models/student';
import { Class } from './models/class';
import { Attendance } from './models/attendance';

dotenv.config();

const app = express();
app.use(express.json());

const DATABASE_URL: string | undefined = process.env.DATABASE_URL;
if (!DATABASE_URL) {
    throw new Error('DATABASE_URL não está definido no arquivo .env');
}

connectDB(DATABASE_URL);

// Verifica se os modelos já foram definidos antes de chamar connectDB
if (!Student || !Class || !Attendance) {
    throw new Error('Os modelos do Mongoose não foram definidos corretamente');
}

app.use('/subjects', subjectsRouter);
app.use('/professors', professorsRouter);
app.use('/students', studentsRouter);
app.use('/classes', classesRouter);
app.use('/attendances', attendancesRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

export default app;
