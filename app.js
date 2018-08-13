const express = require('express');
const app = new express();

module.exports = app;

app.use('/api/categories', require('./api/categories'));

app.use((req, res, next) => {
    next(new Error({message: "Could not find the resource", status: 404}));
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.message || "Error occurred with the request");
});