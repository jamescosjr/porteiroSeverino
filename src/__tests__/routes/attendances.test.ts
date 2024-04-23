import { Router } from "express";
import { Attendance } from "../../models/attendance";
import { Professor } from "../../models/professor";
import request from 'supertest';
import app from '../../app';

const router = Router();

describe('Attendance Routes', () => {
    test('should pass', () => {
      expect(1 + 1).toBe(2);
    });
  
    router.post('/:classId/attendance/start', async (req, res) => {
        try {
            const { classId } = req.params;
            const { studentId, feelings, meme, villain, expectations, mood, professorEmail } = req.body;
            const startTime = new Date();
            
            if (!studentId || !feelings || !meme || !villain || !expectations || !mood || !professorEmail) {
                return res.status(400).json({ message: 'Todos os campos do questionário devem ser preenchidos' });
            }
            
            const professor = await Professor.findOne({ email: professorEmail });
    
            if (!professor) {
                return res.status(404).json({ message: 'Professor não encontrado' });
            }
            
            const attendance = new Attendance({ 
                classId, 
                studentId, 
                startTime,
                professor: professor._id,
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
     });



export default router;