
var register = require('express').Router();
var sql_connection = require('../db_connector');


// qui visualizza la lista di tutti gli utenti
register.get('/registrazione', function (req, res) {
  sql_connection.query('SELECT * from utenti', function(err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
})

// controllo alla registrazione se l'utente è già esistente
register.post('/register/', function (req, res) {
    username = req.body.username;
    nome = req.body.nome;
    cognome = req.body.cognome;
    email = req.body.email; 
    password = req.body.password;
    avatar = req.body.avatar;

    let patternPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/; 
    let patternEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      

  sql_connection.query("SELECT * from utenti WHERE username = '"+username+"'", function(err, rows, fields) {
    if (err) throw err;

    if ( rows.length == 1){
      //ritorno l'utente già registrato
      console.log("USERNAME ESISTENTE");  
      res.send(1);
    }else{
      // controllo se le credenziali rispettano i criteri richiesti: password 8 caratteri con minuscole e MAIUSCOLE E NUMERI
      if(patternEmail.test(String(email)) && patternPassword.test(String(password))){
        var query = "INSERT INTO utenti ( username, nome_utente, cognome_utente, email, password, img_avatar) VALUES ("+
                      "'"+username+"',"+
                      "'"+nome+"',"+
                      "'"+cognome+"',"+
                      "'"+email+"',"+
                      "'"+password+"',"+
                      "'"+avatar+"')";
        sql_connection.query(query , function(err, rows, fields) {
          if (err) throw err;
          console.log("USERNAME REGISTRATO CORRETTAMENTE");
          res.send(rows[0]);
        });

      }else{
        console.log("USERNAME O PASSWORD ERRATI");  
        res.send(0);
      } // fine if
    } // fine if

  });
})

// controllo alla registrazione se l'utente ha le credenziali giuste

module.exports = register;
