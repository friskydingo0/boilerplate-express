require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
	console.log(`${req.method} ${req.path} - ${req.ip}`);
	next();
});

app.use('/public', express.static(__dirname + '/public'));


// Paths
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/:word/echo', (req, res) => {
	res.json({ "echo": req.params.word });
});

const nameHandler = (req, res) => {
	if (req.method == 'GET') {
		res.json({ "name": `${req.query.first} ${req.query.last}` });
	}
	else {
		res.json({ "name": `${req.body.first} ${req.body.last}` });
	}
}

app.route('/name').get(nameHandler).post(nameHandler);

app.get('/json', (req, res) => {
	if (process.env.MESSAGE_STYLE == 'uppercase') {
		res.json({ "message": "HELLO JSON" });
	}
	else {
		res.json({ "message": "Hello json" });
	}
});

app.get('/now', (req, res, next) => {
	req.time = new Date().toString();
	next();

}, (req, res, next) => {
	res.json({ "time": req.time });
});


module.exports = app;
