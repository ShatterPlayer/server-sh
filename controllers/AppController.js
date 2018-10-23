exports.store = (req, res, next) =>{
   const mysql = require('mysql');
   var con = mysql.createConnection({
    host: 'db4free.net',
    user: 'shatterplayer',
    password: 'shatterland',
    database: 'shatterland'
   });

   con.connect((err) =>{
    if(err) throw err;

    con.query(`INSERT INTO Notes (NoteText, NoteCategory) VALUES ('${req.body.text}', '${req.body.category}')`, (err, r) =>{
        if(err) throw err;

        req.flash('response', 'Notatka została zapisana w bazie :)');
        res.redirect('/');
    });
   });
};

exports.verifypass = (req, res, next) =>{
    if(req.body.password != 'qwerty123')
    {
        req.flash('response', 'Niepoprawne hasło !!!')
        res.redirect('/');
    }
    else
        next();
};