// var argv = require('minimist')(process.argv.slice(2));
// var ArgumentHandler = require('./utils/argumentsHandler');
var program = require('commander');
var generate = require('./utils/generator');
var validate = require('./utils/validator');
var find = require('./utils/finder');

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

// if ( program.solve || program.solve === 0){
//   if (typeof program.solve === 'number') generate.cheat(program.solve);
//   else generate.cheat();
// }

// if ( program.generate || program.generate === 0){
//   if ( program.coffee || program.coffee === 0){
//     //generate coffee file
//     if ( typeof program.coffee   === 'number') generate.file('coffee', program.coffee);
//     else if ( typeof program.generate === 'number') generate.file('coffee', program.generate);
//     else generate.file('coffee');

//   } else {
//     //generate js file
//     typeof program.generate === 'number' ? generate.file('js', program.generate) : generate.file('js');
//   }
// }

// if ( program.preview || program.preview === 0){
//   if (typeof program.preview === 'number') generate.preview(program.preview);
//   else generate.preview();
// }

// if ( program.verify || program.verify === 0){
//   if (typeof program.verify === 'number') generate.verify(program.verify);
//   else generate.verify();
// }

// generate.file('coffee');
// generate.file('js');
generate.file(function(prompt, number) {
  console.log('success');
}, function(path) {
  console.log('failed to read', path);
}, '226', 'coffee');
// find.numberAnd(validate.answer, '001');
// find.numberAnd(validate.solution, '001');
// validate.solution('010');
// validate.answer('003');
// find.highestAnd(validate.answer);