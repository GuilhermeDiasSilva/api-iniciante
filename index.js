const express = require('express')
const app     = express()
const port    = 3000 //porta padrão
const mysql   = require('mysql2')

app.use(express.json())
app.get('/', (req, res) => res.json({ message: 'Está Funcionado!'}))


//inicia o servidor
app.listen(port)
console.log('API funcionando!');

function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
        host     : '127.0.0.1',
        port     : 3307,
        user     : 'root',
        password : '',
        database : 'api_estudo'
    });
  // função que executará consultas SQL no banco usando uma conexão que será criada a cada uso
    connection.query(sqlQry, (error, results, fields) => {
        if(error) 
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('executou!');
    });
}

//===================Listou os clientes=============
app.get('/clientes', (req, res) => {
    execSQLQuery('SELECT * FROM clientes', res);
})
// ===============Buscou por ID============
app.get('/clientes/:id?', (req, res)=>{
    let filter = ''
    if(req.params.id) filter = 'WHERE ID = ' + parseInt(req.params.id)
    execSQLQuery('SELECT * FROM clientes ' + filter,res)
})
//==================Deletando==================
app.delete('/clientes/:id', (req, res)=>{
    execSQLQuery('DELETE FROM clientes WHERE ID = ' + parseInt(req.params.id), res)
})

//=====================insert======================
app.post('/clientes', (req,res)=>{
    const nome = req.body.nome
    const cpf  = req.body.cpf
    execSQLQuery(`INSERT INTO clientes(nome, cpf) VALUES ('${nome}', '${cpf}')`, res)
})

//====================atualizando====================
app.patch('/clientes/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const nome = req.body.nome
    const cpf = req.body.cpf
    execSQLQuery(`UPDATE clientes SET nome='${nome}' , cpf='${cpf}' WHERE ID=${id}`, res)
})

