

var postIt = require('express').Router();
var sql_connection = require('../db_connector');

postIt.post('/post-it/', function (req, res) {

    nome_postIt = req.body.nome_postIt;
    descrizione_postIt = req.body.descrizione_postIt;
    colore_postIt = req.body.colore_postIt;

    var query = "INSERT INTO postit ( nome_postIt, descrizione_postIt, colore_postIt) VALUES ("+
                      "'"+nome_postIt+"',"+
                      "'"+descrizione_postIt+"',"+
                      "'"+colore_postIt+"')";
        sql_connection.query(query , function(err, rows, fields) {
          if (err) throw err;
          res.send({"aggiunto" : '1'});
          console.log("POST-IT INSERITO");  
        });

}); // fine postIt.post('/post-it/', function (req, res) {

module.exports = postIt;