
var register = require('express').Router();
var sql_connection = require('../db_connector');


// qui visualizza la lista di tutti gli utenti
register.get('/registrazione', function (req, res) {
  sql_connection.query('SELECT * from utenti', function(err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
})


//insert di un utente
register.post('/registrazione', function (req, res) {

  console.log('richiesta: ', req.body.nome_utente);
  req.body;
  // leggo il bod, becco quello che mi serve e creo un insert con il valore passato
  var query = "INSERT INTO utenti ( username, nome_utente, cognome_utente, email, password, img_avatar) VALUES ("+
                      "'"+req.body.username+"',"+
                      "'"+req.body.nome_utente+"',"+
                      "'"+req.body.cognome_utente+"',"+
                      "'"+req.body.email+"',"+
                      "'"+req.body.password+"',"+
                      "'"+req.body.img_avatar+"')";
    console.log(query);
    sql_connection.query(query , function(err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
})

// controllo alla registrazione se l'utente è già esistente
register.get('/registrazione/:username/', function (req, res) {
    username = req.params.username;
  req.body;
  sql_connection.query("SELECT * from utenti WHERE username = '"+username+"'", function(err, rows, fields) {
    if (err) throw err;
    if ( rows.length == 1)
      //res.send(rows[0]);
      console.log("USERNAME ESISTENTE");
    else
      res.send(rows);
        console.log("USERNAME REGISTRATO CORRETTAMENTE");
  });
})

// controllo alla registrazione se l'utente ha le credenziali giuste

module.exports = register;
