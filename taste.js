var events = require("events");
var colour = require("cmd-colour");
var tool = require("./tool.js");
var showJSON = require("./showJSON.js");

function Taste(depth) {
  Taste.reporter.depth = depth || 10;
  this.timeout = 5000;
  this.stackdepth = 2;

  this.describe = function describe(def, indent, thenFN) {
    if (typeof def !== "object") throw Error("JSON expected");
    indent = indent || 0; //value might change during asynch callback

    /* Recursively iterate through JSON data provided (def)  */
    var me = this;
    var keys = Object.keys(def);
    var next = function () {
      if (keys.length < 1) return (thenFN || function () {})(); /*  thenFN (if passed) points to the 'next' function of the parent node level. */
      var key = keys.shift();
      if ({ beforeEach: 1, afterEach: 1, vars: 1 }[key]) return next();
      var test = def[key];
      if (typeof test !== "function") {
        Taste.reporter.emit("describe", key, indent);
        me.describe(test, indent + 2, next);
      } else {
        me.singleTest(key, test, next, indent + 1, def["beforeEach"], def["afterEach"], def["vars"]);
      }
    };
    next();
  };

  this.singleTest = function singleTest(itDescription, fnTest, next, indent, beforeEach, afterEach, vars) {
    beforeEach = beforeEach || function () {};
    afterEach = afterEach || function () {};
    var me = this,
      failsA = [],
      ticks = -1;
    function moveOn() {
      ticks = Date.now() - ticks;
      Taste.reporter.emit("it", itDescription, failsA, indent, ticks, me.stackdepth);
      afterEach();
      next();
    }

    /* Setup callback */
    var timer,
      me = this;
    var cb = (function () {
      if (fnTest.length === 0) return undefined;
      timer = setTimeout(function () {
        failsA.push({ message: "Timed-out. Did you remember to call done()?" });
        moveOn();
      }, me.timeout);
      return function (result) {
        clearTimeout(timer);
        if (result != null && result !== true) failsA.push({ message: result });
        moveOn();
      };
    })();

    /* Set fn context to vars passed */
    if (vars) {
      fnTest = fnTest.bind(vars);
      beforeEach = beforeEach.bind(vars);
      afterEach = afterEach.bind(vars);
    }

    /* Run Tests */
    try {
      beforeEach();
      ticks = Date.now();
      var result = fnTest(cb);
      if (cb) return;
      if (!result) throw new Error("Test failed.");
      moveOn(); /* Dont be temptem to put this in a finallly (or after the try-catch), as it must not be called if cb != null. */
    } catch (err) {
      if (timer) clearTimeout(timer);
      //  err.assertMessage = err.message;
      failsA.push(err);
      moveOn();
    }
  };
}
Taste.columns = ["message", "assertMessage", "actual", "operator", "expected", "fileName", "lineNumber", "functionName"];
Taste.log = console.log;

Taste.reporter = (function () {
  var reporter = new events.EventEmitter();
  reporter.on("describe", function (text, indent) {
    Taste.log("\n" + dent(indent) + colour.text.std(text));
  });
  reporter.on("it", function (itDescription, failsA, indent, ticks, depth) {
    var symbol = failsA.length === 0 ? colour.text.green("\u221A") : colour.text.red("X");
    var result = [dent(indent), symbol, itDescription].join(" ");
    if (ticks !== -1) result += " - " + ticks + " ms.";
    Taste.log(" " + result);
    failsA.forEach(function (e) {
      if (e.name && e.name == "AssertionError") showParsed(e, indent, depth);
      else showParsed(getStack(e, depth), indent, depth);
    });
  });
  return reporter;

  /* Private functions   */
  function dent(indent) {
    return Array(indent + 1).join(" ");
  }
  function showParsed(fail, indent, depth) {
    var stack = showJSON(Taste.columns, fail, indent + 4, depth);
    Taste.log(stack);
  }
  function getStack(e, depth) {
    var caller,
      prev = (out = { message: e.message });
    if (!e.stack) return out;
    var parts = e.stack.split("at ");
    var limit = depth ? Math.min(parts.length - 1, depth) : parts.length - 1;
    var match,
      rex = { fileName: /\((.+js)/, lineNumber: /(\d+:\d+)/, functionName: /(.+)\s\(/ };
    tool.loop(0, limit, function (i) {
      for (var key in rex) {
        match = parts[i].match(rex[key]);
        if (!match) continue;
        watch = match[1].match(/(.{30})$/);
        match = !watch ? match[1] : "..." + watch[1];
        prev[key] = match;
      }
      prev = prev.caller = {};
    });
    return out;
  }
})();

module.exports = Taste;
