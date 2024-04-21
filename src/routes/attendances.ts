import { Router } from "express";
import { Attendance } from "../models/attendance";

const router = Router();

router.post('/:classId/attendance/start', async (req, res) => {
    try {
        const { classId } = req.params;
        const { studentId, feelings, meme, villain, expectations, mood } = req.body;
        const startTime = new Date();
        
        if (!studentId || !feelings || !meme || !villain || !expectations || !mood) {
            return res.status(400).json({ message: 'Todos os campos do questionário devem ser preenchidos' });
        }
        
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