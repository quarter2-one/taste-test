var statistics = require('./stats.js');

var output = console.log;

function Performance() {
    var testIndex = {};
    var allRecords = {}
    var testRecords = {};

    this.add = function (name, fn) {
        testIndex[name] = fn;
    }

    this.run = function run(runsPerTest, message) {
        if (runsPerTest < 1) return;
        showStartMessage(runsPerTest, message);

        for (var name in testIndex) {
            var startT = Date.now();
            for (var i = 0; i < runsPerTest; i++) {
                testIndex[name]()
            }
            var endT = Date.now()
            var rsult = endT - startT;
            record(name, rsult);
        }
        showAllTestResult(runsPerTest);
    };

    this.runAsynch = function runAsync(runsPerTest, message) {
        if (runsPerTest < 1) return;
        showStartMessage(runsPerTest, message);

        var keyIndex = 0;
        var keys = Object.keys(testIndex);
        var tests = keys.length;
        var remaining = tests * runsPerTest;
        function next() {
            keyIndex += !(remaining%runsPerTest);
            var key = keys[keyIndex-1];
            var fn = testIndex[key];
            var startT = null;
            function done() {
                var endT = Date.now()
                var rsult = endT - startT;
                record(key, rsult);
                remaining--;
                if (remaining) process.nextTick(next);
                else showAllTestResult(runsPerTest);
            }
            startT = Date.now();
            fn(done);
        }
        next();
    };
    function showStartMessage(runsPerTest, message) {
      message = message || "Started";
      message += " " + runsPerTest;
      output(message || "Started - " + runsPerTest, '\n');
    };

    function record(key, val) {
        allRecords[key] = allRecords[key] || [];
        allRecords[key].push(val);
    };

    function getStats(allRecords) {
      var rsult = null, out = { lowest : {}, highest : {}};

      function diff(val) {
        return Math.abs(val.reduce(function (a,b) { return a-b; }));
      };

      function lower(stat, newVal, current) {
         if (stat === 'mode') return Math.max.apply(Math, newVal) < Math.max.apply(Math, current);
        if (stat === 'range')return diff(newVal) < diff(current);
        return newVal < current;
      };

      for (var testname in allRecords) {
            out[testname] = rsult = statistics.allInOne(allRecords[testname]);

            Object.keys(rsult).forEach(function (stat) {
              lowest = out.lowest[stat] = (out.lowest[stat] || { testname : '', val : null });
              highest = out.highest[stat] = (out.highest[stat] || { testname : '', val : null });

              var val = rsult[stat];
              if (!lowest.val || lower(stat, val, lowest.val)){ lowest.val = val; lowest.testname = testname; }
              if (!highest.val || !lower(stat, val, highest.val)){ highest.val = val; highest.testname = testname; }
            });
      }
      return out;
    };

    function showAllTestResult(noOfTests) {
        var stats = getStats(allRecords);

        function  showSummary() {
            Object.keys(stats.lowest).forEach(function (stat) {
                output(stat.toUpperCase());
                output("Lowest", ':', stats.lowest[stat].testname, stats.lowest[stat].val);
                output("Highest", ':', stats.highest[stat].testname, stats.highest[stat].val, '\n');
            })
        };
        output(stats);
        output('\n');
        showSummary();
        allRecords = {};
    };
};

module.exports = Performance;
