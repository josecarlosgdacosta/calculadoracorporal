/**
 * Created by jose.costa on 13/07/2016.
 */
module.exports = function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/pages/home.html",
            controller: "HomeController"
        })
        .when("/usuario/consultar", {
            templateUrl: "/pages/usuario-lista.html",
            controller: "UserController",
            resolve: {
                routeInfo: function () {
                    return {
                        pageTitle: "Consultar usuários"
                    }
                }
            }
        })
        .when("/usuario/novo", {
            templateUrl: "/pages/usuario-novo.html",
            controller: "UserController",
            resolve: {
                routeInfo: function () {
                    return {
                        pageTitle: "Novo usuário"
                    }
                }
            }
        })
        .when("/usuario/editar/:idUsuario", {
            templateUrl: "/pages/usuario-editar.html",
            controller: "UserController",
            resolve: {
                routeInfo: function () {
                    return {
                        pageTitle: "Editar usuário"
                    }
                }
            }
        })
        .otherwise({
            redirectTo: "/"
        });
}