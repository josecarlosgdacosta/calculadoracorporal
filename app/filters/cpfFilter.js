/**
 * Created by jose.costa on 06/07/2016.
 */
module.exports = function () {
    return function (cpf) {
        cpf = cpf.replace(/\D/g,"");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d{1,2})/, "$1-$2");
        cpf = cpf.replace(/$(-\d{2})/, "");

        return cpf;
    }
}