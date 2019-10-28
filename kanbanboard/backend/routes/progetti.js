var progetti = require('express').Router();
var sql_connection = require('../db_connector');

// qui visualizza la lista di tutti gli utenti
progetti.get('/visualizzaProgetti', function (req, res) {
    sql_connection.query('SELECT * from progetti', function (err, rows, next) {
        if (err) throw err;
        res.send(rows);
    });
})

//richiesta per utenti x progetto
progetti.post('/visualizzaProgettiUtenti/', function (req, res) {
    id = req.body.id;
    console.log('ProgettoUtente entrato')
    console.log("id: " + id);
    sql_connection.query('SELECT utenti.nome_utente, ' +
        'progetti.nome_progetto, ' +
        'progetti.descrizione_progetto, ' +
        'utenti_x_progetti.id_utente, ' +
        'utenti_x_progetti.id_progetto ' +
        'FROM utenti_x_progetti ' +
        'left outer join utenti on utenti.id_utente = utenti_x_progetti.id_utente ' +
        'left OUTER join progetti on progetti.id_progetto = utenti_x_progetti.id_progetto ' +
        'WHERE utenti.id_utente = "' + id + '" ORDER BY progetti.nome_progetto ASC', function (err, rows, next) {
        console.log(rows)
            if (err) throw err;
            res.send(rows);
        });


})

module.exports = progetti;