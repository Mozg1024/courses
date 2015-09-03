(function () {
    "use strict";

    APP.directive("ngTimeString", function () {
        return {
            restrict: "A",
            scope: {
                "ngTimeString": "="
            },
            template: "{{ngTimeString | minutesToTimeString}}"
        };
    });

})();