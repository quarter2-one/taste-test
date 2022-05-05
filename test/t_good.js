var assert = require('assert');
var taste = require('taste-test');
var test = new taste.Test();

var taste_test = {
    "In good taste tests.": {
        "Gender non-binary beef.":
            function itWorks() {
                assert.equal("Good-taste", "Good-taste", "Not in good taste.");
                return true;
            },
        "Pictures on your gran": {
            "a. Pictures on your gran.":
                function () {
                    assert.equal("Good-taste", "Good-taste", "In good taste.");
                    return true;
                },
            "b. Pictures on your gran naked.":
                function () {
                    throw new Error("Not in good taste!");
                }
        },

    },
    "In bad taste tests.": {
        "Gender non-binary donkey meat.":
            function itWorks() {
                assert.equal("Bad-taste", "Bad-taste", "Not in good taste.");
                return true;
            },
        "Pictures on your gran": {
            "a. Pictures on your gran doing rodeo.":
                function () {
                    assert.equal("Good-taste", "Bad-taste", "Not in bad taste.");
                    return true;
                },
            "b. Pictures on your gran doing rodeo naked.":
                function () {
                    assert.equal("Bad-taste", "Bad-taste", "Not in bad taste.");
                    return true;
                }
        },
    }
};

test.describe(taste_test);