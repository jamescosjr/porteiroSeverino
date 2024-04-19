import { Router, Request, Response } from 'express';
import TurmaModel from '../models/Turma';
import AlunoModel from '../models/Aluno';
import ProfessorModel from '../models/Professor';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const turmaData = req.body;
        const turma = await TurmaModel.create(turmaData);
        res.status(201).json(turma);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar turma', error });
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const turmas = await TurmaModel.find();
        res.json(turmas);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter turmas', error });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const turmaId = req.params.id;
        const turmaData = req.body;
        const updatedTurma = await TurmaModel.findByIdAndUpdate(turmaId, turmaData, { new: true });
        if (!updatedTurma) {
            return res.status(404).json({ message: 'Turma não encontrada' });
        }
        res.json(updatedTurma);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar turma', error });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const turmaId = req.params.id;
        const deletedTurma = await TurmaModel.findByIdAndDelete(turmaId);
        if (!deletedTurma) {
            return res.status(404).json({ message: 'Turma não encontrada' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir turma', error });
    }
});

router.post('/:turmaId/alunos', async (req: Request, res: Response) => {
    try {
        const { alunoId } = req.body;
        const { turmaId } = req.params;

        const turma = await TurmaModel.findById(turmaId);
        if (!turma) {
            return res.status(404).send({ message: "Turma não encontrada." });
        }

        const aluno = await AlunoModel.findById(alunoId);
        if (!aluno) {
            return res.status(404).send({ message: "Aluno não encontrado." });
        }

        await turma.adicionarAluno(aluno._id);
        res.status(200).send({ message: "Aluno adicionado à turma com sucesso." });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar aluno à turma', error });
    }
});

router.post('/:turmaId/professores', async (req: Request, res: Response) => {
    try {
        const { professorId } = req.body;
        const { turmaId } = req.params;

        const turma = await TurmaModel.findById(turmaId);
        if (!turma) {
            return res.status(404).send({ message: "Turma não encontrada." });
        }

        const professor = await ProfessorModel.findById(professorId);
        if (!professor) {
            return res.status(404).send({ message: "Professor não encontrado." });
        }

        await turma.adicionarProfessor(professor._id);
        res.status(200).send({ message: "Professor adicionado à turma com sucesso." });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar professor à turma', error });
    }
});

export default router;