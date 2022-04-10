const express = require('express');
const recycledItemsRouter = express.Router();
const mysql = require('mysql2');

// Establish a MySQL Connection
const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: 'RTk2010',
    // Connect to a specific DB
    database: 'recycled_items'
}); 

// Connect to the MySQL Database
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Successfully Connected to recycled_items database!');
});



recycledItemsRouter 
    // Select query 
    .get('/', (req, res) => {
        db.query('SELECT * FROM items', (err, result) => {
            if (err){
                throw err;
            }
            res.send(result);
        })
    })

    //Insert a Row into the Table
    .post('/addItem', (req, res) => {
        const name = req.body.name;
        const details = req.body.details;
        db.query('INSERT INTO items (name, details) VALUES (?, ?)', [name, details], (err, result) => {
            if (err){
                throw err;
            }
            console.log(result);
            res.send(result);
        })
    })

    .delete('/delItem/:id', (req, res) => {
        const id = req.params.id;
        db.query('DELETE FROM items WHERE id = ?', id, (err, result) => {
            if (err){
                throw err;
            }
            console.log(result);
            res.send("DELETE query was successful!");
        })
    })

    .put('/updateItem/:id', (req, res) => {
        const recycledId = req.params.id;
        const name = req.body.name;
        const details = req.body.details;
        db.query(`UPDATE items SET name = '${name}', details = '${details}' WHERE id = ${recycledId}`, (err, result) => {
            if (err) {
                throw err;
            }
            console.log(result)
            res.send(result)
        })
    })

module.exports = recycledItemsRouter;