require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const shorterUrlRouter = require('./routes/shorterUrl');
const redirectUrlRouter = require('./routes/redirectUrl');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoDBEndpoint = 'mongodb+srv://macylee:1775CrosbyCt@cluster0.dyccg.mongodb.net/shorterUrl?retryWrites=true&w=majority';
mongoose.connect(mongoDBEndpoint, { useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to mongo db'));

app.use(cors());

app.use('/api/shorterUrl', shorterUrlRouter);
app.use('/api/shorterUrl', redirectUrlRouter);

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Starting at port " + port);
})