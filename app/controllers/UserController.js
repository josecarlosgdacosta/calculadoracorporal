/**
 * Created by jose.costa on 30/06/2016.
 */
module.exports = function ($rootScope, $scope, $http, $routeParams, $window, usuarioService, utilsService, modalService, routeInfo) {

    // Nome da aplicação.
    $scope.appName = "Calculadora corporal";
    $scope.users = [];
    $scope.addUserFormCollapse = true;
    $scope.saveButton = "Salvar";
    $scope.pageTitle = routeInfo.pageTitle;
    $scope.idUser = $routeParams.idUsuario;

    var newUser = $scope.newUser;

    $scope.resetFormNewUser = function () {
        $scope.newUser = angular.copy(newUser);
        $scope.formUser.$setPristine();
    };

    $scope.listAllUsers = function () {

        $rootScope.$on("START_LOADING_USERS", function() {
            $scope.doingLoadUsers = true;
        });
        usuarioService.getAtletas().then(
            function (response) {
                $scope.users = response.data;
                $rootScope.$emit("END_LOADING_USERS");
            },
            function (response) {
                /*modalService.openModal("modalMessage.html", "danger", _message);*/
                console.log(response);
                $rootScope.$emit("END_LOADING_USERS");
            }
        );
        $rootScope.$on("END_LOADING_USERS", function() {
            $scope.doingLoadUsers = false;
        });
    };

    $scope.findUser = function () {
        usuarioService.getAtleta($scope.idUser).then(
            function (response) {
                $scope.user = response.data[0];
                if (typeof($scope.user) === "undefined") {
                    $window.location.href = "#/usuario/consultar";
                }
            },
            function (response) {
                console.log(response);
            }
        );
    };

    $scope.addUser = function (newUser) {
        $rootScope.$on("START_SAVE_USER", function() {
            $scope.doingSaveUser = true;
            $scope.saveButton = "Aguarde...";
        });

        var _message = null;
        var _type = null;

        if (newUser) {

            newUser["action"] = "save";
            usuarioService.saveUser(newUser).then(
                function (response) {
                    _message = response.data.message;
                    _type = response.data.success == false ? "danger" : "success";
                    $scope.newUser = {};
                    $rootScope.$emit("END_SAVE_USER");
                    modalService.openModal("modalMessage.html", _type, _message);
                },
                function (response) {
                    console.log(response);
                    _message = "Houve uma falha na comunicação com o servidor.";
                    _type = "danger";
                    $rootScope.$emit("END_SAVE_USER");
                    modalService.openModal("modalMessage.html", _type, _message);

                }
            );

        } else {
            _message = "Por favor, preencha todas as informações.";
            _type = "danger";
            modalService.openModal("modalMessage.html", _type, _message);
        }

        $rootScope.$on("END_SAVE_USER", function() {
            $scope.doingSaveUser = false;
            $scope.saveButton = "Salvar";
        });

        $scope.formUser.$setPristine();
    };

    $scope.deleteUser = function (user) {

        $rootScope.$on("START_DELETE_USER", function() {
            $scope.doingDeleteUser = true;
        });

        var _message = null;
        var _type = null;

        if (user) {
            user["action"] = "delete";
            usuarioService.deleteUser(user).then(
                function (response) {
                    _message = response.data.message;
                    _type = response.data.success == false ? "danger" : "success";
                    $scope.listAllUsers();
                    $rootScope.$emit("END_DELETE_USER");
                    modalService.openModal("modalMessage.html", _type, _message);
                },
                function (response) {
                    console.log(response);
                    _message = "Houve uma falha na comunicação com o servidor.";
                    _type = "danger";
                    $rootScope.$emit("END_DELETE_USER");
                    modalService.openModal("modalMessage.html", _type, _message);
                }
            );

            $rootScope.$on("END_DELETE_USER", function() {
                $scope.doingDeleteUser = false;
            });
        }
    }
};