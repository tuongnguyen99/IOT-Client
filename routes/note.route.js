const express = require('express');
const controller = require('../controllers/note.controller');
var router = express.Router();

router.get('/', controller.getNotes)
router.get('/new', controller.getNew)
router.post('/new', controller.postNew);
router.get('/edit/:id', controller.getEdit);
router.post('/edit/:id', controller.postEdit);
router.get('/delete/:id', controller.deleteNote);
module.exports = router;
