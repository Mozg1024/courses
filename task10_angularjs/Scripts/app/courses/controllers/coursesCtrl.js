(function () {
    "use strict";

    APP.controller("CoursesCtrl", ["$scope", "$rootScope", "$modal", "Courses",
    function ($scope, $rootScope, $modal, Courses) {

        $rootScope.breadcrumbs = [{
            href: "/#/",
            label: "Courses"
        }];

        $scope.courses = Courses.getAll();

        $scope.delete = function (id) {

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: "/partials/modalDelete.html",
                controller: "ModalDeleteCtrl"
            });

            modalInstance.result.then(function (result) {
                if (result === "delete") {
                    Courses.delete(id);
                    $scope.courses = Courses.getAll();
                }
            });
        };

    }]);

})();