// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
app.use(express.static('db'))

//  Temp database
// var notes = [{
//   "title": "Test Title",
//   "text": "Test text"
// }]


// HTML page routes
// =============================================================
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});
// API routes
// =============================================================
app.get('/api/notes', (req, res) => {
  fs.readFile((path.join(__dirname, "db/db.json")), 'utf8',
    function (error, data) {
      // console.log("data:", data)
      if (error) throw error
      if (data.length === 0){
        console.log('data file is empty')
      }
      else{
        res.json(JSON.parse(data))
      }
    })
})

app.post('/api/notes', (req, res) => {
  // ******TEST******
  // notes.push(req.body)
  // console.log(notes)
  // ******END TEST******

  let newNote = req.body;


  readFileAsync((path.join(__dirname, "db/db.json")), 'utf8')
    .then(function (data) {
      let currentNotes = JSON.parse(data)
      if (currentNotes === undefined) {
        return [newNote]
      }
      else {
        currentNotes.push(newNote)
        console.log("currentNotes.length", currentNotes.length)

        for (let i = 0; i < currentNotes.length; i++) {

          // console.log(currentNotes[i])
          (currentNotes[i]).id = i+1
        }

        console.log(currentNotes)


        return (currentNotes)
      }
    })
    .then(function (notes) {
      return writeFileAsync((path.join(__dirname, "db/db.json")), JSON.stringify(notes))
        .then(function () {
          res.json(notes)
        })
    })
})

app.delete('/api/notes/:id', (req, res) => {
  console.log("API called") 
  let id = req.params.id-1
  console.log('id', id)

  readFileAsync((path.join(__dirname, "db/db.json")), 'utf8')
    .then(function (data) {
      let db = JSON.parse(data)
      db.splice(parseInt(id), 1)
      console.log("deleted item db", db)

      for (let i = 0; i < db.length; i++) {

        // console.log(currentNotes[i])
        (db[i]).id = i+1
      }

      console.log("renumbered", db)
      res.status(200).end();
      
      return writeFileAsync((path.join(__dirname, "db/db.json")), JSON.stringify(db))
      .then(function () {
        res.json(db)
      })
    })  
    
})



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
