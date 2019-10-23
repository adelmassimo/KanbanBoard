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

