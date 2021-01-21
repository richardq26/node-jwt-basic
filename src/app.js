const express = require("express");
const app = express();

// SETTINGS
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./controllers/authController'));
module.exports = app;