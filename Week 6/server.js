const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

// Establish a MySQL Connection
const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: 'RTk2010',
    // Connect to a specific DB
    database: 'tester'
}); 

// Connect to the MySQL Database
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Successfully Connected to the MySQL database!');
});

// Create a Database
app.get('/createDB', (req, res) => {
    let sqlString = 'CREATE DATABASE tester';
    // Run Command
    db.query(sqlString, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send(`Tester Database Created Successfully!`);
    });
});

//Create a Table
app.get('/createTable', (req, res) => {
    let sqlString = 'CREATE TABLE postings (id INT AUTO_INCREMENT, title VARCHAR(100), message VARCHAR(250), PRIMARY KEY(id))';
    // Run Command
    db.query(sqlString, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send('Postings Table Created Successfully!');
    });
});

//Insert a Row into the Table
app.get('/insertRow1', (req, res) => {
    let post = {title: 'First Title', message: 'First Message'};
    let sqlString = 'INSERT INTO postings SET ?';
    db.query(sqlString, post, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send('First Row added Successfully!');
    });
});

// Insert Row 2
app.get('/insertRow2', (req, res) => {
    let post = { title: 'Second Title', message: 'Second message.' };
    let sqlString = 'INSERT INTO postings SET ?';
    db.query(sqlString, post, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send('Second Row added Successfully!');
    });
});

// Select query 
app.get('/getPosts', (req, res) => {
    let sqlString = 'SELECT * FROM postings';
    db.query(sqlString, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send('All Rows selected from Postings Table!');
    });
});

// Select query w/ WHERE
app.get('/getPost/:id', (req, res) => {
    let sqlString = `SELECT * FROM postings WHERE id = ${req.params.id}`;
    db.query(sqlString, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send('SELECT query with matching ID has been successfully!');
    });
});

// Execute a UPDATE query
app.get('/updatePost/:id', (req, res) => {
    let newTitle = 'New Title from JS.';
    let sqlString = `UPDATE postings SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    db.query(sqlString, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send('UPDATE query was successful!');
    });
});

// DELETE query
app.get('/deletePost/:id', (req, res) => {
    let sqlString = `DELETE FROM postings WHERE id = ${req.params.id}`;
    db.query(sqlString, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("DELETE query was successful!");
    });
});

// Open/Listen to PORT
app.listen(PORT, () => {
    console.log('Local server is running!')
});
