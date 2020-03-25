// Setting the Express
const express = require('express');
const app = express();

// Required data.json 

const {
	projects
} = require('./data.json');

//Serve static files
app.use('/static', express.static('public'));

//Set view engine to pug
app.set('view engine', 'pug');

//index route
app.get('/', (req, res) => {
	res.render('index', {
		projects
	});
});
// About route
app.get('/about', (req, res) => {
	res.render('about');
});

//projects route
app.get('/project/:id', (req, res, next) => {
	const projectId = req.params.id;
	if (projectId < projects.length) {
		const project = projects.find(({
			id
		}) => id === +projectId);
		res.render('project', {
			project
		});
	} else {
		let err = new Error('This Project not Exist');
		err.statusCode = 404;
		next(err);
	}
});


//The 404 Route for pages not exist //*Stack overflow* //
app.get('*', function (req, res, next) {
	let err = new Error('This Page not found');
	err.statusCode = 404;
	next(err);
});
app.use((err, req, res, next) => {
	console.log('Sorry! This page not Exist')
	res.locals.error = err;
	res.render('error'); //render error page

});



//Starting a server on port 3000
app.listen(3000, () => {
	console.log('App is running on localhost:3000');
});
