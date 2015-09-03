(function () {
    "use strict";

    APP.directive("ngDate", function () {

        return {
            restrict: "A",
            require: "ngModel",
            scope: {
                "ngModel": "=" // remove
            },
            link: function (scope, elm, attr, ngModel) {
                scope.$watch("ngModel", function (newValue, oldValue) {
                    scope.ngModel = isDateValid(newValue) ? newValue : oldValue;
                });
            }
        };

        function isDateValid(date) {
            var pattern = /((0[1-9])|([12]\d)|(3[01]))\.((0[1-9])|(1[012]))\.\d{4}/i,
                mask = "11.11.1111",
                temp;

            if (date) {
                temp = date + mask.slice(date.length);
                return pattern.test(temp) && temp.length <= mask.length;
            }
            return true;
        }

    });

})();