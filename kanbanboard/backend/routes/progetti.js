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
    'join utenti on utenti.id_utente = utenti_x_progetti.id_utente ' +
    'join progetti on progetti.id_progetto = utenti_x_progetti.id_progetto ' +
    'WHERE utenti.id_utente = "' + id + '" GROUP BY progetti.nome_progetto ASC', function (err, rows, next) {
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
progetti.post('/cercaProgettiUtente/', function (req, res) {
  ricercaProgetto = req.body.nome_progetto;
  console.log('NomeProgetto');
  console.log(ricercaProgetto);

  /*VARIABILE PER LA RICERCA GLOBALE CON INPUT DI TESTO*/
  var querySearch = 'SELECT progetti.*' +
      ' FROM progetti' +
      ' WHERE progetti.nome_progetto LIKE "%' + nome_progetto + '%"' +
      ' OR upper(progetti.nome_progetto) LIKE "%' + nome_progetto + '%"' +
      ' OR lower(progetti.nome_progetto) LIKE "%' + nome_progetto + '%"';
  /*VARIABILE PER LA RICERCA GLOBALE CON INPUT DI TESTO*/

  var query = 'SELECT progetti.* FROM progetti';
  console.log('CercaProgettiGLobali');
  sql_connection.query(query, function (err, rows, next) {
    if (err) throw err;
    res.send(rows);
  })
})

/* RICERCA GLOBALE DEI PROGETTI ALL'INTENDO DEL DB */
progetti.post('/cercaProgettiGlobali/', function (req, res) {
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
/* RICERCA GLOBALE DEI PROGETTI ALL'INTENDO DEL DB */

//INSERT
progetti.post('/insertProject/', function (req, res) {

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

    res.send({ "creato": '1', 'id_progetto': id_progetto });
    console.log("PROGETTO INSERITO");
  });
});   // fine INSERT




//UPDATE
progetti.post('/updateProject/', function (req, res) {
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
progetti.post('/deleteProject/', function (req, res) {
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

//INSERT colonne progetto
progetti.post('/insertColumnProject/', function (req, res) {
  arrayColonne = req.body.arrayColonne;
  id_progetto = req.body.id_progetto;
  console.log(arrayColonne);
  for (let i = 0; i < arrayColonne.length; i++) {
    var query = "INSERT INTO colonne_x_progetti (id_progetto, id_colonna, nome_colonna) " +
      "VALUES ('" + id_progetto + "', '" + arrayColonne[i].id + "', '" + arrayColonne[i].nomeColonna + "')";
    sql_connection.query(query, function (err, rows, fields) {
      if (err) throw err;

    });
  }
  res.send({ "inserito": '1' });
}); //fine INSERT

//get colonne di un progetto
progetti.post('/getColonneProgetto/', function (req, res) {
  idProgetto = req.body.idProgetto;

  var query = "SELECT * FROM colonne_x_progetti WHERE id_progetto = '" + idProgetto + "' " +
    "ORDER BY id_colonna ASC";
  sql_connection.query(query, function (err, rows, fields) {
    if (err) throw err;

    res.send(rows);
  });
}); //fine get colonne progetto

module.exports = progetti;