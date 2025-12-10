# 📚 APINOTAS - Sistema de Gerenciamento de Notas

O APINOTAS é um sistema web completo (CRUD) desenvolvido para o gerenciamento de notas de estudantes. Ele permite o cadastro, listagem, edição e exclusão de registros, incluindo o cálculo automático da média das notas.

## 🚀 Funcionalidades

  * **Cadastro:** Insere novos estudantes e suas notas (Nota 1, Nota 2, Nota 3).
  * **Listagem:** Exibe todos os estudantes cadastrados, suas notas individuais e a média calculada.
  * **Edição:** Permite a alteração das notas de um estudante existente.
  * **Exclusão:** Remove um registro de estudante do sistema.
  * **Cálculo Automático de Média:** A média é calculada com a fórmula $(\text{nota1} + \text{nota2} + \text{nota3}) / 3$ e formatada para exibir **apenas uma casa decimal** (ex: 9.9, 8.1, 10.0).

## 💻 Tecnologias Utilizadas

Este projeto utiliza o *stack* MERN simplificado (substituindo React por Handlebars no Front-end):

| Categoria | Tecnologia | Finalidade |
| :--- | :--- | :--- |
| **Backend** | **Node.js** | Ambiente de execução JavaScript. |
| **Framework Web** | **Express** | Lida com rotas e servidor HTTP. |
| **Banco de Dados** | **MongoDB** (Atlas) | Banco de dados NoSQL. |
| **ORM/ODM** | **Mongoose** | Facilita a modelagem e interação com o MongoDB. |
| **Templates (Frontend)** | **Express-Handlebars** | Motor de *templates* para renderização dinâmica das páginas. |
| **Configuração** | **Dotenv** | Gerenciamento de variáveis de ambiente. |

## 📂 Estrutura do Projeto

A estrutura do projeto segue uma arquitetura modular para separar a lógica de apresentação, roteamento e acesso a dados:

```
APINOTAS/
├── node_modules/
├── public/
│   ├── css/
│   └── icons/
├── src/
│   ├── DAO/
│   │   └── EstudanteDAO.js   (Lógica CRUD)
│   ├── database/
│   │   └── conexao.js        (Conexão Mongoose)
│   ├── models/
│   │   └── Estudante.js      (Schema do Mongoose e Média Virtual)
│   └── routes/
│       └── routes.js         (Rotas da API: /api/notas, /api/inserir, etc.)
├── views/
│   ├── layouts/
│   │   └── main.handlebars
│   └── (Páginas): cadastro.handlebars, editar.handlebars, index.handlebars, listagem.handlebars
├── .env                      (Variáveis de ambiente, URI do MongoDB)
├── index.js                  (Configuração do Express e Servidor)
├── package-lock.json
└── package.json
```

## 🗺️ Rotas da Aplicação

### Rotas do Front-end (Views)

| Rota | Descrição | Arquivo Handlebars |
| :--- | :--- | :--- |
| `/` | Página inicial com links de navegação | [cite_start]`index.handlebars` [cite: 110] |
| `/cadastro` | Formulário para inserir novas notas | [cite_start]`cadastro.handlebars` [cite: 111] |
| `/listagem` | Exibe a tabela de notas de todos os estudantes | [cite_start]`listagem.handlebars` [cite: 111] |
| `/editar/:nome` | Formulário de edição de notas para um estudante específico | [cite_start]`editar.handlebars` [cite: 112] |

### Rotas da API (Backend)

| Método | Endpoint | Descrição | Implementação |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/notas` | Retorna a lista completa de estudantes e suas notas (JSON). | `listarTodos` (DAO) |
| `POST` | `/api/notas/inserir` | Insere um novo registro de estudante e notas. | `inserir` (DAO) |
| `POST` | `/api/editar/:nome` | Atualiza as notas do estudante especificado. | `editar` (DAO) |
| `DELETE` (via POST com `_method`) | `/api/excluir/:nome` | Remove o registro do estudante especificado. | `excluir` (DAO) |
