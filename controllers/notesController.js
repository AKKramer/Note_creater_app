const express = require('express');
const router = express.Router();
const note = require('../models/note');
const path = require("path");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());



// Will render all typed notes to the page
router.get("/", function (req, res) {
  console.log('index')
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/notes", function (req, res) {
  console.log('notes')
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

router.get('/api/notes', (req, res) => {
  note.getNotes()
  .then(function(results) {
    // console.log(results)
    res.json(results)
  })
  .catch(error => res.status(500).json(error))
})

router.delete('/api/notes:id', (req, res) => {
  console.log("ROUTE ID: " + req.params.id)
  var id = parseInt(req.params.id)
  console.log(typeof id)
  note.deleteNote(id)
  .then(function(results){
  res.json('deleted')
  })
})

// Will create a new note and add it to the DB. 
router.post('/api/notes', (req, res) => {
  let newNote = req.body;
  note.addNote([newNote.title, newNote.text])
  .then(results => res.json(results))
})



module.exports = router;