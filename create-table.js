const mysql      = require('mysql2')
const connection = mysql.createConnection({
    host     : '127.0.0.1',
    port     : 3307,
    user     : 'root',
    password : '',
    database : 'api_estudo'
})


//===================CRIANDO A TABELA==================
function createTable(conn){
    const sql = `CREATE TABLE IF NOT EXISTS clientes(
                ID int NOT NULL AUTO_INCREMENT,
                Nome varchar(50) NOT NULL,
                CPF char(11)  NOT NULL,

                PRIMARY KEY(ID)
                ); `

//========================IMPRIMINDO SE CASO DER CERTO A CRIAÇÃO DA TABELA==============
conn.query(sql, (error, results, field) => {
    if(error) return console.log(error)
    console.log('Tabela criada com sucesso!!')
})
}

//mensagem de erro se der errado ou certo
connection.connect((err) => {
    if(err) return console.log(err);
    console.log('conectado!')
    createTable(connection)
    
})



