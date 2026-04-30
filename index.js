// Importar Express
const express = require('express');

//Criar uma instância do Express
const app = express();

// Aceitar informações vindas do body
app.use(express.json());

//Definir a porta
const PORT = 3000;

// Banco de Dados Fake e auto incremento
let students = []
let idGenerator = 1


//Definir a rota raiz (GET /)
app.get('/students', (req, res) => {
    res.status(201).json(students);
});

app.post('/students', (req, res) => {
    // Extrair as propriedades do corpo da requisição
    const { name, grade1, grade2 } = req.body

    // Criar o objeto aluno
    const student = {
        id: idGenerator++,
        name: name,
        grade1: grade1,
        grade2: grade2,
        average: (grade1 + grade2) / 2
    }

    // Adicionar o aluno ao banco de dados
    students.push(student)

    // Retornar o aluno criado
    res.json(student)


})

// rota de remoção (DELETE)
app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id)

    // Filtrar todos os alunos que não tem o id informado
    students = students.filter(s => s.id !== id)

    // Retorno de mensagem
    res.json({ message: "Aluno removido com sucesso!" })
})




// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
