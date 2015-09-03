
var APP = angular.module("APP", ["ngMessages", "ngRoute", "ngResource", "ngMockE2E", "ui.bootstrap"]);

(function () {
    "use strict";

    APP.constant("settings", {
        username: "admin",
        password: "admin"
    });

    APP.config(["$routeProvider", "$locationProvider",
    function ($routeProvider, $locationProvider) {

        $routeProvider
            .when("/", { templateUrl: "/partials/courses.html" })
            .when("/login", { templateUrl: "/partials/login.html" })
            .when("/courses/:id", { templateUrl: "/partials/courseDetails.html" })
            .when("/404", { templateUrl: "/partials/404.html" })
            .otherwise({ redirectTo: "/" });

        $locationProvider.html5Mode(false);

    }]);

    APP.run(function ($location, $rootScope, userLogin) {
        $rootScope.$on("$routeChangeStart", function () {
            if (!userLogin.getUsername()) {
                $location.path("/login");
            }
        });
    });

    APP.helpers = {};

    APP.helpers.arraySubtract = function (arr1, arr2) {
        var index,
            length,
            i;

        if (Array.isArray(arr1) && Array.isArray(arr2)) {
            length = arr2.length;

            for (i = 0; i < length; i++) {
                index = arr1.indexOf(arr2[i]);
                arr1.splice(index, index < 0 ? 0 : 1);
            }
        }
    };

    APP.helpers.arrayConcat = function (arr1, arr2) {
        var index,
            length,
            i;

        if (Array.isArray(arr1) && Array.isArray(arr2)) {
            length = arr2.length;

            for (i = 0; i < length; i++) {
                index = arr1.indexOf(arr2[i]);
                arr1[arr1.length] = index < 0 ? arr2[i] : [];
            }
        }
    };

})();