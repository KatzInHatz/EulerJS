// var argv = require('minimist')(process.argv.slice(2));
// var ArgumentHandler = require('./utils/argumentsHandler');
var program = require('commander');
var colors = require('colors');
var generate = require('./utils/generator');
var validate = require('./utils/validator');
var find = require('./utils/finder');
var get = require('./utils/getter');

// TODO: change -c to handle coffeescript. we can change cheat to
// solution. --skip can become --next and we'd be good.
program
  .version('0.0.1')
  .option('-s, --solve    [value]', 'Print solution', parseInt)
  .option('-g, --generate [value]', 'Generate file with problem prompt', parseInt)
  .option('-c, --coffee   [value]', 'Generate coffeescript file with problem prompt', parseInt)
  .option('-p, --preview  [value]', 'Preview problem prompt', parseInt)
  .option('-v, --verify   [value]', 'Verify solution to problem', parseInt)
  .option('-n, --next',             'Skip to the next problem')
  .parse(process.argv);

colors.setTheme({
  correct: 'green',
  incorrect: 'red'
});

if ( program.solve || program.solve === 0){
  if (typeof program.solve === 'number') generate.cheat(program.solve);
  else generate.cheat();
}

if ( program.generate || program.generate === 0){
  if ( program.coffee || program.coffee === 0){
    //generate coffee file
    if ( typeof program.coffee   === 'number') generate.file('coffee', program.coffee);
    else if ( typeof program.generate === 'number') generate.file('coffee', program.generate);
    else generate.file('coffee');

  } else {
    //generate js file
    typeof program.generate === 'number' ? generate.file('js', program.generate) : generate.file('js');
  }
}

if ( program.preview || program.preview === 0){
  if (typeof program.preview === 'number') generate.preview(program.preview);
  else generate.preview();
}

if ( program.verify || program.verify === 0){
  if (typeof program.verify === 'number') generate.verify(program.verify);
  else generate.verify();
}

// // find.highest test
// find.highest(function(number) {
//   console.log('current highest problem is', number);
// }, function() {
//   console.log('failure');
// });

// // generate.file test
// generate.file(function(prompt) {
//   console.log('success');
// }, function() {
//   console.log('failure');
// }, 'coffee', '226');

// generate.file(function(prompt) {
//   console.log('success');
// }, function() {
//   console.log('failure');
// }, 'js', '010');

// // find.ifExists test
// find.ifExists(function() {
//   console.log('exists');
// }, function() {
//   console.log('doesn\'t exist');
// }, 'js', '010');

// find.ifExists(function() {
//   console.log('exists');
// }, function() {
//   console.log('doesn\'t exist');
// }, 'js', '000');

// // find.highest test
// find.highest(function(number) {
//   console.log('current highest problem is', number);
// }, function() {
//   console.log('failure');
// });

// // get solution
// get.solution(function(solution) {
//   console.log(solution);
// }, function() {
//   console.log('failure');
// }, '010');

// // validate.one test
// validate.one(function(answer, solution) {
//   if (answer === solution) {
//     console.log(('Congratulations, the answer you gave to problem ' +
//                 (+number) + ' is correct.').correct);
//   } else {
//     console.log('Sorry, but the answer you gave appears to be incorrect.'
//                 .incorrect);
//   }
// }, function() {
//   console.log('failure');
// }, 'js', '010');

// // validate.all test
// validate.all(function(answer, solution, number) {
//   if (answer === solution) {
//     console.log(('Congratulations, the answer you gave to problem ' +
//                 (+number) + ' is correct.').correct);
//   } else {
//     console.log('Sorry, but the answer you gave appears to be incorrect.'
//                 .incorrect);
//   }
// }, function() {
//   console.log('failure');
// });
