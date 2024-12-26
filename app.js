const express = require('express')
const mongoose = require('mongoose')
const app = express()

const userSchema = new mongoose.Schema({
	name: String,
	lastName: String,
})

const User = new mongoose.model('User', userSchema)

app.get('/', (req, res) => {
	const newUser = new User({
		name: 'ahmed',
		lastName: 'ashraf',
	})

	newUser.save(err => {
		if (err) {
			res.write('err')
		}
	})
	res.write('<h3>He</h3>')
	res.write(`${newUser.name}${newUser.lastName}`)
	res.send()
})

app.get('/:requestedURl', (req, res) => {
	const params = req.params.requestedURl
	if (params !== 'ahmed') {
		res.send('404 resource not found')
	} else {
		res.send('ahmed')
	}
})

app.listen(3000)
