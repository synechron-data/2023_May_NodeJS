const http = require('http');
const express = require('express');

// Create an Express Application Request Handler
const app = express();

app.set("view engine", "pug");

var employees = [{ id: 1, name: "Manish" },
{ id: 2, name: "Abhijeet" },
{ id: 3, name: "Ram" },
{ id: 4, name: "Abhishek" },
{ id: 5, name: "Ramakant" }];

// Routes
app.get("/", (req, res, next) => {
    res.render("index", { pageTitle: "Index View" });
});

app.get("/employees", (req, res, next) => {
    res.render("employees", { pageTitle: "Employees View", empList: employees });
});

// ------------------------------------------------------- Hosting Code
const server = http.createServer(app);

server.listen(3000);

function onError(err) {
    console.log(err);
}

function onListening(err) {
    var address = server.address();
    console.log("Server started on port: ", address.port);
}

server.on('error', onError);
server.on('listening', onListening);