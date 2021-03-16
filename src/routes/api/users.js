const express = require ('express');
const router = express.Router();
const usersController = require ('../../controllers/api/usersController');

/**** LIST OF ALL EMAILS REGISTER ****/
router.get('/:email', usersController.list)

module.exports = router