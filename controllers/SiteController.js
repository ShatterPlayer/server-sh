exports.home = (req, res, next) => {
    res.render('home', {response: req.flash('response')});
};