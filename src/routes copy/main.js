const express = require ('express');
const router = express.Router();
const mainController = require ('../controllers/main-controller.js')

router.get('/home', mainController.home);
router.get('/', mainController.home);

module.exports = router;