var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var mysql = require('mysql');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : ''
});

function runQuery(query, callback) {
  connection.query("USE kanbanboard");
  connection.query(query, callback);

}

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// qui visualizza la lista di tutti gli utenti
app.get('/utenti', function (req, res) {
  runQuery('SELECT * from utenti', function(err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
})


// Richiesta singolo utente
app.get('/utenti/:id/', function (req, res) {
  id = req.params.id;

  runQuery('SELECT * from utenti WHERE id_utente = '+id, function(err, rows, fields) {
    if (err) throw err;
    if ( rows.length == 1)
      res.send(rows[0]);
    else
      res.send(rows);
  });
})

app.post('/utenti', function (req, res) {

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
    runQuery(query , function(err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
})

// cancellazione utente per singolo id_utente
app.delete('/utenti/:id/', function (req, res) {
  id = req.params.id;
  req.body;
  runQuery('DELETE FROM `utenti` WHERE id_utente = '+id,  function(err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
})

app.get('/utenti/', function (req, res) {
  runQuery('SELECT * from utenti', function(err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
})

// controllo alla registrazione se l'utente ha le credenziali giuste
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
