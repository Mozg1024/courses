(function () {
    "use strict";

    APP.run(["$httpBackend", function ($httpBackend) {

        var courses = [
            {
                id: 0,
                title: "Видеокурс 1",
                date: "01.01.2015",
                length: 145,
                description: "Lorem ipsum dolor sit amet. Consectetur, adipisci velit, sed ut " +
                    "perspiciatis, unde omnis dolor. Maiores alias consequatur aut rerum " +
                    "necessitatibus. Itaque earum rerum facilis est et iusto. Vero eos et " +
                    "dolorum fuga necessitatibus saepe eveniet.",
                authors: ["Иванов", "Петров", "Сидоров"]
            },
            {
                id: 1,
                title: "Видеокурс 2",
                date: "11.05.2014",
                length: 181,
                description: "Lorem ipsum dolor sit amet. Consectetur, adipisci velit, sed ut " +
                    "perspiciatis, unde omnis dolor. Maiores alias consequatur aut rerum " +
                    "necessitatibus. Itaque earum rerum facilis est et iusto. Vero eos et " +
                    "dolorum fuga necessitatibus saepe eveniet.",
                authors: ["Пушкин", "Толстой", "Лермонтов"]
            },
            {
                id: 2,
                title: "Видеокурс 3",
                date: "03.28.2009",
                length: 35,
                description: "Lorem ipsum dolor sit amet. Consectetur, adipisci velit, sed ut " +
                    "perspiciatis, unde omnis dolor. Maiores alias consequatur aut rerum " +
                    "necessitatibus. Itaque earum rerum facilis est et iusto. Vero eos et " +
                    "dolorum fuga necessitatibus saepe eveniet.",
                authors: ["Маркес", "Экзюпери", "Ремарк"]
            }
        ];

        //$httpBackend start

        $httpBackend.whenGET(/^\/courses\/?$/i).respond(courses);

        $httpBackend.whenGET(/^\/courses\/\d+$/i).respond(function (method, url) {
            var pattern = /\d+/i,
                id = +url.match(pattern),
                course = getCourse(id);

            return course ? [200, course, {}] : [404];
        });

        $httpBackend.whenPUT(/^\/courses((\/?)|((\/new)\/?)?)$/i).respond(
        function (method, url, data) {
            var course = angular.fromJson(data);

            course.id = newId();
            courses.push(course);

            return [200];
        });

        $httpBackend.whenPOST(/^\/courses\/\d+$/i).respond(function (method, url, data) {
            var pattern = /\d+/i,
                course = angular.fromJson(data);

            course.id = +url.match(pattern);

            return updateCourse(course) ? [200] : [404];
        });

        $httpBackend.whenDELETE(/^\/courses\/\d+$/i).respond(function (method, url) {
            var pattern = /\d+/i,
                id = +url.match(pattern),
                course = deleteCourse(id);

            return course ? [200] : [404];
        });

        $httpBackend.whenGET().passThrough();
        $httpBackend.whenPOST().passThrough();

        //helpers start

        function newId() {
            var max = 0,
                i,
                length = courses.length;

            for (i = 0; i < length; i++) {
                if (courses[i].id > max) {
                    max = courses[i].id;
                }
            }

            return ++max;
        }

        function getCourse(id) {
            var i,
                length = courses.length;

            for (i = 0; i < length; i++) {
                if (courses[i].id === id) {
                    return courses[i];
                }
            }
        }

        function updateCourse(course) {
            var i,
                length = courses.length,
                id = course.id;

            for (i = 0; i < length; i++) {
                if (courses[i].id === id) {
                    courses[i] = course;
                    return course;
                }
            }
        }

        function deleteCourse(id) {
            var i,
                length = courses.length;

            for (i = 0; i < length; i++) {
                if (courses[i].id === id) {
                    return courses.splice(i, 1);
                }
            }
        }

    }]);

})();