

var postIt = require('express').Router();
var sql_connection = require('../db_connector');

postIt.post('/post-it/', function (req, res) {

  id_progetto = req.body.id_progetto;
  nome_postIt = req.body.nome_postIt;
  descrizione_postIt = req.body.descrizione_postIt;
  colore_postIt = req.body.colore_postIt;
  tipologia = req.body.tipologia;

  var query = "INSERT INTO postit ( nome_postIt, descrizione_postIt, colore_postIt, tipologia) VALUES (" +
    "'" + nome_postIt + "'," +
    "'" + descrizione_postIt + "'," +
    "'" + colore_postIt + "'," +
    "'" + tipologia + "');";
  console.log(query);
  sql_connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    console.log(rows);
    var id_postIt = rows['insertId'];

    var queryProgettiPostit = "INSERT INTO progetti_x_postit ( id_progetto, id_postIt) VALUES (" +
      "'" + id_progetto + "'," +
      "'" + id_postIt + "')";
    sql_connection.query(queryProgettiPostit, function (err, rows, fields) {
      if (err) throw err;
    });

    res.send({ "aggiunto": "1" });
  });

}); // fine postIt.post('/post-it/', function (req, res) {

// UPDATE DEL POST-IT 

postIt.post('/updatePostIt/', function (req, res) {
  id_postIt = req.body.id_postIt;
  nome_postIt = req.body.nome_postIt;
  descrizione_postIt = req.body.descrizione_postIt;
  colore_postIt = req.body.colore_postIt;
  tipologia = req.body.tipologia;

  var query = "UPDATE `kanbanboard`.`postit` SET `nome_postIt`='" + nome_postIt + "', " +
    " `descrizione_postIt`='" + descrizione_postIt + "', " +
    " `colore_postIt`='" + colore_postIt + "', " +
    " `tipologia`='" + tipologia + "' " +
    " WHERE  `id_postIt`='" + id_postIt + "'";

  sql_connection.query(query, function (err) {
    if (err) throw err;
    console.log("POST-IT MODIFICATO");
    //AGGIUNGO INA MODIFICA
    var queryInserimentpModifica = "INSERT INTO `kanbanboard`.`modifiche` (`id_postItOld`, `nome_PostItNew`, `descrizione_postItNew`, `colore_postItNew`, `tipologiaNew`) " +
      " VALUES ('" + id_postIt + "', '" + nome_postIt + "', '" + descrizione_postIt + "', '" + colore_postIt + "', '" + tipologia + "')";
    sql_connection.query(queryInserimentpModifica, function (err) {
      if (err) throw err;
      console.log("MODIFICA INSERITA");
    });

    res.send({ "modificato": '1' });

  });
}); // fine postIt.post('/post-it/update/:id', function (req, res) {

postIt.post('/visualizzaPostItProgetto', function (req, res) {
  id = req.body.idProgetto;
  sql_connection.query('SELECT postit.*, ' +
    'progetti.nome_progetto, ' +
    'progetti.descrizione_progetto ' +
    'FROM progetti_x_postit ' +
    'left outer join postit on postit.id_postIt = progetti_x_postit.id_postIt ' +
    'left outer join progetti on progetti.id_progetto = progetti_x_postit.id_progetto ' +
    'WHERE progetti.id_progetto = "' + id + '"', function (err, rows, next) {
      //console.log(rows)
      if (err) throw err;
      res.send(rows);
    });
});
//get modifiche per postit
postIt.post('/visualizzaModifichePostIt', function (req, res) {
  id_postIt = req.body.id_postIt;
  var query = "SELECT * FROM modifiche WHERE id_postItOld = '"+id_postIt+"'";
  sql_connection.query(query, function (err, rows, next) {
      if (err) throw err;
      res.send(rows);
    });
});


//elimina postit
postIt.post('/deletePostIt/', function (req, res) {
  id_postIt = req.body.id_postIt;
  console.log('sto eliminando:', id_postIt);

  var query = "DELETE FROM postit "
    + "WHERE  id_postIt = '" + id_postIt + "'";
  sql_connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    console.log("POST-IT eliminato");

    //elimino modifiche del postit
    var queryInserimentpModifica = "DELETE FROM `kanbanboard`.`modifiche` WHERE `id_postItOld`='"+id_postIt+"'";
    sql_connection.query(queryInserimentpModifica, function (err) {
      if (err) throw err;
      console.log("MODIFICE ELIMINATE");
    });



    res.send({ "eliminato": '1' });
  });

});


module.exports = postIt;