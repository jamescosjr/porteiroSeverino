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

router.get('/:id', async (req, res) => {
    try {
        const professorId = new mongoose.Types.ObjectId(req.params.id);
        const professor = await Professor.findById(professorId);
        if (!professor) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }
        res.json(professor);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter professor', error });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const professorId = new mongoose.Types.ObjectId(req.params.id);
        const professorData = req.body;
        const updatedProfessor = await Professor.findByIdAndUpdate(professorId, professorData, { new: true });
        if (!updatedProfessor) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }
        res.json(updatedProfessor);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar professor', error });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const professorId = new mongoose.Types.ObjectId(req.params.id);
        const deletedProfessor = await Professor.findByIdAndDelete(professorId);
        if (!deletedProfessor) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir professor', error });
    }
});

router.post('/:profId/subjects/:subjId', async (req, res) => {
    try {
        const { profId, subjId } = req.params;
        if (!mongoose.isValidObjectId(profId) || !mongoose.isValidObjectId(subjId)) {
            return res.status(400).json({ message: 'IDs inválidos' });
        }

        const professorId = new mongoose.Types.ObjectId(profId);
        const subjectId = new mongoose.Types.ObjectId(subjId);

        const professor = await Professor.findById(professorId);
        const subject = await Subject.findById(subjectId);

        if (!professor || !subject) {
            return res.status(404).json({ message: 'Professor ou Disciplina não encontrados' });
        } 

        if (professor.subjects.includes(subjectId)) {
            return res.status(400).json({ message: 'Professor já associado à disciplina' });
        }

        professor.subjects.push(subjectId);
        await professor.save();

        res.json({ message: 'Professor associado à disciplina com sucesso' });
    }   catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao associar professor à disciplina', error });
    }
});

router.delete('/:profId/subjects/:subjId', async (req, res) => {
    try {
        const { profId, subjId } = req.params;
        if (!mongoose.isValidObjectId(profId) || !mongoose.isValidObjectId(subjId)) {
            return res.status(400).json({ message: 'IDs inválidos' });
        }

        const professorId = new mongoose.Types.ObjectId(profId);
        const subjectId = new mongoose.Types.ObjectId(subjId);

        const professor = await Professor.findById(professorId);

        if (!professor) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }

        professor.subjects = professor.subjects.filter((subjectId: mongoose.Types.ObjectId) => !subjectId.equals(subjectId));
        await professor.save();

        res.json({ message: 'Professor desassociado da disciplina com sucesso' });
    }   catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao desassociar professor da disciplina', error });
    }
});

export default router;