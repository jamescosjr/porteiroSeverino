import { Router, Request, Response } from 'express';
import ProfessorModel from '../models/Professor';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const professorData = req.body;
        const professor = await ProfessorModel.create(professorData);
        res.status(201).json(professor);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar professor', error });
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const professores = await ProfessorModel.find();
        res.json(professores);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter professores', error });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const professorId = req.params.id;
        const professorData = req.body;
        const updatedProfessor = await ProfessorModel.findByIdAndUpdate(professorId, professorData, { new: true });
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
        const professorId = req.params.id;
        const deletedProfessor = await ProfessorModel.findByIdAndDelete(professorId);
        if (!deletedProfessor) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir professor', error });
    }
});

export default router;