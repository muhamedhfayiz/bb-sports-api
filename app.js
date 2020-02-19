// importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var app = express();


const login = require('./routes/login.js');

const category = require('./routes/category.js');
const subCategory = require('./routes/subCategory.js');
const ads = require('./routes/ads.js');
const featuredAds = require('./routes/featuredAds.js');
const facility = require('./routes/facility');
const stadium = require('./routes/stadium');

//connect to mongodb
mongoose.connect(process.env.MONGODB_URI || 'mongodb://bbsports:bbsports1@ds249583.mlab.com:49583/bbsports', { useMongoClient: true });

//on connection
mongoose.connection.on('connected', () => {
	console.log('connected to database mongodb');
});

mongoose.connection.on('error', (err) => {
	if (err) {
		console.log('error in connection databse' + err);
	}

});
//port number

const port = process.env.PORT || 4000;


// const whitelist = ['http://localhost:4200', 'http://localhost:8100'];
// const corsOptions = {
//   credentials: true, // This is important.
//   origin: (origin, callback) => {
//     if(whitelist.includes(origin))
//       return callback(null, true)
//       callback(new Error('Not allowed by CORS'));
//   }
// }
//add midleware
// app.use(cors(corsOptions));


app.use(cors({ origin: '*' }));

//body-parser
app.use(bodyparser.json());

//static file
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', login);

app.use('/api', subCategory);
app.use('/api', ads);
app.use('/api', featuredAds);
app.use('/api', facility);
app.use('/api', stadium);


//testing server

app.get('/v1', (req, res) => {
	res.send('hello api working perfect');
});

app.listen(port, () => {
	console.log('server start at port:' + port);
});