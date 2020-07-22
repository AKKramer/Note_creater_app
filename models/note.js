const orm = require("../config/orm.js");

class Note {
  getNotes() {
    return orm.selectAll()
  }
  addNote(values) {
    return orm.createNote(values)
  }
  deleteNote(value) {
    return orm.deleteNote(value)
  }
};

module.exports = new Note();
