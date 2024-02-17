const express = require('express');
const path = require('path');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const router = require('./server/router/router.js');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(fileUpload({}))
app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.use(express.static(path.join(__dirname, 'server', 'static', 'upload', 'apartaments'))); 
app.use(express.static(path.join(__dirname, 'server', 'static', 'upload', 'posts'))); 

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/server-api', router);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.get('/favicon.ico', (req, res) => res.status(204));


app.listen(PORT, (res, req) => console.log(`Сервер запущен на http://localhost:${PORT}`));
