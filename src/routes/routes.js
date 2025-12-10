const express = require('express');
const router = express.Router();
const EstudanteDAO = require('../DAO/EstudanteDAO');

// Middleware para simular método DELETE (como usado no listagem.handlebars)
// Este trecho é necessário porque o HTML não suporta diretamente DELETE/PUT em formulários.
router.use((req, res, next) => {
    if (req.body && req.body._method) {
        req.method = req.body._method.toUpperCase();
        delete req.body._method; // Remove o campo do corpo para limpeza
    }
    next();
});

// Rota para Listagem de Notas (GET /api/notas)
router.get('/notas', async (req, res) => {
    try {
        const estudantes = await EstudanteDAO.listarTodos();
        // O front-end (listagem.handlebars) espera um JSON com a lista de estudantes.
        res.json(estudantes); 
    } catch (error) {
        console.error("Erro ao listar estudantes:", error);
        res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
});

// Rota para Inserção de Dados (POST /api/notas/inserir)
router.post('/notas/inserir', async (req, res) => {
    try {
        const { nome, nota1, nota2, nota3 } = req.body;
        
        // Conversão de string (do formulário) para número (float)
        const notas = {
            nome,
            nota1: nota1 ? parseFloat(nota1) : null,
            nota2: nota2 ? parseFloat(nota2) : null,
            nota3: nota3 ? parseFloat(nota3) : null,
        };

        await EstudanteDAO.inserir(notas);
        
        // Redireciona de volta para a página inicial após o sucesso
        res.redirect('/'); 
    } catch (error) {
        console.error("Erro ao inserir estudante:", error);
        // Em caso de erro (ex: nome duplicado), redireciona com uma mensagem (opcional)
        res.status(500).send('Erro ao cadastrar nota. Verifique os dados.');
    }
});

// Rota para Edição de Dados (POST /api/editar/:nome)
router.post('/editar/:nome', async (req, res) => {
    try {
        const nomeAntigo = req.params.nome;
        const { nota1, nota2, nota3 } = req.body;

        // Conversão de string (do formulário) para número (float)
        const novasNotas = {
            nota1: nota1 ? parseFloat(nota1) : null,
            nota2: nota2 ? parseFloat(nota2) : null,
            nota3: nota3 ? parseFloat(nota3) : null,
        };

        await EstudanteDAO.editar(nomeAntigo, novasNotas);
        
        // Redireciona para a listagem após a edição
        res.redirect('/listagem'); 
    } catch (error) {
        console.error("Erro ao editar estudante:", error);
        res.status(500).send('Erro ao editar nota.');
    }
});


// Rota para Exclusão de Dados (POST /api/excluir/:nome - tratado como DELETE pelo middleware)
router.delete('/excluir/:nome', async (req, res) => {
    try {
        const nomeEstudante = req.params.nome;
        await EstudanteDAO.excluir(nomeEstudante);
        
        // Redireciona para a listagem após a exclusão
        res.redirect('/listagem'); 
    } catch (error) {
        console.error("Erro ao excluir estudante:", error);
        res.status(500).send('Erro ao excluir nota.');
    }
});


module.exports = router;