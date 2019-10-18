
var register = require('express').Router();
var sql_connection = require('../db_connector');


// qui visualizza la lista di tutti gli utenti
register.get('/registrazione', function (req, res) {
  sql_connection.query('SELECT * from utenti', function(err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
})

/*
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
*/

// controllo alla registrazione se l'utente è già esistente
register.get('/registrazione/:username/:nome/:cognome/:email/:password/:avatar', function (req, res) {
    username = req.params.username;
    nome = req.params.nome;
    cognome = req.params.cognome;
    email = req.params.email; 
    password = req.params.password;
    avatar = req.params.avatar;

    let patternPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/; 
    let patternEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      

  sql_connection.query("SELECT * from utenti WHERE username = '"+username+"'", function(err, rows, fields) {
    if (err) throw err;

    if ( rows.length == 1){
      //ritorno l'utente già registrato
      res.send(rows[0]);
      console.log("USERNAME ESISTENTE");    
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
          res.send(rows);
        });

      }else{
        console.log("USERNAME O PASSWORD ERRATI");  
      } // fine if

        console.log("USERNAME REGISTRATO CORRETTAMENTE");
    } // fine if

  });
})

// controllo alla registrazione se l'utente ha le credenziali giuste

module.exports = register;