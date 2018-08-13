const path = require('path');
const express = require('express');
const app = new express();

module.exports = app;

app.use(express.static(path.join(__dirname, "src")));
app.use("/dist", express.static(path.join(__dirname, "dist")));

app.use('/api/categories', require('./api/categories'));

app.use((req, res, next) => {
    let error = new Error("Could not find the resource");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message || "Error occurred with the request");
});