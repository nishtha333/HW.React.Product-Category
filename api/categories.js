const db = require('../db');
const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/', (req, res, next) => {
    db.getAllCategories()
      .then(categories => res.send(categories));
});

router.get('/:id', (req, res, next) => {
    db.getCategoryById(req.params.id)
      .then(category => res.send(category));
});