const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const icons = require(__dirname + '/icons.js')
require('dotenv').config()

let user = []
let images = icons

const dbUrl = process.env.DB_URL;

const app = express()

app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));



app.get('/', (req, res) => {
	axios.get(`https://jsonblob.com/api/jsonBlob/${dbUrl}`)
		.then(respond => {
			user.push(respond.data)
			const {name, bio, url} = user[0]
			res.render('index', {name, bio, url, images})
		});
	//end of axios.get
});

app.post('/', (req, res) => {
	const indexUrl = Number(req.body.url);
	const url = images[indexUrl]
	const {name, bio} = req.body

	axios.put(`https://jsonblob.com/api/jsonBlob/${dbUrl}`,
            {"name": name, "bio": bio, "url" : url},
            { headers: { "Content-Type": "application/json" } }
    	)
        .then(response => {
        	user[0] = response.data
            res.redirect('/')
        })
});




app.listen(process.env.PORT || 3000, () => {
	console.log('server running on port 3000')
})

// 