const express = require ('express');
const router = express.Router();
const adminController = require ('../controllers/admin-controller.js')

router.get('/new-game', adminController.newAndEdit);

module.exports = router;