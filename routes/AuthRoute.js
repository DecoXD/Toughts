const express = require('express');
const AuthController = require('../controllers/AuthController');
const { checkAuth } = require('../helpers/auth');
const router = express.Router();


//POST ROUTES
router.post('/register',AuthController.createUser)
router.post('/login',AuthController.userAuth)
//GET ROUTES
router.get('/register', AuthController.register)
router.get('/login', AuthController.login)
router.get('/logout', AuthController.logout)
router.get('/dashboard',checkAuth, AuthController.dashboard)
















module.exports = router