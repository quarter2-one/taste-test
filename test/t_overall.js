var assert = require('assert');
var taste = require('taste');
taste.columns = ["message", "assertMessage", "actual", "operator", "expected", "fileName", "lineNumber", "functionName"]
//end requires

var test = new taste.Test();
test.timeout = 3500;
test.log = console.log;

test.describe({ "Synchronous tests." : {
    "Shows success." :
         function itWorks() {
            assert.equal("Russia", "Russia", "All swell - that end swell");
            return true;
    },
    "Handles multiple its." :
        function () {
            assert.equal("Russia", "Russia", "All swell - that end swell");
            return true;
    },
    "Shows assertion error." :
         function itWorks() {
            assert.equal("rus", "rul", "Not quite equal.");
            return true;
    },

    "Shows the stack to depth of 1." :
         function errorProneFunction() {
            function inner1() {
                function inner2() {
                  test.stackdepth = 1;
                  throw new Error("Conservative one!")
                }
                inner2();
            }
            inner1();
            return true;
    },

    "Shows the stack to depth of 3." :
         function errorProneFunction() {
            function inner1() {
                function inner2() {
                  test.stackdepth = 3 ;
                  throw new Error("Conservative three!")
                }
                inner2();
            }
            inner1();
            return true;
    },

  },

  "Asynchronous tests." : {
    "Asynch (2 sec. delay)." :
         function itWorks(done) {
            setTimeout(function () {
              done();
            }, 2000);
    },
    "Asynch error." :
         function itWorks(done) {
            done(assert.equal("horse meat", "beef", "Maybe with more sauce."));;
    },
    "Asynch timeout (set to 3500ms). " :
         function itWorks(done) {
           /*  done() not called  */
    }
  },

    "beforeEach" :
         function beforeEach() {
    },
    "afterEach" :
         function afterEach() {
    },

    "Nested describes" : {
        "Shows success." :
            function itWorks() {
                  assert.equal("Russia", "Russia", "All swell - that end swell");
                  return true;
        },
      "Double Nested describes" : {
            "Shows success." :
                 function itWorks() {
                    assert.equal("Russia", "Russia", "All swell - that end swell");
                    return true;
            },
            "Shows another success." :
                 function itWorks() {
                    assert.equal("Russia", "Russia", "All swell - that end swell");
                    return true;
            },

        }
      }
});








/*


 */
