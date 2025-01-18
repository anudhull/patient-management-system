const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const routes = require('./routes');
const dotenv = require("dotenv");
const app = express();

dotenv.config();
app.use(bodyParser.json());

connectDB();

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('Welcome to the Patient Management System API');
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
