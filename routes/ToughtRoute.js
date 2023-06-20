const express = require("express");
const router = express.Router();
const ToughtController = require("../controllers/ToughtController");
const { checkAuth } = require("../helpers/auth");

router.post('/create', ToughtController.createToughtPost)
router.post('/delete', ToughtController.deleteTought)
router.post('/update', ToughtController.updateToughtPost)

router.get('/update/:id', ToughtController.updateTougth)
router.get('/create',checkAuth, ToughtController.createTought)
router.get('/', ToughtController.showAll)


















module.exports = router