(function () {
    "use strict";

    APP.service("Courses", ["$resource", function ($resource) {
        var Course = $resource("/courses/:courseId", { courseId: "@id" }, {
            put: { method: "PUT" }
        });

        this.getAll = function () {
            return Course.query();
        };

        this.get = function (id) {
            return Course.get({ courseId: id }, function (data) {
                return data;
            });
        };

        this.add = function (course) {
            Course.put(course);
        };

        this.update = function (course) {
            var newCourse = new Course(course);
            newCourse.$save();
        };

        this.delete = function (id) {
            Course.remove({ courseId: id });
        };

        this.getAuthors = function () {
            var courses = Course.query(),
                authors = [];

            courses.$promise.then(function () {
                var tempAuthors = {},
                    author,
                    i,
                    j,
                    len1 = courses.length,
                    len2;

                for (i = 0; i < len1; i++) {
                    if (courses[i].authors && courses[i].authors.length) {
                        len2 = courses[i].authors.length;
                        for (j = 0; j < len2; j++) {
                            tempAuthors[courses[i].authors[j]] = true;
                        }
                    }
                }

                for (author in tempAuthors) {
                    if (tempAuthors.hasOwnProperty(author)) {
                        authors.push(author);
                    }
                }
            });

            return authors;
        };

    }]);

})();