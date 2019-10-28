var project = require('express').Router();
var sql_connection = require('../db_connector');


//INSERT
project.post('/project/', function (req, res) {

  nome_progetto = req.body.nome_progetto;
  descrizione_progetto = req.body.descrizione_progetto;
  id_utente = req.body.id_utente;

  var query = "INSERT INTO progetti ( nome_progetto, descrizione_progetto) VALUES (" +
                  "'" + nome_progetto + "'," +
                  "'" + descrizione_progetto + "')";
  sql_connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    var id_progetto = rows['insertId'];
    console.log(rows)

    var queryUtenteProgetto = "INSERT INTO utenti_x_progetti (id_utente, id_progetto) VALUES (" +
                                  "'" + id_utente + "'," +
                                  "'" + id_progetto + "')";
    sql_connection.query(queryUtenteProgetto, function (err, rows, fields) {
      if(err) throw err;

    });

    res.send({ "creato": '1' });
    console.log("PROGETTO INSERITO");
  });
});   // fine INSERT




//UPDATE
project.post('/updateProject/', function (req, res) {

  nome_progetto = req.body.nome_progetto;
  descrizione_progetto = req.body.descrizione_progetto;
  id_progetto = req.body.id_progetto;

  var query = "UPDATE progetti set nome_progetto = '"+nome_progetto+"',"
                + "descrizione_progetto = '"+descrizione_progetto+ "',"
                + "WHERE id_progetto = '"+id_progetto+"'";
      sql_connection.query(query , function(err, rows, fields) {
        if (err) throw err;
        res.send({"modificato" : '1'});
        console.log("PROGETTO MODIFICATO");
      });
});   // fine UPDATE

module.exports = project;
