/**
 * Created by andriipoluosmak on 02.04.15.
 */

var passport = require('passport')
    lizard   = require('lizard-engine'),
    FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(config){

    passport.use(new FacebookStrategy({

        clientID        : config.provides.facebook.appId,
        clientSecret    : config.provides.facebook.appSecret,
        callbackURL     : config.base_url + config.callback_url.replace("{provider}", "facebook")

    }, function(token, tokenSecret, profile, done) {

        process.nextTick(function() {

            if(config.hasOwnProperty('user_access_plugin') && config['user_access_plugin'] != ""){
                lizard.Plugins.Run(null, config.user_access_plugin, profile, function(err, result){

                    done(null, result);

                });
            } else {
                done(null, profile);
            }
        });

    }));
};