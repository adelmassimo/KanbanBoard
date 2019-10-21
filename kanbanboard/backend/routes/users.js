var router = require('express').Router();
var sql_connection = require('../db_connector');

router.get('/utenti', function(req, res){

  sql_connection.query('SELECT * from utenti', function(err, result, next) {
    if (err) throw err;
     return res.json(result[0]);
  });

}); // fine router.get

// cancellazione utente per singolo id_utente
router.delete('/utenti/:id/', function (req, res) {
  id = req.params.id;
  sql_connection.query('DELETE FROM `utenti` WHERE id_utente = '+id,  function(err, rows, next) {
    if (err) throw err;
    res.send(rows);
  });
});

module.exports = router;


/*

router.get('/user/:id', function(req, res, next){
    
    // Cerca nel db l'utente con id = :id
    utente_trovato = {id: req.params.id, nome: 'ceffo', cognome: 'serleffo'}
    sql_connection.query("select * from users where users.id ="+req.params.id, function (err, result, fields) {
      return res.json(result[0]);
     })
    
});

router.delete('/user/:id', function(req, res, next){
    
    // Cerca nel db l'utente con id = :id e lo cancella
    var tantoPer = [
      {status: 0, msg:'cancellato'},
      {status: 1, msg:'non trovato nessun utente con id = '+req.params.id},
      {status: 2, msg:'non è stato possibile cancellarlo perchè boh'}
      ];

    return res.json(tantoPer[ Math.round(Math.random() * 2) ]);
});


router.post('/users/login', function(req, res, next){
  // controllo su db
  // Così a caso gli ritorno questo
  esito_tentativo_accesso = Math.random()*2 < 1;

  return res.json( esito_tentativo_accesso )
});

router.get('/users', function(req, res, next){

  sql_connection.query('select * from users', function (err, result, fields) {
    return res.json(result);
   })
});

module.exports = router;
*/