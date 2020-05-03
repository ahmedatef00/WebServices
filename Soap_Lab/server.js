"use strict";
var soap = require('soap');
var express = require('express');
var fs = require('fs');
function sayHello(args) {
    return (
        [
            {
            name: "First student",
            age: 27,
            courses: ['arabic', 'math', 'english'],
            married: false
            },
            {
            name: "Second student",
            age: 24,
            courses: ['math', 'english', 'french'],
            married: false
            },
            {
            name: "Third student",
            age: 25,
            courses: ['math', 'english', 'french'],
            married: false
            }
            ] 
    ) ;

    
}

var serviceObject = {
  Student_Service: {
        Student_Port: {
            sayHello: sayHello
        },
        
    }
};

var xml = fs.readFileSync('StudentService.wsdl', 'utf8');
var app = express();
var port = 8000;
app.listen(port, function () {
  console.log('Listening on port ' + port);
  var wsdl_path = "/wsdl";
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log("Check http://localhost:" + port + wsdl_path +"?wsdl to see if the service is working");
});