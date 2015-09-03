(function () {
    "use strict";

    APP.controller("mainCtrl", ["$scope", "$rootScope", "$location", "userLogin",
    function ($scope, $rootScope, $location, userLogin) {

        $scope.userLogin = userLogin.getUsername;

        if (!$scope.userLogin()) {
            $location.path("/login");
        }

        $scope.checkDisableClass = function (crumb) {
            var breadcrumbs = $rootScope.breadcrumbs;

            if (crumb.disabled || crumb === breadcrumbs[breadcrumbs.length - 1]) {
                return "disabled";
            }
        };

        $scope.checkDisableHref = function (crumb) {
            var breadcrumbs = $rootScope.breadcrumbs;

            if (crumb.disabled || crumb === breadcrumbs[breadcrumbs.length - 1]) {
                return "";
            }

            return crumb.href;
        };

        $scope.logoff = function () {
            userLogin.logoff();
        };

    }]);

})();