const express = require('express');
const controller = require('../controllers/user.controller');
const userValidate = require('../validates/user.validate');
var router = express.Router();

router.get('/register', controller.getRegister);
router.post('/register',userValidate.register, controller.postRegister)
router.get('/login', controller.getLogin);
router.post('/login', controller.postLogin);
router.get('/logout', controller.getLogout);
module.exports = router;
