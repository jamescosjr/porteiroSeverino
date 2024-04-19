import { Router, Request, Response } from 'express';
import AlunoModel, { IAluno } from '../models/Aluno';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const alunoData = req.body;
        const aluno = await AlunoModel.create(alunoData);
        res.status(201).json(aluno);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar aluno', error });
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const alunos = await AlunoModel.find();
        res.json(alunos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter alunos', error });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const alunoId = req.params.id;
        const alunoData: Partial<IAluno> = req.body;
        const aluno = await AlunoModel.findByIdAndUpdate(alunoId, alunoData, { new: true });
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.json(aluno);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar aluno', error });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const alunoId = req.params.id;
        const aluno = await AlunoModel.findByIdAndDelete(alunoId);
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir aluno', error });
    }
});

export default router;