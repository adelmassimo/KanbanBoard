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
      if (err) throw err;

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

  /* var query = "UPDATE progetti SET nome_progetto = '" + nome_progetto + "', "
     + " descrizione_progetto = '" + descrizione_progetto + "', "
     + " WHERE id_progetto = '" + id_progetto + "'";*/
  var query = "UPDATE `kanbanboard`.`progetti` SET `nome_progetto`='" + nome_progetto + "', " +
    " `descrizione_progetto`='" + descrizione_progetto + "' " +
    " WHERE  `id_progetto`='" + id_progetto + "'";
  sql_connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    console.log("PROGETTO MODIFICATO");
    res.send({ "modificato": '1' });
  });
});   // fine UPDATE



// DELETE 
project.post('/deleteProject/', function (req, res) {
  id_progetto = req.body.id_progetto;
  console.log('sto eliminando:', id_progetto);

  var query = "DELETE FROM utenti_x_progetti "
    + "WHERE  id_progetto = '" + id_progetto + "'";
  sql_connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    console.log("PROGETTO eliminato");
    res.send({ "eliminato": '1' });
  });

});  // fine DELETE

//Insert
project.post('/addProject/', function (req, res) {
  id_progetto = req.body.id_progetto;
  id_utente=req.body.id;
  console.log('sto aggiungendo:' + id_progetto + "all' utente " +id);

  var query = "INSERT INTO utenti_x_progetti (id_utente, id_progetto) VALUES (" + id_utente + ", " + id_progetto + ")";
  sql_connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    console.log("PROGETTO Inserito");
    res.send({ "Inserito": '1' });
  });

});
//insert



module.exports = project;
