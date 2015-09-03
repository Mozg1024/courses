(function () {
    "use strict";

    APP.run(["$httpBackend", "settings", function ($httpBackend, settings) {

        $httpBackend.whenPOST(/^\/login$/i).respond(function (method, url, data) {
            var loginObj = angular.fromJson(data);

            if ((loginObj.username === settings.username) &&
            (loginObj.password === settings.password)) {
                return [200];
            }

            return [403];
        });

    }]);

})();