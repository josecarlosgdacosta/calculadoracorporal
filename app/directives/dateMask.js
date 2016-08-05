/**
 * Created by jose.costa on 07/07/2016.
 */
module.exports = function () {

    return {
        require: "ngModel",
        link: function (scope, element, attrs, controller) {
            element.bind("keyup", function () {

                var _createDateMask = function (value) {
                    value = value.replace(/\D/g,"");
                    value = value.replace(/(\d{2})(\d)/, "$1/$2");
                    value = value.replace(/(\d{2})(\d)/, "$1/$2");
                    value = value.replace(/(\d{2})(\d{2})/, "$1$2");
                    value = value.replace(/(\/\d{4})(\d|\D)+/, "$1");

                    return value;
                };

                controller.$setViewValue(_createDateMask(controller.$viewValue));
                controller.$render();
            });

            controller.$parsers.push(function(value) {
                value = value.replace(/\D/g, "");
                value = value.replace(/(\d{2})(\d{2})(\d{4})/, "$3-$2-$1");
                return value;
            });

        }
    }

}