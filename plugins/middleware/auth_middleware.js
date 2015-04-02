/**
 * Created by LizardEngine on Thu Apr 02 2015 00:28:39 GMT+0300 (EEST)
 *
 * NPM package: https://www.npmjs.com/package/lizard-engine
 * Github: https://github.com/PoluosmakAndrew/lizard-engine
 *
 * Support: https://github.com/PoluosmakAndrew/lizard-engine/issues
 */

var lizard = require('lizard-engine'),
    passport = require('passport'),
    config = require('./auth.json');

module.exports = function(app)
{
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    app.use(passport.initialize());
    app.use(passport.session());

    var strategies = lizard.import(lizard.get('plugins dir')+"/middleware/strategies");

    if(strategies != null){
        for(var key in strategies){

            if(strategies.hasOwnProperty(key)
               && config.provides.hasOwnProperty(key)
               && config.provides[key].hasOwnProperty('enable')
               && config.provides[key]['enable'] === true){

                strategies[key].call(this, config);

                app.get(config.auth_url.replace("{provider}", key), passport.authenticate(key));
                app.get(config.callback_url.replace("{provider}", key), passport.authenticate(key, {failureRedirect: '/'}),
                    function(req, res) {
                        req.session.user = req.user;
                        res.redirect('/');
                    });
            }

        }
    }

    app.use(function(req, res, next){
        res.locals.user = req.session.user;
        next();
    });
};
