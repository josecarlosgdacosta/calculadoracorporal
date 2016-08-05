/**
 * Created by jose.costa on 06/07/2016.
 */
module.exports = function () {
    return function (date1, date2) {
        var currentDate = date2 || new Date();
        var birthDate = new Date(date1);
        var diff = currentDate.getTime() - birthDate.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }
}