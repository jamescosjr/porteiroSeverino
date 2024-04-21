import { Router, Request, Response } from 'express';
import { Professor } from '../models/professor';
import { Subject } from '../models/subject';
import mongoose from 'mongoose';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const professorData = req.body;
        const professor = await Professor.create(professorData);
        res.status(201).json(professor);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar professor', error });
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const professores = await Professor.find();
        res.json(professores);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter professores', error });
    }
});

router.get('/:email', async (req, res) => {
    try {
        const professorEmail = req.params.email;
        const professor = await Professor.findOne({ email: professorEmail });
        if (!professor) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }
        res.json(professor);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter professor', error });
    }
});

router.put('/:email', async (req: Request, res: Response) => {
    try {
        const professorEmail = req.params.email;
        const professorData = req.body;
        const updatedProfessor = await Professor.findOneAndUpdate({ email: professorEmail }, professorData, { new: true });
        if (!updatedProfessor) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }
        res.json(updatedProfessor);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar professor', error });
    }
});

router.delete('/:email', async (req: Request, res: Response) => {
    try {
        const professorEmail = req.params.email;
        const deletedProfessor = await Professor.findOneAndDelete({ email: professorEmail });
        if (!deletedProfessor) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir professor', error });
    }
});

router.post('/:email/subjects/:subjId', async (req, res) => {
    try {
        const { email, subjId } = req.params;
        const subject = await Subject.findById(subjId);

        if (!subject) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }

        const updatedProfessor = await Professor.findOneAndUpdate({ email }, { $addToSet: { subjects: subjId } }, { new: true });

        if (!updatedProfessor) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }

        res.json({ message: 'Disciplina associada ao professor com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao associar disciplina ao professor', error });
    }
});

router.delete('/:email/subjects/:subjId', async (req, res) => {
    try {
        const { email, subjId } = req.params;
        const subject = await Subject.findById(subjId);

        if (!subject) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }

        const updatedProfessor = await Professor.findOneAndUpdate({ email }, { $pull: { subjects: subjId } }, { new: true });

        if (!updatedProfessor) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }

        res.json({ message: 'Disciplina removida do professor com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao desassociar disciplina do professor', error });
    }
});

export default router;