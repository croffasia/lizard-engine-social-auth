/**
 * Created by andriipoluosmak on 02.04.15.
 */

var passport = require('passport'),
    VKontakteStrategy = require('passport-vkontakte').Strategy;

module.exports = function(config){

    passport.use(new VKontakteStrategy({

        clientID        : config.provides.vkontakte.appId,
        clientSecret    : config.provides.vkontakte.appSecret,
        callbackURL     : config.base_url + config.callback_url.replace("{provider}", "vkontakte")

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