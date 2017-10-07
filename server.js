#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
//var fs = require('fs');
var mysql = require('mysql');
var bodyParser = require('body-parser');
    
var SampleApp = function () {
    
    //  Scope.
    var self = this;
    self.setupVariables = function () {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
        self.port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
        self.hostname = process.env.OPENSHIFT_MYSQL_DB_HOST || '127.0.0.1';

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        }
        ;
    };

 


 

    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function () {
        //self.app = express.createServer();       
        self.app = express();
        self.app.use(bodyParser.urlencoded({extended: false}));
        self.app.use(bodyParser.json());
        // GET method route
        self.app.get('/', function (req, res) {
            res.send('Received request');
        });
        


    };

    /**
     *  Initializes the sample application.
     */
    self.initialize = function () {
        self.setupVariables();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function () {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function () {
            console.log('%s: Node server started on %s:%d ...',
                    Date(Date.now()), self.ipaddress, self.port);
        });
    };

};   /*  Sample Application.  */

/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();