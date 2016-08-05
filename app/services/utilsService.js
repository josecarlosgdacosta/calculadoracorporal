/**
 * Created by jose.costa on 07/07/2016.
 */
module.exports = function () {

    var _objectLength = function (obj) {

        var len = 0;

        if (typeof(obj) === "object") {
            len = Object.keys(obj).length;
        }
        return len;
    };

    return {
        objectLength: _objectLength
    }

}
