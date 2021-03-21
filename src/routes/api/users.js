const express = require ('express');
const router = express.Router();
const usersController = require ('../../controllers/api/usersController');

/**** LIST OF ALL EMAILS REGISTER ****/
router.get('/:email', usersController.emailRegistered)
router.get('/' , usersController.list)
router.get('/:id' , usersController.description)

module.exports = router