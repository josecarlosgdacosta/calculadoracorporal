/**
 * Created by jose.costa on 24/06/2016.
 */
require("angular");
require("angular-route");
require("jquery/jquery.min.js");
require("bootstrap/dist/js/bootstrap.min.js");
require("bootstrap/js/dropdown.js");
require("bootstrap/js/tooltip.js");
require("angular-ui-bootstrap/dist/ui-bootstrap-tpls.js");

// Arquivos de configuração.
var routeConfig = require("./config/routeConfig");

// Serviços.
var usuarioService = require("./services/usuarioService");
var utilsService = require("./services/utilsService");
var modalService = require("./services/modalService");

// Controllers.
var UserController = require("./controllers/UserController");
var HomeController = require("./controllers/HomeController");

// Diretivas.
var cpfMask = require("./directives/cpfMask");
var dateMask = require("./directives/dateMask");

// Filtros.
var sexoFilter = require("./filters/sexoFilter");
var ageFromBirthFilter = require("./filters/ageFromBirthFilter");
var cpfFilter = require("./filters/cpfFilter");

// Criação do módulo.
var app = angular.module("App", ["ngRoute", "ui.bootstrap"]);

// Configuração do módulo.
app.config(["$routeProvider", routeConfig]);

// Injeção dos serviços.
app.factory("usuarioService", ["$rootScope", "$http", usuarioService]);
app.factory("utilsService", [utilsService]);
app.factory("modalService", ["$uibModal", modalService]);

// Injeção dos filtros.
app.filter("ageFromBirth", [ageFromBirthFilter]);
app.filter("sexo", [sexoFilter]);
app.filter("cpf", [cpfFilter]);

// Injeção das diretivas.
app.directive("cpfMask", [cpfMask]);
app.directive("dateMask", [dateMask]);

// Injeção dos controllers.
app.controller("HomeController", ["$scope", HomeController]);
app.controller("UserController", ["$rootScope", "$scope", "$http", "$routeParams", "$window", "usuarioService", "utilsService", "modalService", "routeInfo", UserController]);