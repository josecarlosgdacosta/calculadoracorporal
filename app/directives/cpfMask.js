/**
 * Created by jose.costa on 06/07/2016.
 */
module.exports = function () {
    return {
        require: "ngModel",
        link: function (scope, element, attrs, controller) {
            element.bind("keyup", function () {

                var _createCpfMask = function (value) {
                    value = value.replace(/\D/g,"");
                    value = value.replace(/(\d{3})(\d)/, "$1.$2");
                    value = value.replace(/(\d{3})(\d)/, "$1.$2");
                    value = value.replace(/(\d{3})(\d{1,2})/, "$1-$2");
                    value = value.replace(/(-\d{2})(\d|\D)+/, "$1");

                    return value;
                };

                controller.$setViewValue(_createCpfMask(controller.$viewValue));
                controller.$render();
            });

            controller.$parsers.push(function(value) {
                value = value.replace(/[^0-9]+/g, "");
                return value;
            });

        }
    }
}