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
progettiUtenti.post('/visualizzaProgettiUtenti', function (req, res) {
    username = req.body.username;
    sql_connection.query('SELECT utenti.*,'+
		'progetti.nome_progetto,'+
        'progetti.descrizione_progetto,'+
        'utenti_x_progetti.id_utente,'+
        'utenti_x_progetti.id_progetto'+
        'FROM utenti_x_progetti'+
        'left outer join utenti on utenti.id_utente = utenti_x_progetti.id_utente'+
        'left OUTER join progetti on progetti.id_progetto = utenti_x_progetti.id_progetto'+
        'WHERE utenti.id_utente = 1="'+ idUser+ '"', function (err, rows, next) {
        if (err) throw err;
        res.send(rows);
    });
})


/*
progetti.post('/progetti/', function (req, res) {
    sql_connection.query("SELECT nome_progetto from progetti", function (err, rows, next) {
        console.log(rows);
        res.send(rows);
    });

    sql_connection.query("SELECT descrizione_progetto FROM progetti", function (err, rows, next) {
        console.log(rows);
        res.send(rows);
    });

})//fine post progetti
*/