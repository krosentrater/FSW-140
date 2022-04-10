const express = require("express");
const app = express();
const mysql = require('mysql2');
const morgan = require('morgan');
const cors = require('cors');


const recycledItemsRouter = require('./routes/recycledItemsRouter');

// Middleware.
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    origin: '*'
}));

// Requires router for recycled items, setting endpoint for get request.
app.use('/recycled-items', recycledItemsRouter);

// Server startup.
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server has been started on port: ${PORT}`)
});
