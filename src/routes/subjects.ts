import { Router } from 'express';
import { Subject } from '../models/subject';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter disciplinas', error });
    }
});

router.post('/', async (req, res) => {
    try {
        const newSubject = new Subject(req.body);
        await newSubject.save();
        res.status(201).json(newSubject);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar disciplina', error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }
        res.json(subject);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter disciplina', error });
    }
});

router.put('/:id', async (req,res) => {
    try {
        await Subject.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: 'Disciplina atualizada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar disciplina', error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedSubject = await Subject.findByIdAndDelete(req.params.id);
        if (!deletedSubject) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }
        res.json({ message: 'Disciplina deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar disciplina', error });
    }
});

export default router;