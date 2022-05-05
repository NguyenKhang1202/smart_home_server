require('dotenv').config(require('./config/dotenv'));

const express = require('express');
const path = require('path');
const apiResponse = require('./utils/apiResponse');
const APIStatus = require('./constants/apiStatus');
const db = require('./db/mongoose');
const cors = require('cors');
const route = require('./routes');
const { port } = require('./config');
const app = express();

// Parse body req to json
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
    
// Enable cors
app.use(cors());

// Route middleware
route(app);

// Handle exception
app.use((err, req, res, next) => {
    if (err) {
      return res
        .status(err.statusCode || 500)
        .json(
          apiResponse({
            status: APIStatus.FAIL,
            msg: 'validation failed',
            data: err,
          })
        )
    }
  
    console.log(err)
    return res
      .status(500)
      .json(
        apiResponse({ status: APIStatus.ERROR, msg: 'Internal Server error' })
      )
  })

//Connect to mongodb database
db.connect();

//Start an express server
app.listen(port, () => console.log(`Server Started http://localhost:${port}`));
