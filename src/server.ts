import express from 'express';
import dotenv from 'dotenv';
import alunosRouter from './routes/alunos';
import professoresRouter from './routes/professores';
import turmasRouter from './routes/turmas';
import './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/alunos', alunosRouter);
app.use('/professores', professoresRouter);
app.use('/turmas', turmasRouter);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
