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

/**
* @api {get} /api/data Data An array of all data 
* @apiGroup Data
* @apiSuccessExample {json} Success-Response:
*   [ 
*       {
*           "_id": "dsohsdohsdofhsofhosfhsofh",
*           "id": "0",
*           "sensorData": "20",
*           "time": "xx:xx:xx"
*       }
*   ]
* @apiErrorExample {json} Error-Response: 
*   {
*       "Error" 
*   }
*/
app.get('/api/data', (req, res) => { 
    Sensor.find({}, (err, sensordata) => {
        return err
            ? res.send(err)
            : res.send(sensordata);
    }); 
});

/**
* @api {post} /api/authenticate User Login
* @apiGroup User
* @apiSuccessExample {json} Success-Response:
*   { 
*       user: "Kev", password: '****'
*   }
* @apiErrorExample {json} Error-Response: 
*   {
*       "No user found" 
*   }
*/
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

/**
* @api {post} /api/registration User Register
* @apiGroup User
* @apiSuccessExample {json} Success-Response:
*   { 
*       user: "Kev", password: '****', confirm: '****'
*   }
* @apiErrorExample {json} Error-Response: 
*   {
*       "User already exists" 
*   }
*/
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