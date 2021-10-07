

var Taste =  require('../taste.js');


Error.stackTraceLimit = 0;

var msg = "Property not added correctly.";
var tryMergeProperty = function (val, cb) {
    return function () {
          return true;
    }
};


var tasteTest = new Taste();

tasteTest.describe(
{
  "Main tests" : {
    "Test 1" : function () {
      return (this.rent === 8000);
    },
    "vars" : {
      'rent'  : 8000
    }
  },
  "Other tests" : {
    "Weight tests" : {
      "beforeEach" : function () {
        this.beforeEachCalled = true;
      },
      "afterEach" : function () {
        this.afterEachCalled = true;
      },
      "weight test 1" : function () {
        return (this.beforeEachCalled);
      },
      "weight test 2" : function () {
        return (this.afterEachCalled);
      },
    },
    "Height tests": {
      "Height test 1" : function () {
        return true;
      }
    },
    "Personality test" : {
      "Social" : {
        "Family" : {
          "Dad" : function () {
            return true
          },
          "Pal" : function () {
            return true;
          }
        },
      }
    },
    "Levels" : {
      "Sub section level 1" : {
        "Sub section level 2" : {
          "Test at level 2" : function () {
            return true;
          },
          "Sub section level 3" : {
            "Sub section level 4" : {
              "Sub section level 5" : {
                  "test at level 5" : function () {
                    return true;
                  },
                  "test 2 at level 5" : function () {
                    return true;
                  }
              }
            }
          }
        }
      }
    }
  }

});
