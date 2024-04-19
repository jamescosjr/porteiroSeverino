import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL: string | undefined = process.env.DATABASE_URL;
if (!DATABASE_URL) {
    throw new Error('DATABASE_URL não está definido no arquivo .env');
}

mongoose.connect(DATABASE_URL)
    .then(() => {
        console.log('Conectado ao MongoDB');
    }).catch((error) => {
        console.error('Erro ao conectar ao MongoDB:', error);
    });

export default mongoose;