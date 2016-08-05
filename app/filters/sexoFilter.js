/**
 * Created by jose.costa on 06/07/2016.
 */
module.exports = function () {
    return function (initialsSex) {
        var sex = null;
        if (initialsSex == "M") {
            sex = "Masculino";
        } else if (initialsSex == "F") {
            sex = "Feminino";
        }
        return sex;
    }
}