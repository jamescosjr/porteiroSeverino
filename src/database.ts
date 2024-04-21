import mongoose from 'mongoose';

const connectDB = async (databaseURL: string) => {
    try {
        await mongoose.connect(databaseURL);
        console.log('Conexão bem sucedida com o banco de dados');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        process.exit(1);
    }
};

export default connectDB;