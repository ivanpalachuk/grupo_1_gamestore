const express = require ('express');
const router = express.Router();
const cartController = require ('../controllers/user-controller.js')

router.get('/log-in', userController.logIn);
router.get('/sign-up', userController.signUp);

module.exports = router;