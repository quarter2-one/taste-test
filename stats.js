var stats = {
  mean : function mean(array) {
      var total = 0, i = array.length;
      while(i-->0) total += array[i];
      return total / array.length;
  },
  median : function median(array) {
      var median = 0, lngth = array.length;
      array.sort();
      if (lngth % 2 === 0) return (array[lngth / 2 - 1] + array[lngth / 2]) / 2;
      else return array[(lngth - 1) / 2];
  },
  mode : function mode(array) {
    var val = 0, most = 0, counter = {}, counted = [];
    array.forEach(function (rsult) {
        val = counter[rsult] = (counter[rsult] || 0) + 1;
        if (val > most) most = val;
        counted[val] = counted[val]? counted[val] : [];
        counted[val].push(rsult);
    });
    return counted[most];
  },
  range : function range(array) {
      array.sort();
      return [array[0], array[array.length - 1]];
  },

  allInOne : function all(array) {
    var out = { mean : 0, median : -1, mode : [], range : [] }
    array.sort();
    var lngth = array.length;
    /*  median  */
    if (lngth % 2 === 0) out.median =  (array[lngth / 2 - 1] + array[lngth / 2]) / 2;
    else  out.median = array[(lngth - 1) / 2];
    /*  range  */
    out.range = [array[0], array[lngth - 1]];

    var val = 0, most = 0, counter = {}, counted = [], rsult;
    while(lngth-->0){
      rsult = array[lngth];
      /*  mean  */
      out.mean += rsult;

      /*  Mode  */
      val = counter[rsult] = (counter[rsult] || 0) + 1;
      if (val > most) most = val;
      counted[val] = counted[val]? counted[val] : [];
      counted[val].push(rsult);
    };
    out.mean = out.mean / array.length;
    out.mode = counted[most];
    return out;
  }
};

module.exports = stats;
