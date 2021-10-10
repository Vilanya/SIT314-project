const mqtt = require('mqtt');
const express = require('express');


//const mongoose = require('mongoose');

//mongoose.connect('mongodb+srv://vil:vil123@project.v2mds.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const bodyParser = require('body-parser'); 

const app = express();

app.use(express.static('public'));
app.use((req, res, next) => { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    next();
});

const port = process.env.PORT || 5001;

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
  extended: true
}));

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => { 
    console.log('mqtt connected');
});

app.post('/send-command', (req, res) => { 
    const {command} = req.body; 
    const topic = `/218664185/command`; 
    client.publish(topic, command, () => {
        console.log("published on");
        res.send('published new message'); 
    });
});

app.post('/light-on', (req, res) => { 
    const {command} = req.body; 
    const topic = `/218664185/lights`; 
    client.publish(topic, command, () => {
        console.log("published on");
        res.send('published new message'); 
    });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
   });