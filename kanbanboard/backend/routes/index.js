var router = require('express').Router();


router.use('/api/', require('./users'));
router.use('/api/', require('./register'));
router.use('/api/', require('./login'));
router.use('/api/', require('./progetti'));


module.exports = router;