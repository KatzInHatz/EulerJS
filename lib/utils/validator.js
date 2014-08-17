var fs = require('fs');

module.exports = function(number) {
  fs.readFile(__dirname + '/../data/solutions.txt', 'utf8', function(poo, data) {
    if (poo) throw poo;

    var problem = '' + eval(fs.readFileSync('euler_' + number + '.js', 'utf8'));
    var solutions = data.split('\n');
    var solution = solutions[+number - 1].split('. ');

    console.log('Checking \'euler_' + number + '.js\' against prompt ' + solution[0], solution[1] === problem);
  });
};
