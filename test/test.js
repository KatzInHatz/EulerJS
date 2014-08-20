var should = require('should');
var fs = require('fs');
var generate = require('../lib/utils/generator');
var validate = require('../lib/utils/validator');
var find = require('../lib/utils/finder');
var get = require('../lib/utils/getter');

describe('Generator', function(){

  beforeEach(function() {
    // create a test directory and cd into it
    fs.mkdirSync('./euler_test');
    process.chdir('./euler_test');
  });

  afterEach(function() {
    var i;

    // delete all files in the test directory
    files = fs.readdirSync('.');
    for (i = 0; i < files.length; i++) {
      fs.unlinkSync(files[i]);
    }

    // cd to .. and delete the test directory
    process.chdir('..');
    fs.rmdirSync('./euler_test');
  });

  describe('* generate preview', function(){

    it('should generate preview for a prompt that exists', function(){
      var answer, solution;

      solution = 
        'Problem 1\n' +
        '=========\n' +
        '\n' +
        'If we list all the natural numbers below 10 that are multiples of 3 or 5,\n' +
        'we get 3, 5, 6 and 9. The sum of these multiples is 23.\n' +
        '\n' +
        'Find the sum of all the multiples of 3 or 5 below 1000.';

      generate.preview(function(prompt) {
        answer = prompt;
      }, function() {
        answer = '';
      }, '001');

      answer.should.equal(solution);
    });

    it('should call failure callback on request for prompt below lowest number', function(){
      var test;
      test = true;

      generate.preview(function(prompt) {
        test = test && false;
      }, function() {
        test = test && true;
      }, '000');

      test.should.be.true;
    });

    it('should call failure callback on request for prompt above maximum number', function(){
      var test;
      test = true;

      generate.preview(function(prompt) {
        console.log(prompt);
        test = test && false;
      }, function() {
        test = test && true;
      }, '405');

      test.should.be.true;
    });

  });

  describe('* generate file', function(){

    it('should generate a js style template for a prompt that exists', function(){
      var answer, solution;

      solution = 
        '// Problem 1\n' +
        '// =========\n' +
        '// \n' +
        '// If we list all the natural numbers below 10 that are multiples of 3 or 5,\n' +
        '// we get 3, 5, 6 and 9. The sum of these multiples is 23.\n' +
        '// \n' +
        '// Find the sum of all the multiples of 3 or 5 below 1000.\n\n\n\n' +
        '// TODO: return your answer for this prompt.\n' +
        'return /* solution */;\n';

      generate.file(function(prompt) {
        answer = prompt;
      }, function() {
        answer = '';
      }, 'js', '001');

      answer.should.equal(solution);
    });

    it('should generate a coffeescript style template for a prompt that exists', function(){
      var answer, solution;

      solution = 
        '# Problem 1\n' +
        '# =========\n' +
        '# \n' +
        '# If we list all the natural numbers below 10 that are multiples of 3 or 5,\n' +
        '# we get 3, 5, 6 and 9. The sum of these multiples is 23.\n' +
        '# \n' +
        '# Find the sum of all the multiples of 3 or 5 below 1000.\n\n\n\n' +
        '# TODO: return your answer for this prompt.\n' +
        'return # solution\n';

      generate.file(function(prompt) {
        answer = prompt;
      }, function() {
        answer = '';
      }, 'coffee', '001');

      answer.should.equal(solution);
    });

    it('should call failure callback on request to generate prompt numbered below minimum', function(){
      var test, solution;
      test = true;

      generate.file(function(prompt) {
        test = test && false;
      }, function() {
        test = test && true;
      }, 'coffee', '000');

      test.should.be.true;
    });
  
    it('should call failure callback on request to generate prompt numbered above maximum', function(){
      var test, solution;
      test = true;

      generate.file(function(prompt) {
        test = test && false;
      }, function() {
        test = test && true;
      }, 'coffee', '405');

      test.should.be.true;
    });

  });

});

describe('Validator', function(){

  afterEach(function() {
    var i;

    // delete all files in the test directory
    files = fs.readdirSync('.');
    for (i = 0; i < files.length; i++) {
      fs.unlinkSync(files[i]);
    }

    // cd to .. and delete the test directory
    process.chdir('..');
    fs.rmdirSync('./euler_test');
  });

  describe('* validate one', function(){

    beforeEach(function() {
      var padding, i;
      // create a test directory and cd into it
      fs.mkdirSync('./euler_test');
      process.chdir('./euler_test');
  
      // generate test files
      padding = '000';
      var nothing = function() {};
      
      generate.file(nothing, nothing, 'js', '001');
      generate.file(nothing, nothing, 'coffee', '001');
    });

    it('should validate a javascript answer against its solution', function() {
      var test;
      test = true;

      validate.one(function(answer, solution, number, time) {
        console.log('execution time:', time);
        test = test &&
               (answer === 'undefined') && 
               (solution === '233168') && 
               (number === '001');
      }, function() {
        test = test && false;
      }, 'js', '001');

      test.should.be.true;
    });

    it('should validate a coffeescript answer against its solution', function() {
      var test;
      test = true;

      validate.one(function(answer, solution, number) {
        test = test &&
               (answer === 'undefined') && 
               (solution === '233168') && 
               (number === '001');
      }, function() {
        test = test && false;
      }, 'coffee', '001');

      test.should.be.true;
    });

    it('should call failure callback if solution does not exist', function() {
      var test;
      test = true;

      validate.one(function(answer, solution, number) {
        test = test && false;
      }, function() {
        test = test && true;
      }, 'coffee', '405');

      test.should.be.true;
    });

    it('should call failure callback if file does not exist', function() {
      var test;
      test = true;

      fs.unlinkSync('euler_001.coffee');

      validate.one(function(answer, solution, number) {
        test = test && false;
      }, function() {
        test = test && true;
      }, 'coffee', '001');

      test.should.be.true;
    });

  });

  describe('* validate all', function(){

    beforeEach(function() {
      var padding, i;
      // create a test directory and cd into it
      fs.mkdirSync('./euler_test');
      process.chdir('./euler_test');
  
      // generate test files
      padding = '000';
      var nothing = function() {};
      
      this.timeout(0);
      for (i = 1; i <= 266; i++) {
        generate.file(nothing, nothing, 'js', (padding + i).slice(-padding.length));
        generate.file(nothing, nothing, 'coffee', (padding + i).slice(-padding.length));
      }
    });

    it('should validate all javascript answers against their solution', function() {
      validate.all(function(answers) {
        var i, test;

        test = true;
        padding = '000';

        for (i = 0; i < answers.length; i++) {
          test = test && (answers[(padding + i).slice(-padding.length)][0] === 'undefined');
          get.solution(function(solution) {
            test = test && (answers[(padding + i).slice(-padding.length)][1] === solution);
          }, function() {}, (padding + i).slice(-padding.length));
        }
      }, function() {
        test = test && false;
      }, 'js');
    });

    it('should validate all coffeescript answers against their solution', function() {
      validate.all(function(answers) {
        var i, test;

        test = true;
        padding = '000';

        for (i = 0; i < answers.length; i++) {
          test = test && (answers[(padding + i).slice(-padding.length)][0] === 'undefined');
          get.solution(function(solution) {
            test = test && (answers[(padding + i).slice(-padding.length)][1] === solution);
          }, function() {}, (padding + i).slice(-padding.length));
        }
      }, function() {
        test = test && false;
      }, 'coffee');
    });

    it('should validate all answers against their solution', function() {
      validate.all(function(answers) {
        var i, test;

        test = true;
        padding = '000';

        for (i = 0; i < answers.length; i++) {
          test = test && (answers[(padding + i).slice(-padding.length)][0] === 'undefined');
          get.solution(function(solution) {
            test = test && (answers[(padding + i).slice(-padding.length)][1] === solution);
          }, function() {}, (padding + i).slice(-padding.length));
        }
      }, function() {
        test = test && false;
      });
    });

  });

});

describe('Finder', function() {

  afterEach(function() {
    var i;

    // delete all files in the test directory
    files = fs.readdirSync('.');
    for (i = 0; i < files.length; i++) {
      fs.unlinkSync(files[i]);
    }

    // cd to .. and delete the test directory
    process.chdir('..');
    fs.rmdirSync('./euler_test');
  });

  describe('* find highest', function(){

    beforeEach(function() {
      var padding, i;
      // create a test directory and cd into it
      fs.mkdirSync('./euler_test');
      process.chdir('./euler_test');
    
      // generate test files
      padding = '000';
      var nothing = function() {};
      
      generate.file(nothing, nothing, 'js', '115');
      generate.file(nothing, nothing, 'coffee', '266');
    });

    it('should find highest solution file number', function() {
      var test;

      find.highest(function(number) {
        test = number;
      }, function() {
        test = test + 'failure';
      });

      test.should.equal('266');
    });

    it('should find highest coffeescript solution file number', function() {
      var test;

      find.highest(function(number) {
        test = number;
      }, function() {
        test = test + 'failure';
      }, 'coffee');

      test.should.equal('266');
    });

    it('should find highest javascript solution file number', function() {
      var test;

      find.highest(function(number) {
        test = number;
      }, function() {
        test = test + 'failure';
      }, 'js');

      test.should.equal('115');
    });

    it('should return 000 if no solution files exist', function() {
      var i, test;
  
      // delete all files in the test directory
      files = fs.readdirSync('.');
      for (i = 0; i < files.length; i++) {
        fs.unlinkSync(files[i]);
      }

      find.highest(function(number) {
        test = number;
      }, function() {
        test = test + 'failure';
      });

      test.should.equal('000');
    });

  });

  describe('* find all', function(){

    beforeEach(function() {
      var padding, i;
      // create a test directory and cd into it
      fs.mkdirSync('./euler_test');
      process.chdir('./euler_test');
  
      // generate test files
      padding = '000';
      var nothing = function() {};
      
      this.timeout(0);
      for (i = 1; i <= 266; i++) {
        generate.file(nothing, nothing, 'js', (padding + i).slice(-padding.length));
        generate.file(nothing, nothing, 'coffee', (padding + i).slice(-padding.length));
      }
    });

    it('should return an array of all javascript solution files', function(){
      var list;
      list = find.all('js');
      list.length.should.equal(266);
    });

    it('should return an array of all coffeescript solution files', function(){
      var list;
      list = find.all('coffee');
      list.length.should.equal(266);
    });

    it('should return an array of all solution files', function(){
      var list;
      list = find.all();
      list.length.should.equal(266*2);
    });

    it('should return an array of all solution files for a given number', function(){
      var list;
      list = find.all(undefined, '001');
      list.length.should.equal(2);
    });

    it('should return an array containing only a specified javascript file', function(){
      var list;
      list = find.all('js', '001');
      list[0].should.equal('euler_001.js');
    });

    it('should return an array containing only a specified coffeescript file', function(){
      var list;
      list = find.all('coffee', '001');
      list[0].should.equal('euler_001.coffee');
    });

    it('should return an empty array if no solution files exist', function() {
      var i, list;
  
      // delete all files in the test directory
      files = fs.readdirSync('.');
      for (i = 0; i < files.length; i++) {
        fs.unlinkSync(files[i]);
      }

      list = find.all();
      list.length.should.equal(0);
    });

  });
});

describe('Getter', function(){

  describe('* get solution', function(){

    it('should return the solution for a given prompt', function(){
      var answer;

      get.solution(function(solution) {
        answer = solution;
      }, function() {
        answer = null;
      }, '010');

      answer.should.equal('142913828922');
    });

    it('should call failure callback as the solution for a file that is numbered below the minimum', function(){
      var test;

      get.solution(function(solution) {
        test = false;
      }, function() {
        test = true;
      }, '000');

      test.should.be.true;
    });

    it('should call failure callback as the solution for a file that is numbered above the maximum', function(){
      var test;

      get.solution(function(solution) {
        test = false;
      }, function() {
        test = true;
      }, '405');

      test.should.be.true;
    });

  });

  describe('* get answer', function(){

    it('should evaluate coffeescript functions', function() {
      var script, answer;

      script = 'script = ->\n' +
                 '\t100\n' +
               '\n' +
               'return do script';

      answer = get.answer(script, 'coffee');

      answer[0].should.equal('100');
    });

    it('should evaluate javascript functions', function() {
      var script, answer;

      script = 'var script = function() {\n' + 
                  '\treturn 100;\n' + 
                '};\n' +
                'return script();';

      answer = get.answer(script, 'js');

      answer[0].should.equal('100');
    });

  });

});

