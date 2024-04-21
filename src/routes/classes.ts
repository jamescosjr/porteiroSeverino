import { Router, Request, Response } from 'express';
import { Class } from '../models/class';
import { Student } from '../models/student';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const turmaData = req.body;
        const turma = await Class.create(turmaData);
        res.status(201).json(turma);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar turma', error });
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const turmas = await Class.find();
        res.json(turmas);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter turmas', error });
    }
});

router.put('/:classId', async (req: Request, res: Response) => {
    const classId = req.params.classId;
    const turmaData = req.body;

    try {
        const updatedTurma = await Class.findOneAndUpdate({ classId }, turmaData, { new: true });
        if (!updatedTurma) {
            return res.status(404).json({ message: 'Turma não encontrada' });
        }
        res.json(updatedTurma);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar turma', error });
    }
});

router.delete('/:classId', async (req: Request, res: Response) => {
    const classId = req.params.classId;

    try {
        const deletedTurma = await Class.findOneAndDelete({ classId });
        if (!deletedTurma) {
            return res.status(404).json({ message: 'Turma não encontrada' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir turma', error });
    }
});

router.post('/:classId/students/:studentEmail', async (req, res) => {
    const classId = req.params.classId;
    const studentEmail = req.params.studentEmail;

    try {
        const classObj = await Class.findOne({ classId });
        const student = await Student.findOne({ email: studentEmail });

        if (!classObj || !student) {
            return res.status(404).json({ message: 'Turma ou aluno não encontrado' });
        }

        if (classObj.students.includes(student.email)) {
            return res.status(400).json({ message: 'Aluno já está matriculado na turma' });
        }

        classObj.students.push(student.email);
        await classObj.save();

        res.json({ message: 'Aluno matriculado na turma com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao matricular aluno na turma' });
    }
});

router.delete('/:classId/students/:studentEmail', async (req, res) => {
    const classId = req.params.classId;
    const studentEmail = req.params.studentEmail;

    try {
        const classObj = await Class.findOne({ classId });

        if (!classObj) {
            return res.status(404).json({ message: 'Turma não encontrada' });
        }

        classObj.students = classObj.students.filter((email: string) => email !== studentEmail);
        await classObj.save();

        res.json({ message: 'Aluno removido da turma com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao remover aluno da turma' });
    }
});

export default router;