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
    idUser = req.body.idUser;
    console.log("id:" + idUser);
    sql_connection.query('SELECT utenti.nome_utente, '+
		'progetti.nome_progetto, '+
        'progetti.descrizione_progetto, '+
        'utenti_x_progetti.id_utente, '+
        'utenti_x_progetti.id_progetto '+
        'FROM utenti_x_progetti '+
        'left outer join utenti on utenti.id_utente = utenti_x_progetti.id_utente '+
        'left OUTER join progetti on progetti.id_progetto = utenti_x_progetti.id_progetto '+
        'WHERE utenti.id_utente = "'+ idUser + '"', function (err, rows, next) {
        if (err) throw err;
        res.send(rows[0]);
    });
});

//query per visualizzare il progetto aperto nella lavagna
progetti.post('/visualizzaProgettoAttivo/', function(req,res){
    idProgetto = req.body.idProgetto;
    sql_connection.query('SELECT utenti.nome_utente, '+
		'progetti.nome_progetto, '+
        'progetti.descrizione_progetto, '+
        'utenti_x_progetti.id_utente, '+
        'utenti_x_progetti.id_progetto '+
        'FROM utenti_x_progetti '+
        'left outer join utenti on utenti.id_utente = utenti_x_progetti.id_utente '+
        'left OUTER join progetti on progetti.id_progetto = utenti_x_progetti.id_progetto '+
        'WHERE utenti.id_utente = "'+ idUser + '"', function (err, rows, next) {
        if (err) throw err;
        res.send(rows[0]);
    });
});

module.exports = progetti;