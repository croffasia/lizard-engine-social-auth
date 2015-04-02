/**
 * Created by LizardEngine on Thu Apr 02 2015 00:28:39 GMT+0300 (EEST)
 *
 * NPM package: https://www.npmjs.com/package/lizard-engine
 * Github: https://github.com/PoluosmakAndrew/lizard-engine
 *
 * Support: https://github.com/PoluosmakAndrew/lizard-engine/issues
 */

var lizard = require('lizard-engine');

/**
 * findOrCreate User
 * @param profile
 * @param next
 */
module.exports = function(profile, next)
{
    /**
     * Здесь можете добавить функциональность поиска или создания нового пользователя в базе данных.
     * По умолчанию отдается объект профайла пользователя библиотеки passport.
     *
     * Информация о полях профиля пользователя: http://passportjs.org/guide/profile/
     */

    /**
     * @param 1 Error
     * @param 2 User Document
     */
    next(null, profile);
};
