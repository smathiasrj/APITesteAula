// Importar Express
const express = require('express');

//Criar uma instância do Express
const app = express();

// Aceitar informações vindas do body
app.use(express.json());

//Definir a porta
const PORT = 3000;

/*
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



*/


// Banco de Dados Fake para Contatos
let contacts = []
let contactIdGenerator = 1

// Rota para buscar contatos
app.get('/contacts', (req, res) => {
    res.json(contacts);
});

// Rota para cadastrar contato (Aqui entram todos os campos do exercício!)
app.post('/contacts', (req, res) => {
    const { name, email, phone, birthDate, cep, neighborhood, street, number, state, city } = req.body;

    const contact = {
        id: contactIdGenerator++,
        name, email, phone, birthDate, cep, neighborhood, street, number, state, city
    };

    contacts.push(contact);
    res.json(contact);
});

// Rota para deletar contato usando JSON body
app.delete('/contacts', (req, res) => {
    const { id } = req.body;
    
    if (!id) {
        return res.status(400).json({ message: "ID é obrigatório no corpo da requisição!" });
    }

    contacts = contacts.filter(c => c.id !== parseInt(id));
    res.json({ message: `Contato com ID ${id} removido com sucesso!` });
});

// Rota para atualizar contato
app.put('/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, phone, birthDate, cep, neighborhood, street, number, state, city } = req.body;

    const index = contacts.findIndex(c => c.id === id);

    if (index !== -1) {
        contacts[index] = { id, name, email, phone, birthDate, cep, neighborhood, street, number, state, city };
        res.json(contacts[index]);
    } else {
        res.status(404).json({ message: "Contato não encontrado!" });
    }
});


// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
