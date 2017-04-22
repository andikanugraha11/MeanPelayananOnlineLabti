const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


const app = express();

//Database configuration
mongoose.connect(config.database);

//On connect Database
mongoose.connection.on('connected', () => {
    console.log(`database terhubung dengan ${config.database}`);
});

//On Error database
mongoose.connection.on('error', (err) => {
    console.log(`Error : ${err}`);
});
//port number
const port = process.env.PORT || 8081;

//Middleware config
app.use(cors());

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//User API
const users = require('./controller/users');
app.use('/users', users);

//Praktikum
const praktikum = require('./controller/praktikum');
app.use('/praktikum', praktikum);

//Laporan
const report = require('./controller/report');
app.use('/laporan', report);

//Praktikan API
const praktikan = require('./controller/praktikan');
app.use('/praktikan', praktikan);

//petugasPj API
const petugasPj = require('./controller/petugasPj');
app.use('/petugas-pj', petugasPj);

//Test get
app.get('/test', (req, res) => {
    res.send('berhasil');
});

//Combine express route & angular route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Start server
app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}`);
});