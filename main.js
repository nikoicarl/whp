const express = require('express');
const start = express();
const partials = require('express-partial');
const md5 = require('md5');
const socket = require('socket.io');
const fs = require('fs');


//================= INNITIAL IMPORT FILES =======================//
    const indexRouter = require('./model/router/indexRouter');
//============================================================//


//================= INSERT / UPDATE IMPORT FILES =======================//
//======================================================================//


//================= FETCH IMPORT FILES =======================//
//============================================================//


//================= DEACTIVATE IMPORT FILES =======================//
//============================================================//


//================= DELETE IMPORT FILES =======================//
//============================================================//


//set template engine
start.use(partials());
start.set('view engine', 'ejs');

//set static files folder
start.use(express.static('./includes'));


//Zip setup
// let dataBase = connectZip();


//use backend here
//================= INNITIAL REQUIRED FILES =======================//
    indexRouter(start);
//=================================================================//


//Run server on specified port
const server = start.listen(7060, function() {
    console.log('App is running on server with port 7060');
});


const socketIo = socket(server);

socketIo.on('connection', function(socketConnection) {
    console.log('A new user connection');

    socketConnection.on('navigation', function(data) {
        fs.readFile(__dirname+'/views/pages/body/'+data.filename+'.ejs', 'utf8', function(error, fileData) {
            if (error) {
                let jsonData = {
                    'type': 'error',
                    'message': 'Oops, couldnt read file: '+error
                };
                socketConnection.emit('_navigation', jsonData);
            } else {
                socketConnection.emit('_navigation', {
                    fileData: fileData,
                    filename: data.filename
                });
            }
        });
    });

    //================= LOGIN/LOGOUT CONTROLLERS =================//
    //============================================================//


    //================= INSERT / UPDATE CONTROLLERS ==============//
    //============================================================//


    //================= FETCH CONTROLLERS =======================//
    //============================================================//


    //================= DEACTIVATE CONTROLLERS =====================//
    //==============================================================//


    //================= DELETE CONTROLLERS =======================//
    //============================================================//


    socketConnection.on('disconnect', function() {
        console.log('User disconnection');
    });
});