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


});

progetti.post('/visualizzaProgettoById/', function (req, res) {
    id = req.body.id;
    sql_connection.query('SELECT * FROM progetti WHERE id_progetto= "' +
        id + '"', function (err, rows, next) {
            if (err) throw err;
            res.send(rows);
        })
});

/* RICERCA PROGETTO ALL'INTERNO DEL AREA UTENTE */
progetti.post('/cercaProgettiUtente/', function (req, res) {
    nome_progetto = req.body.nome_progetto;
    id = req.body.id;
    console.log('NomeProgetto');
    console.log(nome_progetto);
    console.log('Id_Utente');
    console.log(id);

    var query = 'SELECT progetti.*,' +
        ' utenti_x_progetti.id_progetto,' +
        ' utenti_x_progetti.id_utente' +
        ' FROM progetti' +
        ' join utenti_x_progetti on utenti_x_progetti.id_progetto = progetti.id_progetto' +
        ' AND utenti_x_progetti.id_utente = "' + id + '"' +
        ' WHERE progetti.nome_progetto LIKE "%' + nome_progetto + '%"' +
        ' OR upper(progetti.nome_progetto) LIKE "%' + nome_progetto + '%"' +
        ' OR lower(progetti.nome_progetto) LIKE "%' + nome_progetto + '%" ';

    sql_connection.query(query, function (err, rows, next) {
        console.log('cercaProgetto Lower');
        console.log(rows);
        if (err) throw err;
        res.send(rows);
    });
})
/* RICERCA PROGETTO ALL'INTERNO DEL AREA UTENTE */

/* RICERCA GLOBALE DEI PROGETTI ALL'INTENDO DEL DB */
progetti.post('/cercaProgettiGlobali/', function (req, res) {

    /*
    ricercaProgetto = req.body.nome_progetto;
    console.log('NomeProgetto');
    console.log(ricercaProgetto);*/

    /*VARIABILE PER LA RICERCA GLOBALE CON INPUT DI TESTO*/
    /*var querySearch = 'SELECT progetti.*' +
        ' FROM progetti' +
        ' WHERE progetti.nome_progetto LIKE "%' + nome_progetto + '%"' +
        ' OR upper(progetti.nome_progetto) LIKE "%' + nome_progetto + '%"' +
        ' OR lower(progetti.nome_progetto) LIKE "%' + nome_progetto + '%"';*/
    /*VARIABILE PER LA RICERCA GLOBALE CON INPUT DI TESTO*/

    var query = 'SELECT progetti.* FROM progetti';
    console.log('CercaProgettiGLobali');
    sql_connection.query(query, function (err, rows, next) {
        if (err) throw err;
        res.send(rows);
    })
})

/* RICERCA GLOBALE DEI PROGETTI ALL'INTENDO DEL DB */
/*
progetti.post('/cercaProgettiNoUtente/', function (req, res) {
    id = req.body.id;
    var query = 'SELECT progetti.*,' +
        ' utenti_x_progetti.id_utente' +
        ' FROM utenti_x_progetti' +
        ' JOIN progetti ON progetti.id_progetto = utenti_x_progetti.id_progetto' +
        ' WHERE utenti_x_progetti.id_utente NOT IN (' + id + ')';

    sql_connection.query(query, function (err, rows, next) {
        console.log('cercaProgettiNoUtente');
        console.log(rows);
        if (err) throw err;
        res.send(rows);
    });
})
*/

module.exports = progetti;