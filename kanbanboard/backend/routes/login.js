
var login = require('express').Router();
var sql_connection = require('../db_connector');


// qui visualizza la lista di tutti gli utenti
login.get('/loginVisualizzaUtenti', function (req, res) {
  sql_connection.query('SELECT * from utenti', function(err, rows, next) {
    if (err) throw err;
    res.send(rows);
  });
})

// controllo al login se l'utente ha le credenziali giuste
login.post('/login/', function (req, res) {
    username = req.body.username;
    password = req.body.password;
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
}) // fine login

login.post('/login/getUtente/', function(req, res){
  username = req.body.username;
  sql_connection.query("SELECT * from utenti WHERE username = '"+ username +"'", function(err, rows, next){
    if (err) throw err;

    if ( rows.length == 1){
      res.send({'success':'1','utente':rows[0]});
    }else{
      res.send({'success': '0'});
    } //fine if
  })
})//fine login/getutente

module.exports = login;
