(function () {
    "use strict";

    APP.factory("userLogin", ["$http", "$q", "settings", function ($http, $q, settings) {
        var loggedUser;

        return {
            login: function (username, password) {
                var deffered = $q.defer();

                $http.post("/login", {
                    username: username,
                    password: password
                }).then(function (response) {
                    loggedUser = username;
                    deffered.resolve();
                }, function (response) {
                    deffered.reject();
                });

                return deffered.promise;
            },

            logoff: function () {
                loggedUser = undefined;
            },

            getUsername: function () {
                return loggedUser;
            }
        };
    }]);

})();