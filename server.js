// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const orm = require('./config/orm')


const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

app.use(require('./controllers/notesController'));
app.use(express.static('public'));

// Middleware


//  Temp database
// var notes = [{
//   "title": "Test Title",
//   "text": "Test text"
// }]


// HTML page routes
// =============================================================


// API routes
// =============================================================




// app.delete('/api/notes/:id', (req, res) => {
//   console.log("API called") 
//   let id = req.params.id-1
//   console.log('id', id)

//   readFileAsync((path.join(__dirname, "db/db.json")), 'utf8')
//     .then(function (data) {
//       let db = JSON.parse(data)
//       db.splice(parseInt(id), 1)
//       console.log("deleted item db", db)

//       for (let i = 0; i < db.length; i++) {

//         // console.log(currentNotes[i])
//         (db[i]).id = i+1
//       }

//       console.log("renumbered", db)
//       res.status(200).end();
      
//       return writeFileAsync((path.join(__dirname, "db/db.json")), JSON.stringify(db))
//       .then(function () {
//         res.json(db)
//       })
//     })  
// })



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
