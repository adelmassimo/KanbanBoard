var project = require('express').Router();
var sql_connection = require('../db_connector');


//INSERT
project.post('/project/', function (req, res) {

    nome_progetto = req.body.nome_progetto;
    descrizione_progetto = req.body.descrizione_progetto;

    var query = "INSERT INTO progetti ( nome_progetto, descrizione_progetto) VALUES ("+
                      "'"+nome_progetto+"',"+
                      "'"+descrizione_progetto+"')";
        sql_connection.query(query , function(err, rows, fields) {
          if (err) throw err;
          res.send({"creato" : '1'});
          console.log("PROGETTO INSERITO");  
        });

}); 


//UPDATE
project.post('/project/:id', function (req, res) {

  nome_progetto = req.body.nome_progetto;
  descrizione_progetto = req.body.descrizione_progetto;

  var query = "UPDATE progetti set nome_progetto = '"+nome_progetto+"'," 
                + "descrizione_progetto = '"+descrizione_progetto+ "'";
      sql_connection.query(query , function(err, rows, fields) {
        if (err) throw err;
        //res.send({"creato" : '1'});
        console.log("PROGETTO AGGIORNATO");  
      });

}); 

module.exports = project;