const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://vil:vil123@project.v2mds.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology: true });

const User = require('./models/user'); 
const Sensor = require('./models/sensor'); 

const express = require('express');

const app = express();

app.use(express.static('public'));
app.use((req, res, next) => { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    next();
});


const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

const port = process.env.PORT || 5000;


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });

app.get('/api/test', (req, res) => {
 res.send('The API is working!');
});

app.get('/api/data', (req, res) => { 
    Sensor.find({}, (err, sensordata) => {
        return err
            ? res.send(err)
            : res.send(sensordata);
    }); 
});

app.post('/api/authenticate', (req, res) => { 
    const { user, password } = req.body; 
    User.findOne({
        name : user
            }, (err, found) => {
                if (err) {
                    return res.send(err);
                }
                else if (!found) {
                    return res.send('No user found');
                }
                else if (found.password != password) {
                    
                    return res.send('Incorrect password');
                }
                else {
                    return res.json({
                        success: true,
                        message: 'Authenticated successfully', 
                        isAdmin: found.isAdmin
                    });
                }
        
    }); 
    
});

app.post('/api/registration', (req, res) => { 
    const { user, password, isAdmin } = req.body; 
    User.findOne({
        name : user 
            }, (err, found) => {
                if (err) {
                    return res.send(err);
                }
                else if (found) {
                    message = 'User already exists';
                    return res.send(message);
                }
                else {
                    const newUser = new User({
                        name: user,
                        password,
                        isAdmin
                    });
                    newUser.save(err => {
                        return err
                            ? res.send(err)
                            :res.json({
                                success: true,
                                message: 'Created new user'
                            });
                    });
                }
        
    }); 
    
});



app.listen(port, () => {
 console.log(`listening on port ${port}`);
});