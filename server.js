const express = require('express');
const connectDB = require('./DBConnection/Connection');
const json2xls = require('json2xls');

var cors = require('cors')
var app = express()

app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

connectDB();

app.use(express.json({extended: false}));
app.use(json2xls.middleware);

app.use('/api/mineralModel', require('./Api/Mineral').router);
app.use('/api/incomingEntryModel', require('./Api/IncomingEntry'));
app.use('/api/grindingEntryModel', require('./Api/GrindingEntry'));
app.use('/api/powderDispatchingEntryModel', require('./Api/PowderDispatchingEntry'));
app.use('/api/auth', require('./auth'));

const Port = process.env.PORT || 3001;

app.listen(Port, () => console.log(`Our app is running on port ${ Port }`));
