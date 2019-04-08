const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// const offices = require('./controllers/offices');

const app = express();
const port = 3000 || process.env.PORT;
const apiVersion1 = '/api/v1';

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('navigate to /api/v1');
});

app.get(apiVersion1, (req, res) => {
  let message = 'api version 1 is active \nnavigate to /offices to see offices';
  res.send(message);
});

app.get(`${apiVersion1}/offices`, (req, res) => {
	let offices = fs.readFileSync('./server/offices.js');
	res.status(200).send(JSON.parse(offices));
})

app.post(`${apiVersion1}/offices`, (req, res) => {
	let body = req.body;
	let {id, type, name} = body;

	let offices = fs.readFileSync('./server/offices.js');
	let all = JSON.parse(offices);

	let filteredOffices = all.filter((office) => office.name.toUpperCase() === name.toUpperCase());
	let filteredId = all.filter((office) => office.id === id);
	if (filteredId === 0) {
		id += 1;
	}

	let office = {
		type,
		name
	}

	if (filteredOffices.length === 0) {
		all.push(office);
		fs.writeFileSync('./server/offices.js', JSON.stringify(all))
		res.sendStatus(201);
	}
})

app.listen(port, () => console.log(`Listening on port ${port}`));