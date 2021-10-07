var taste = require('taste');

var Performance = taste.Performance;


var slower = 0;
function delayedFn (time, done){
  var delay = (slower++ % 2 === 0)? 1 : 4;
    setTimeout(function () {
        done();
    },
    time * delay);
};

var test =  new Performance();
test.add("one",  delayedFn.bind(null, 60));
test.add("two",  delayedFn.bind(null, 59));
test.add("three",  delayedFn.bind(null, 58));
test.runAsynch(10);
// test.runSynch(10);
