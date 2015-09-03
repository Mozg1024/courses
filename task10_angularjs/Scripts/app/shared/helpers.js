(function () {
    "use strict";

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