const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente do .env, garantindo que DB_URI esteja disponível
dotenv.config();

const connectDb = async () => {
    try {
        const uri = process.env.DB_URI;
        if (!uri) {
            console.error("Erro: A variável de ambiente DB_URI não está definida. Verifique seu arquivo .env.");
            // Não joga erro fatal, apenas alerta
            return; 
        }

        await mongoose.connect(uri);

        console.log("Conexão com o MongoDB estabelecida com sucesso!");

    } catch (error) {
        console.error("Erro ao conectar com o MongoDB:", error.message);

    }
};

module.exports = connectDb;