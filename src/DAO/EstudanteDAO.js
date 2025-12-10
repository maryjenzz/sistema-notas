const Estudante = require('../Models/Estudante');

/**
 * Insere um novo estudante no banco de dados.
 * @param {object} dados - Objeto contendo nome, nota1, nota2, nota3.
 * @returns {Promise<object>} O novo estudante inserido.
 */
const inserir = async (dados) => {
    // O Mongoose usará o schema para validar e calcular a média (virtual)
    const novoEstudante = new Estudante(dados);
    return await novoEstudante.save();
};

/**
 * Busca todos os estudantes.
 * @returns {Promise<Array<object>>} Lista de todos os estudantes, incluindo a média virtual.
 */
const listarTodos = async () => {
    // 1. Encontra todos os documentos.
    const estudantes = await Estudante.find().select('-__v'); 
    
    // 2. Mapeia para converter em objeto JavaScript e usar os "getters" (incluindo o virtual 'media')
    // O toJSON/toObject foi configurado no Estudante.js, garantindo que o virtual 'media' seja incluído.
    return estudantes.map(estudante => estudante.toJSON());
};

/**
 * Busca um estudante pelo nome.
 * @param {string} nome - O nome do estudante a ser buscado.
 * @returns {Promise<object|null>} O estudante encontrado ou null.
 */
const buscarPorNome = async (nome) => {
    return await Estudante.findOne({ nome: nome }).select('-__v').lean();
};

/**
 * Atualiza as notas de um estudante.
 * @param {string} nome - O nome do estudante a ser atualizado (chave de busca).
 * @param {object} novasNotas - Objeto contendo as novas nota1, nota2 e nota3.
 * @returns {Promise<object|null>} O estudante atualizado (antes da atualização) ou null.
 */
const editar = async (nome, novasNotas) => {
    // Usamos findOneAndUpdate para atualizar as notas.
    // { new: false } retorna o documento antes da atualização, 
    // mas o virtual 'media' será recalculado no front-end ou na próxima leitura.
    return await Estudante.findOneAndUpdate(
        { nome: nome },
        { 
            nota1: novasNotas.nota1, 
            nota2: novasNotas.nota2, 
            nota3: novasNotas.nota3 
        }
    );
};

/**
 * Remove um estudante pelo nome.
 * @param {string} nome - O nome do estudante a ser removido.
 * @returns {Promise<object|null>} O documento removido ou null.
 */
const excluir = async (nome) => {
    return await Estudante.findOneAndDelete({ nome: nome });
};

module.exports = {
    inserir,
    listarTodos,
    buscarPorNome,
    editar,
    excluir
};