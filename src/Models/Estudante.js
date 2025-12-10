const mongoose = require('mongoose');

// Define o esquema do Estudante
const EstudanteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true // Garante que não haja nomes duplicados
    },
    nota1: {
        type: Number,
        default: null // Permitir que a nota seja nula/opcional
    },
    nota2: {
        type: Number,
        default: null
    },
    nota3: {
        type: Number,
        default: null
    },
    // O campo 'media' será um campo virtual ou calculado, mas o Mongoose
    // nos permite adicionar getters para formatar os dados.
}, { 
    // Garante que o toJSON e toObject incluam getters e virtuals
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true }
});

// Adiciona um campo virtual para a média. 
// Ele não é armazenado no DB, mas é calculado sempre que o documento é acessado.
EstudanteSchema.virtual('media').get(function() {
    // Coleta as notas que não são nulas
    const notasValidas = [this.nota1, this.nota2, this.nota3].filter(nota => nota !== null && !isNaN(nota));

    if (notasValidas.length === 0) {
        return '-'; // Retorna '-' se não houver notas
    }

    const soma = notasValidas.reduce((acc, nota) => acc + nota, 0);
    const media = soma / notasValidas.length;
    
    // Retorna a média formatada com uma casa decimal (conforme o requisito)
    // toFixed(1) retorna uma string. Usamos parseFloat para garantir um número formatado.
    return parseFloat(media.toFixed(1)); // Ex: 9.9, 8.1, 10.0
});

// Cria e exporta o modelo Mongoose
const Estudante = mongoose.model('Estudante', EstudanteSchema);

module.exports = Estudante;