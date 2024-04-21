import { Router, Request, Response } from 'express';
import { Class } from '../models/class';
import { Student } from '../models/students';
import mongoose from 'mongoose';

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

router.put('/:id', async (req: Request, res: Response) => {
    const turmaId = new mongoose.Types.ObjectId(req.params.id);
    const turmaData = req.body;

    try {
        const updatedTurma = await Class.findByIdAndUpdate(turmaId, turmaData, { new: true });
        if (!updatedTurma) {
            return res.status(404).json({ message: 'Turma não encontrada' });
        }
        res.json(updatedTurma);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar turma', error });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const turmaId = new mongoose.Types.ObjectId(req.params.id);

    try {
        const deletedTurma = await Class.findByIdAndDelete(turmaId);
        if (!deletedTurma) {
            return res.status(404).json({ message: 'Turma não encontrada' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir turma', error });
    }
});

router.post('/:classId/students/:studentId', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.classId) || !mongoose.isValidObjectId(req.params.studentId)) {
        return res.status(400).json({ message: 'IDs inválidos' });
    }

    const classId = new mongoose.Types.ObjectId(req.params.classId);
    const studentId = new mongoose.Types.ObjectId(req.params.studentId);

    try {
        const classObj = await Class.findById(classId);
        const student = await Student.findById(studentId);

        if (!classObj || !student) {
            return res.status(404).json({ message: 'Turma ou aluno não encontrado' });
        }

        if (classObj.students.includes(studentId)) {
            return res.status(400).json({ message: 'Aluno já está matriculado na turma' });
        }

        classObj.students.push(studentId);
        await classObj.save();

        res.json({ message: 'Aluno matriculado na turma com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao matricular aluno na turma' });
    }
});

router.delete('/:classId/students/:studentId', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.classId) || !mongoose.isValidObjectId(req.params.studentId)) {
        return res.status(400).json({ message: 'IDs inválidos' });
    }

    const classId = new mongoose.Types.ObjectId(req.params.classId);
    const studentId = new mongoose.Types.ObjectId(req.params.studentId);

    try {
        const classObj = await Class.findById(classId);

        if (!classObj) {
            return res.status(404).json({ message: 'Turma não encontrada' });
        }

        classObj.students = classObj.students.filter((sId) => !sId.equals(studentId));
        await classObj.save();

        res.json({ message: 'Aluno removido da turma com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao remover aluno da turma' });
    }
});

export default router;