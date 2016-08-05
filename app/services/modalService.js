/**
 * Created by jose.costa on 11/07/2016.
 */
module.exports = function ($uibModal) {

    var _openModal = function (template, messageType, messageText) {

        var modalInstance = $uibModal.open({
            templateUrl: template,
            controller: ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {
                $scope.modalMessage = {
                    messageType: messageType,
                    messageText: messageText
                };

                $scope.closeModalZeca = function () {
                    $uibModalInstance.close();
                }
            }]
        });
    };

    return {
        openModal: _openModal
    };

}