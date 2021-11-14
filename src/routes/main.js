const express = require ('express');
const router = express.Router();
const mainController = require ('../controllers/main-controller.js')

router.get('/', mainController.home);
router.get('/home', mainController.home);

module.exports = router;