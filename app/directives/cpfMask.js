/**
 * Created by jose.costa on 06/07/2016.
 */
module.exports = function () {
    return {
        require: "ngModel",
        link: function (scope, element, attrs, controller) {
            //console.log(element.event.type);

            //console.log(element);

            element.bind("paste", function () {
               console.log("proibido colar");
            });

            element.bind("keyup", function () {
                var _createCpfMask = function (value) {
                    value = value.replace(/\D/g, "");
                    value = value.replace(/(\d{3})(\d)/, "$1.$2");
                    value = value.replace(/(\d{3})(\d)/, "$1.$2");
                    value = value.replace(/(\d{3})(\d{1,2})/, "$1-$2");
                    value = value.replace(/(-\d{2})(\d|\D)+/, "$1");
                    return value;
                };

                controller.$setViewValue(_createCpfMask(controller.$viewValue));
                controller.$render();
            });

            controller.$formatters.push(function(modelValue) {
                if (typeof(modelValue) !== "undefined") {
                    modelValue = modelValue.replace(/\D/g, "");
                    modelValue = modelValue.replace(/(\d{3})(\d)/, "$1.$2");
                    modelValue = modelValue.replace(/(\d{3})(\d)/, "$1.$2");
                    modelValue = modelValue.replace(/(\d{3})(\d{1,2})/, "$1-$2");
                    modelValue = modelValue.replace(/(-\d{2})(\d|\D)+/, "$1");
                    return modelValue;
                }
            });

            controller.$parsers.push(function(viewValue) {
                viewValue = viewValue.replace(/[^0-9]+/g, "");
                return viewValue;
            });



        }
    }
}