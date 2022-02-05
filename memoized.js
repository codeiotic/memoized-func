"use strict";
exports.__esModule = true;
var memoizedFunction = function (func) {
    var cache = new Map();
    return function (param) {
        if (cache.has(param)) {
            return cache.get(param);
        }
        var result = func(param);
        cache.set(param, result);
        return result;
    };
};
exports["default"] = memoizedFunction;