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
        'WHERE utenti.id_utente = "' + id + '"', function (err, rows, next) {
            console.log(rows);
            if (err) throw err;
            res.send(rows);
        });


})

progetti.post('/cercaProgettiUtente/', function (req, res) {
    nome_progetto = req.body.nome_progetto;
    id = req.body.id;
    console.log('NomeProgetto');
    console.log(nome_progetto);
    console.log('Id_Utente');
    console.log(id);

    sql_connection.query('SELECT progetti.*,' +
        'utenti_x_progetti.id_progetto,' +
        'utenti.id_utente ' +
        'FROM progetti ' +
        'left outer join utenti_x_progetti on utenti_x_progetti.id_progetto = progetti.id_progetto ' +
        'left outer join utenti on utenti.id_utente = utenti_x_progetti.id_utente ' +
        'WHERE progetti.nome_progetto = "' + nome_progetto + '" AND utenti_x_progetti.id_utente = "' + id + '"', function (err, rows, next) {
            console.log('cercaProgetto');
            console.log(rows);
            if (err) throw err;
            res.send(rows);
        });
})
/*
progetto.post('/cercaProgettiGlobali/',function(req,res){
    ricercaProgetto = req.body.nome_progetto;
    console.log('NomeProgetto');
    console.log(ricercaProgetto);
    sql_connection.query('SELECT progetti.*')
})*/
module.exports = progetti;