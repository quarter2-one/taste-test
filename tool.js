module.exports = {
    "loop" : function (start, end, func) {
        for (var i = start; i <= end; i++) {
            func(i);
        };
    }

};
