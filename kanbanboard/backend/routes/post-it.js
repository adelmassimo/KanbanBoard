

var postIt = require('express').Router();
var sql_connection = require('../db_connector');

postIt.post('/post-it/', function (req, res) {

    nome_postIt = req.body.nome_postIt;
    descrizione_postIt = req.body.descrizione_postIt;
    colore_postIt = req.body.colore_postIt;
    tipologia = req.body.tipologia;

    var query = "INSERT INTO postit ( nome_postIt, descrizione_postIt, colore_postIt, tipologia) VALUES ("+
                      "'"+nome_postIt+"',"+
                      "'"+descrizione_postIt+"',"+
                      "'"+colore_postIt+"',"+
                      "'"+tipologia+"')";
        sql_connection.query(query , function(err, rows, fields) {
          if (err) throw err;
          res.send({"aggiunto" : '1'});
          console.log("POST-IT INSERITO");  
        });

}); // fine postIt.post('/post-it/', function (req, res) {

// UPDATE DEL POST-IT 

postIt.post('/post-it/update/:id', function (req, res) {

    id_postIt = req.body.id_postIt;
    nome_postIt = req.body.nome_postIt;
    descrizione_postIt = req.body.descrizione_postIt;
    colore_postIt = req.body.colore_postIt;
    tipologia = req.body.tipologia;

    var query = "UPDATE postit SET nome_postIt = "+"'"+nome_postIt+"',"+ 
                "'descrizione_postIt = "+"'"+descrizione_postIt+"',"
                "'colore_postIt = "+"'"+colore_postIt+"',"
                "'tipologia = "+"'"+tipologia+"'"+
                "'WHERE id_postIt = '"+id_postIt+"'";
        sql_connection.query(query , function(err, rows, fields) {
            if (err) throw err;
            //res.send({"aggiunto" : '1'});
            console.log("POST-IT MODIFICATO");  
        });

}); // fine postIt.post('/post-it/update/:id', function (req, res) {

module.exports = postIt;