(function () {
    "use strict";

    APP.controller("CourseDetailsCtrl", ["$scope", "$rootScope", "$location", "$q", "Courses",
    function ($scope, $rootScope, $location, $q, Courses) {

        var id = $location.path().slice("/courses/".length),
            newCourse = false,
            authors = Courses.getAuthors(),
            course = Courses.get(id);

        $scope.allAuthors = authors;
        $scope.course = course;

        if (id === "new") {
            $scope.course = {};
            $scope.course.title = "";
            $scope.course.description = "";
            $scope.course.date = "";
            $scope.course.length = 0;
            $scope.course.authors = [];

            newCourse = true;
            $rootScope.breadcrumbs = [{
                href: "/#/",
                label: "Courses"
            }, {
                href: "/#" + $location.path(),
                label: "New course"
            }];
        }

        course.$promise.then(undefined, function () {
            if (!newCourse) {
                $location.path("/404");
            }
        });

        $q.all([authors.$promise, course.$promise]).then(function () {
            $rootScope.breadcrumbs = [{
                href: "/#/",
                label: "Courses"
            }, {
                href: "/#" + $location.path(),
                label: course.title
            }];

            APP.helpers.arraySubtract($scope.allAuthors, $scope.course.authors);
        });

        $scope.addCourseAuthors = function (authors) {
            APP.helpers.arrayConcat($scope.course.authors, authors);
            APP.helpers.arraySubtract($scope.allAuthors, authors);
        };

        $scope.removeCourseAuthors = function (authors) {
            APP.helpers.arrayConcat($scope.allAuthors, authors);
            APP.helpers.arraySubtract($scope.course.authors, authors);
        };

        $scope.formSubmit = function () {
            if (newCourse) {
                Courses.add($scope.course);
            } else {
                Courses.update($scope.course);
            }
            $location.path("/");
        };

        $scope.cancel = function () {
            $location.path("/");
        };

    }]);

})();