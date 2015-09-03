(function () {
    "use strict";

    APP.controller("ModalDeleteCtrl", ["$scope", "$modalInstance",
    function ($scope, $modalInstance) {

        $scope.ok = function () {
            $modalInstance.close("delete");
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };

    }]);

})();