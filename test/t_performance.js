const taste = require('taste-test');

const test = new taste.Performance();
test.add("Send large images down the wire only to be displayed at 150x150.", noRushFn.bind(null, 35));
test.add("Do whatever it is Upwork does with their mobile site.", noRushFn.bind(null, 70));
test.add("Add hundreds of links to large script and css files you dont use.", noRushFn.bind(null, 50));
test.add("Hire a cheap developer.", noRushFn.bind(null, 70));
test.runAsynch(10);

var slower = 0;
function noRushFn(time, done) {
  let delay = (slower++ % 2 === 0) ? 1 : 4;
  setTimeout(() => { done(); }, time * delay);
};