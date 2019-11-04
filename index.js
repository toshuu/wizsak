const express = require('express');
const Datastore = require('nedb');
require('dotenv').config();


const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('listening at ${port}');
});
	
	
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();
database.insert({name: 'Sheefam', status: 'Active'});
database.insert({name: 'CCD', status: 'Active'});

app.post('/api', (request, response) => {
	console.log('I got a request!');
	const data = request.body;
	const timestamp = Date.now();
	data.timestamp = timestamp;
	database.insert(data);
	
	response.json({
		status: 'success',
		timestamp: timestamp,
		latitude: lat,
		longitude: lon
	});
});