var express = require('express');
var bodyParser = require("body-parser");
var register = express();
var mysql = require('mysql');
register.use(bodyParser.urlencoded({ extended: false }));
register.use(bodyParser.json());

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : ''
});

function runQuery(query, callback) {
  connection.query("USE kanbanboard");
  connection.query(query, callback);

}

register.get('/', function (req, res) {
  res.send('Hello World!');
});

// qui visualizza la lista di tutti gli utenti
register.get('/utenti', function (req, res) {
  runQuery('SELECT * from utenti', function(err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
})



register.post('/utenti', function (req, res) {

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

// controllo alla registrazione se l'utente è già esistente
register.get('/utenti/:username/', function (req, res) {
    username = req.params.username;
  req.body;
  console.log("SELECT * from utenti WHERE username = '"+username+"'");
  runQuery("SELECT * from utenti WHERE username = '"+username+"'", function(err, rows, fields) {
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

register.listen(3000, function () {
  console.log('Example register listening on port 3000!');
});
