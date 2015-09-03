(function () {
    "use strict";

    APP.controller("LoginCtrl", ["$scope", "$rootScope", "$location", "userLogin",
    function ($scope, $rootScope, $location, userLogin) {

        $rootScope.breadcrumbs = [{
            href: "/#/login",
            label: "Login"
        }];

        function isUsernameValid() {
            return !/[^A-Z]/i.test($scope.username);
        }

        function isPasswordValid() {
            return !/[^A-Z0-9]/i.test($scope.password);
        }

        $scope.usernameCheckPattern = /^[A-Z]+$/i;
        $scope.validUsername = true;
        $scope.validPassword = true;
        $scope.isLoginValid = true;

        $scope.validateUsername = function () {
            $scope.validUsername = isUsernameValid() && $scope.username;
        };

        $scope.validatePassword = function () {
            $scope.validPassword = isPasswordValid() && $scope.password;
        };

        $scope.isLoginButtonDisabled = function () {
            return !(isUsernameValid() && isPasswordValid() && $scope.username && $scope.password);
        };

        $scope.formSubmit = function () {
            userLogin.login($scope.username, $scope.password).then(function () {
                $scope.isLoginValid = true;
                $location.path("/");
            }, function () {
                $scope.isLoginValid = false;
                $scope.password = "";
            });
        };

    }]);

})();