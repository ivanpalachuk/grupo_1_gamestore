const express = require ('express');
const router = express.Router();
const mainController = require ('../controllers/maincontroller.js')

router.get('/', mainController.index);
router.get('/home', mainController.index);

module.exports = router;