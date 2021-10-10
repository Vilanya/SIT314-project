const mqtt = require('mqtt')
const client = mqtt.connect("mqtt://broker.hivemq.com:1883");
const five = require('johnny-five');
const mongoose = require('mongoose');

const Sensor = require('./models/sensor');

var topic="/218664185/command";
var start = false;

client.on('connect', () =>
{
 client.subscribe(topic);
 console.log('mqtt connected');
});



client.on('message', (topic, message) =>
{
  
    start = true;
    console.log("start is true");
    
});

if (start=true)
{
  const board = new five.Board();
  board.on('ready', () => {
      const moisturesensor = new five.Sensor({
        pin: 'A0',
        threshold: 4
      });

      console.log("board ready")
    
      moisturesensor.on('change', (value) => {

        
        moisture_data = value;
        console.log(moisture_data);
    
        mongoose.connect('mongodb+srv://vil:vil123@project.v2mds.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
    
        const sensordata = {
            id: 0,
            time: new Date(),
            light: moisture_data
         }
         const jsonString = JSON.stringify(sensordata);
         console.log(jsonString);
        
        const newSensor = new Sensor({
            id: sensordata.id,
            sensordata: sensordata.moisture,
            time: sensordata.time
            
        });
        newSensor.save().then(doc => {
          console.log(doc);
          }).then(() => {
          mongoose.connection.close();
          });
      });
    });
}

