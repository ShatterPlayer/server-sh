const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const router = require('./routes/index');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());

app.use(session({
    secret: 'My database',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

app.use('/', router);

app.use((req, res) =>{
    res.status(404).render('404');
});

app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), () =>{
    console.log(`Listening on ${app.get('port')}`);
});