const { volumeSchema } = require('./schemas.js');

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in to do that');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateVolumes = (req, res, next) => {
    const { error } = volumeSchema.validate(req.body)
    if(error){ // result has an error object on it
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        return next();
    }
}
