const express = require('express');
const app = express();

const port = 3000;
const base = `${__dirname}/public`;
app.use(express.static('public'));

app.use((req, res, next) => { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    next();
});

app.get('/', function (req, res) {
    res.sendFile(`${base}/register.html`);
   });

app.get('/chart', function (req, res) {
    res.sendFile(`${base}/chart.html`);
   });

app.get('/homepage', function (req, res) {
    res.sendFile(`${base}/homepage.html`);
   });
app.get('/login', function (req, res) {
    res.sendFile(`${base}/login.html`);
   });

app.get('/error', function (req, res) {
    res.sendFile(`${base}/error.html`);
   });

app.get('*', function (req, res) {
    res.sendFile(`${base}/404.html`);
   });

app.listen(port, () => {
 console.log(`listening on port ${port}`);
});