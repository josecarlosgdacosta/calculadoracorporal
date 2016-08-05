/**
 * Created by jose.costa on 27/06/2016.
 */
module.exports = function ($rootScope, $http) {

    var _getAtletas = function () {
        $rootScope.$emit("START_LOADING_USERS");
        return $http.get("http://localhost:8081");
    };

    var _getAtleta = function (idUser) {
        var config = {
            params: {idUsuario: idUser}
        };
        return $http.get("http://localhost:8081", config);
    };

    var _saveUser = function (user) {
        $rootScope.$emit("START_SAVE_USER");
        return $http.post("http://localhost:8081", user);
    };

    var _deleteUser = function (user) {
        $rootScope.$emit("START_DELETE_USER");
        return $http.post("http://localhost:8081", user);
    };

    return {
        getAtletas: _getAtletas,
        saveUser: _saveUser,
        deleteUser: _deleteUser,
        getAtleta: _getAtleta
    };
}