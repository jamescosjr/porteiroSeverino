import { Router, Request, Response } from 'express';
import { Student } from '../models/students';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const alunoData = req.body;
        const aluno = await Student.create(alunoData);
        res.status(201).json(aluno);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar aluno', error });
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const alunos = await Student.find();
        res.json(alunos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter alunos', error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter aluno', error });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        await Student.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: 'Aluno atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar aluno', error });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const alunoId = req.params.id;
        const aluno = await Student.findByIdAndDelete(alunoId);
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir aluno', error });
    }
});

export default router;