require('@google-cloud/debug-agent').start({serviceContext: {enableCanary: true}});
var express = require('express');
var bodyParser = require('body-parser');
const cors = require("cors");

// var Database = require('./db/database.js');
var routes = require('./routes/controller.js');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', './views');

// var corsOptions = {
//     origin: "http://localhost:8081"
//   };
  
// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./db/auth-models");
const Role = db.role;

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// Website routes
app.use('/', routes);

app.listen(3000, function () {
    console.log("Starting at port 3000...");
}); 

// exports.initial = () =>{
//     Role.estimatedDocumentCount((err, count) => {
//       if (!err && count === 0) {
//         new Role({
//           name: "user"
//         }).save(err => {
//           if (err) {
//             console.log("error", err);
//           }
  
//           console.log("added 'user' to roles collection");
//         });
  
//         new Role({
//           name: "moderator"
//         }).save(err => {
//           if (err) {
//             console.log("error", err);
//           }
//           console.log("added 'moderator' to roles collection");
//         });
  
//         new Role({
//           name: "admin"
//         }).save(err => {
//           if (err) {
//             console.log("error", err);
//           }
  
//           console.log("added 'admin' to roles collection");
//         });
//       }
//     });
//   }
