const express = require('express');
const router = express.Router();
const { add, index, view, deleteData, deleteMany } = require('./meeting');

router.post('/add', add);
router.get('/', index);
router.get('/view/:id', view);
router.delete('/delete/:id', deleteData);
router.delete('/deleteMany', deleteMany);

module.exports = router;