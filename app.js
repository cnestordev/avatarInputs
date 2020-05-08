const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')
let user = []
let images = ['https://i.ya-webdesign.com/images/avatar-icon-png-7.png', 'https://www.clipartmax.com/png/full/257-2572603_user-man-social-avatar-profile-icon-man-avatar-in-circle.png',
'https://cdn.iconscout.com/icon/free/png-256/avatar-368-456320.png', 'https://cdn.iconscout.com/icon/free/png-256/avatar-367-456319.png', 'https://cdn.iconscout.com/icon/free/png-256/avatar-369-456321.png'
]

const app = express()

app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));



app.get('/', (req, res) => {
	axios.get('https://jsonblob.com/api/jsonBlob/fee31509-90d5-11ea-bb21-0bb3ebbec47f')
		.then(respond => {
			user.push(respond.data)
			const {name, bio, url} = user[0]
			res.render('index', {name, bio, url, images})
		});
	//end of axios.get
});

app.post('/', (req, res) => {
	const {name, bio} = req.body
	const newData = {
		name,
		bio
	}
	axios.put('https://jsonblob.com/api/jsonBlob/fee31509-90d5-11ea-bb21-0bb3ebbec47f',
            {"name": newData.name, "bio": newData.bio, "url" : user[0].url},
            { headers: { "Content-Type": "application/json" } }
    	)
        .then(response => {
        	user[0] = response.data
            res.redirect('/')
        })
})




app.listen(3000, () => {
	console.log('server running on port 3000')
})

// 