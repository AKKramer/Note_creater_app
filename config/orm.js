var connection = require("./connection.js");

class ORM {
    constructor(connection){
        this.connection = connection
    }

    selectAll(){
        const queryString = 'SELECT * FROM notes'
        return this.connection.query(queryString)
    }

    createNote(values){
        const queryString = `INSERT INTO notes (title, text) VALUES (?, ?)`
        return this.connection.query(queryString, [...values])
    }
    
    deleteNote(value){
        const queryString = `DELETE FROM notes WHERE id = ?`
        return this.connection.query(queryString, [value])
    }
    
}




module.exports = new ORM(connection);