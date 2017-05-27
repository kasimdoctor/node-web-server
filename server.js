const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

// Register middleware by using app.use
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    
    fs.appendFile('server.log', log + '\n');
    next();
});

// This middleware will render maintenance page and 
// dis allow anything else from loading due to missing call
// to next(); !
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (textToScream) => {
    return textToScream.toUpperCase();
});

app.get('/', (request, response) => {
    // response.send('<h1>Hello Express!</h1>');
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my site!'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (request, response) => {
    response.send({
        error: 'Error handling request'
    });
})

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
