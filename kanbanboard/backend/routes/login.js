
var login = require('express').Router();
var sql_connection = require('../db_connector');


// qui visualizza la lista di tutti gli utenti
login.get('/login', function (req, res) {
  sql_connection.query('SELECT * from utenti', function(err, rows, next) {
    if (err) throw err;
    res.send(rows);
  });
})

// controllo al login se l'utente ha le credenziali giuste
login.post('/login/:username/:password', function (req, res) {
    username = req.params.username;
    password = req.params.password;
    console.log("Username è: " +username+ " La password è: " + password );
  sql_connection.query("SELECT * from utenti WHERE username = '"+username+"' AND password = '"+password+"'", function(err, rows, next) {
    if (err) throw err;

    if ( rows.length == 1){
      console.log("UTENTE GIUSTO");
      res.send(rows[0]);
    }else{
      console.log("UTENTE ERRATO");
      res.send(null);
    } //fine if
        
  });
}) // fine login.get('/login/:username&password', function (req, res) {

module.exports = login;
