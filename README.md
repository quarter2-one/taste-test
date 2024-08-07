# taste-test

## taste-test testing-sweet

### Take the taste test, you'll schmaaak it!

### Installation

```
pnpm add -D taste-test
```

### Usage

Are puns in bad taste? Let's put it to the _taste-test_:

```
var assert = require('assert');
var taste = require('taste-test');
var test = new taste.Test();

var taste_test = {
    "In good taste tests.": {
        "Gender non-binary beef.":
            function itWorks() {
                assert.equal("Good-taste", "Good-taste", "Not in good taste.");
                return true;  //NB: If execution reaches here, assert did not fail, therefor return true;
            },
        "Pictures on your gran": {
            "Pictures on your gran.":
                function () {
                    assert.equal("Good-taste", "Good-taste", "Not in good taste.");
                    return true;
                },
            "Pictures on your gran naked.":
                function () {
                    assert.equal("Good-taste", "Bad-taste", "Not in good taste.");
                    return true;
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
            "Pictures on your gran doing rodeo.":
                function () {
                    assert.equal("Bad-taste", "Good-taste", "Not in bad taste.");
                    return true;
                },
            "Pictures on your gran doing rodeo naked.":
                function () {
                    assert.equal("Bad-taste", "Bad-taste", "Not in bad taste.");
                    return true;
                }
        },
    }
}

test.describe(taste_test);
```

## Performance

Making your users wait is in bad taste. Test the performance of your functions with _taste_, and taste of true performance.

```
const taste = require('taste-test');

const test = new taste.Performance();
test.add("Send large images down the wire only to be displayed at 150x150.",  noRushFn.bind(null, 35));
test.add("Do whatever it is Upwork does with their mobile site.",  noRushFn.bind(null, 70));
test.add("Add hundreds of links to large script and css files you dont use.",  noRushFn.bind(null, 50));
test.add("Hire a cheap developer.",  noRushFn.bind(null, 70));
test.runAsynch(10);

var slower = 0;
function noRushFn(time, done) {
  let delay = (slower++ % 2 === 0) ? 1 : 4;
  setTimeout(()=> { done(); }, time * delay);
};
```
