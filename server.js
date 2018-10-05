const app = require('./app');

app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), (req, res) =>{
    console.log(`Server listening on ${server.address().port}`);
});