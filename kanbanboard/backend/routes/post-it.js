var postIt = require('express').Router();
var sql_connection = require('../db_connector');

postIt.post('/post-it/', function (req, res) {

  id_progetto = req.body.id_progetto;
  nome_postIt = req.body.nome_postIt;
  descrizione_postIt = req.body.descrizione_postIt;
  colore_postIt = req.body.colore_postIt;
  tipologia = req.body.tipologia;
  difficolta = req.body.difficolta;

  var query = "INSERT INTO postit ( nome_postIt, descrizione_postIt, colore_postIt, tipologia, difficolta, epica, id_epica_riferimento) VALUES (" +
    "'" + nome_postIt + "'," +
    "'" + descrizione_postIt + "'," +
    "'" + colore_postIt + "'," +
    "'" + tipologia + "'," +
    "'" + difficolta + "', " +
    "'0', '0')";
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
  id_autore = req.body.id_autore;

  var query = "UPDATE `kanbanboard`.`postit` SET `nome_postIt`='" + nome_postIt + "', " +
    " `descrizione_postIt`='" + descrizione_postIt + "', " +
    " `colore_postIt`='" + colore_postIt + "', " +
    " `tipologia`='" + tipologia + "' " +
    " WHERE  `id_postIt`='" + id_postIt + "'";

  sql_connection.query(query, function (err) {
    if (err) throw err;
    console.log("POST-IT MODIFICATO");
    //AGGIUNGO INA MODIFICA
    var queryInserimentpModifica = "INSERT INTO `kanbanboard`.`modifiche` (`id_postItOld`, `id_autore`, `nome_PostItNew`, `descrizione_postItNew`, `colore_postItNew`, `tipologiaNew`) " +
      " VALUES ('" + id_postIt + "', '" + id_autore + "', '" + nome_postIt + "', '" + descrizione_postIt + "', '" + colore_postIt + "', '" + tipologia + "')";
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
  console.log("visualizzaModifichePostIt, id: ", req.body.id_postIt);
  var query = "SELECT modifiche.*, utenti.nome_utente, utenti.cognome_utente " +
    " FROM modifiche JOIN utenti ON utenti.id_utente = modifiche.id_autore " +
    " WHERE id_postItOld = '" + id_postIt + "'";
  sql_connection.query(query, function (err, rows, next) {
    if (err) throw err;
    console.log(rows);
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

    query = "DELETE FROM progetti_x_postit "
      + "WHERE  id_postIt = '" + id_postIt + "'";
    sql_connection.query(query, function (err, rows, fields) {
      if (err) throw err;
      //elimino modifiche del postit
      var queryInserimentpModifica = "DELETE FROM `kanbanboard`.`modifiche` WHERE `id_postItOld`='" + id_postIt + "'";
      sql_connection.query(queryInserimentpModifica, function (err) {
        if (err) throw err;
        console.log("MODIFICE ELIMINATE");
      });
    });
    res.send({ "eliminato": '1' });
  });

});

postIt.post('/aggiornaPostIt/', function (req, res) {
  id_postIt = req.body.id_postIt;
  tipologia = req.body.tipologia;

  var query = "UPDATE `kanbanboard`.`postit` SET `tipologia`='" + tipologia + "' " +
    " WHERE  `id_postIt`='" + id_postIt + "'";

  sql_connection.query(query, function (err) {
    if (err) throw err;
    console.log("POST-IT AGGIORNATO");
    res.send({ "aggiornato": '1' });

  });
}); // fine postIt.post('/aggiornaPostIt/', function (req, res) {

//inserimento epica
postIt.post('/inserisciEpica/', function (req, res) {
  epica = req.body.epica;
  arrayPostIt = req.body.arrayPostIt;

  //query per inserire l'epica nel database
  query = "INSERT INTO postit (nome_postIt, descrizione_postIt, colore_postIt, tipologia, difficolta, epica, id_epica_riferimento) " +
    "VALUES ('" + epica.nome_epica + "', '" + epica.descrizione_epica + "', '" + epica.colore_epica + "', '" + epica.tipologia + "', '" + epica.difficolta + "', '1', '0')";

  sql_connection.query(query, function (err, rows) {
    if (err) throw err;

    id_epica = rows['insertId'];

    //inserimento epica nella tabella progetti_x_postit
    query = "INSERT INTO progetti_x_postit (id_progetto, id_postIt) VALUES ('" + epica.id_progetto + "', '" + id_epica + "')";
    sql_connection.query(query, function (err, rows) {
      if (err) throw err;

      if (arrayPostIt[0] != null) {
        //ciclo for per inserire nelle tabelle postit e progetti_x_postit tutti i dipendenti della epica
        for (let post of arrayPostIt) {
          //query per inserire i post-it dipendenti della epica nel database
          query = "INSERT INTO postit (nome_postIt, descrizione_postIt, colore_postIt, tipologia, difficolta, epica, id_epica_riferimento) " +
            "VALUES ('" + post.nome_postIt + "', '" + post.descrizione_postIt + "', '" + post.colore_postIt + "', '" + post.tipologia +
            "', '" + post.difficolta + "', '0', '" + id_epica + "')";

          sql_connection.query(query, function (err, rows) {
            if (err) throw err;

            id_postIt = rows['insertId'];
            //query per inserire i dipendenti della epica nella tabella progetti_x_postit
            query = "INSERT INTO progetti_x_postit (id_progetto, id_postIt) VALUES ('" + epica.id_progetto + "', '" + id_postIt + "')";
            sql_connection.query(query, function (err, rows) {
              if (err) throw err;

            });
          });
        }
      }
      /* FINE CICLO FOR */
      console.log(rows);
      res.send(rows);
    });
  });
})

postIt.post('/inserisciDipendente/', function(req, res){
  postIt = req.body.postIt;
  id_epica = req.body.id_epica;
  id_progetto = req.body.id_progetto;

  query = "INSERT INTO postit (nome_postIt, descrizione_postIt, colore_postIt, tipologia, difficolta, epica, id_epica_riferimento) " +
  "VALUES ('" + postIt.nome_postIt + "', '" + postIt.descrizione_postIt + "', '" + postIt.colore_postIt + "', '" + postIt.tipologia + 
  "', '" + postIt.difficolta + "', '0', '" + id_epica + "')";
  sql_connection.query(query, function(err, rows){
    if(err) throw err;

    id_postIt = rows['insertId'];
    query = "INSERT INTO progetti_x_postit (id_progetto, id_postIt) VALUES ('" + id_progetto + "', '" + id_postIt + "')";
    sql_connection.query(query, function(err, rows){
      if(err) throw err;

      res.send({'successo': 1});
    });
  });
});

module.exports = postIt;