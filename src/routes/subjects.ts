import { Router, Request, Response } from 'express';
import { Subject } from '../models/subject';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const subjectData = req.body;
        const subject = await Subject.create(subjectData);
        res.status(201).json(subject);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar disciplina', error });
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter disciplinas', error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const subject = await Subject.findOne({ id: req.params.id });
        if (!subject) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }
        res.json(subject);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter disciplina', error });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const updatedSubject = await Subject.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (!updatedSubject) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }
        res.json({ message: 'Disciplina atualizada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar disciplina', error });
    }
});

router.delete('/:id', async (req, res: Response) => {
    try {
        const deletedSubject = await Subject.findOneAndDelete({ id: req.params.id });
        if (!deletedSubject) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir disciplina', error });
    }
});

export default router;