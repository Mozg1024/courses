(function () {
    "use strict";

    APP.filter("minutesToTimeString", function () {
        return function (minutes) {
            var hours,
                mins;

            minutes = isNaN(minutes) ? 0 : minutes;
            minutes = Math.abs(Math.floor(minutes));

            hours = Math.floor(minutes / 60);
            mins = minutes - (hours * 60);

            mins = (mins < 10) ? ("0" + mins) : (mins);
            mins = (mins > 1) ? (mins + " minutes") : (mins + " minute");
            hours = (hours > 1) ? (hours + " hours") : (hours + " hour");

            return hours + " " + mins;
        };
    });

})();