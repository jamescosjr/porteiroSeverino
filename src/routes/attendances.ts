import { Router } from "express";
import { Attendance } from "../models/attendance";
import { Class } from "../models/class";
import { Professor } from "../models/professor";

const router = Router();

router.post('/:classId/attendance/start', async (req, res) => {
    try {
        const { classId } = req.params;
        const { studentId, feelings, meme, villain, expectations, mood, professorEmail } = req.body;

        if (!studentId || !feelings || !meme || !villain || !expectations || !mood || !professorEmail) {
            return res.status(400).json({ message: 'Todos os campos do questionário devem ser preenchidos, incluindo professorEmail' });
        }

        const classExists = await Class.exists({ classId });
        if (!classExists) {
            return res.status(404).json({ message: 'Turma não encontrada' });
        }

        const professorExists = await Professor.exists({ email: professorEmail });
        if (!professorExists) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }
        
        const startTime = new Date();
        const attendance = new Attendance({ 
            classId, 
            studentId, 
            startTime,
            questionnaire: {
                feelings,
                meme,
                villain,
                expectations,
                mood
            }
        });

        await attendance.save();
        res.status(201).json(attendance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao marcar a presença', error });
    }
});

router.post('/:classId/attendance/end', async (req, res) => {
    try {
        const { classId } = req.params;
        const { studentId } = req.body;
        const endTime = new Date();
        await Attendance.findByIdAndUpdate(
            { classId, studentId, endTime: { $exists: false } },
            { endTime }
        );
        res.json({ message: 'Presença registrada com sucesso' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao marcar o término da aula', error });
    }
});

export default router;