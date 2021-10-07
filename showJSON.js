

var showJson = (function() {
    var out = [];
    var indent = 0;
    var dent =  function (indent) { return Array(indent+1).join(" "); };

    var load =  function(cols, newData, indent, depth) {
        indent = indent || 0;
        // if (!!depth) lngth = Math.min(lngth, depth); 
        

        for (var i = 0; i < cols.length; i++) {
            var colname = cols[i];
            if (newData[colname])
                loadProperty(colname, newData[colname], indent);
        }
    };

     var loadProperty = function(prop, val, indent) {
         var handler = {
                "[object Object]" : function () {
                    indent+=2;
                    // out[out.length] = dent(indent) + prop + ' : ';
                    load(val, indent);
                },
                "default" : function () {
                    out[out.length] = dent(indent) + prop + ' : ' + val
                }
         };
         var typ = ({}).toString.call(val);
         (handler[typ] || handler.default)(typ)
     };

     return function get(cols, newData, indent, depth) {
        out = [];
         load(cols, newData, indent, depth);
        return out.join('\n');
    };
})();

module.exports = showJson;
