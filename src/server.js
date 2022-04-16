require('dotenv').config(require('./config/dotenv'));

const express = require('express');
const path = require('path');
const db = require('./config/db');
const cors = require('cors');
const route = require('./routes');
const app = express();

// Parse body req to json
app.use(express.json());

// Enable cors
app.use(cors());

// Route middleware
route(app);

//Connect to mongodb database
db.connect();

//Start an express server
app.listen(process.env.PORT || 4000, () => console.log(`Server Started http://localhost:4000`));
