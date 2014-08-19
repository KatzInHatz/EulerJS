var should = require('should');
var generate = require('../lib/utils/generator');
var validate = require('../lib/utils/validator');
var find = require('../lib/utils/finder');
var get = require('../lib/utils/getter');

// generate.file(function(prompt) {
//   console.log('success');
// }, function() {
//   console.log('failure');
// }, 'coffee', '226');

describe('Generator', function(){
  describe('* generate preview', function(){

    it('should generate preview for prompt 001', function(){
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

    it('should call failure callback as the prompt for 000', function(){
      var test;

      generate.preview(function(prompt) {
        console.log(prompt);
        test = false;
      }, function() {
        test = true;
      }, '000');

      test.should.be.true;
    });

    it('should call failure callback as the prompt for 405', function(){
      var test;

      generate.preview(function(prompt) {
        console.log(prompt);
        test = false;
      }, function() {
        test = true;
      }, '405');

      test.should.be.true;
    });

  });

  describe('* generate file', function(){

    it('should generate a js style template for prompt 001', function(){
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
        'return solution;\n';

      generate.file(function(prompt) {
        answer = prompt;
      }, function() {
        answer = '';
      }, 'js', '001');

      answer.should.equal(solution);
    });

  it('should generate a coffeescript style template for prompt 001', function(){
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
        'return solution\n';

      generate.file(function(prompt) {
        answer = prompt;
      }, function() {
        answer = '';
      }, 'coffee', '001');

      answer.should.equal(solution);
    });
  });

});

describe('Getter', function(){
  describe('* get solution', function(){

    it('should return \'142913828922\' as the solution for prompt 010', function(){
      var answer;

      get.solution(function(solution) {
        answer = solution;
      }, function() {
        answer = null;
      }, '010');

      answer.should.equal('142913828922');
    });

    it('should call failure callback as the solution for prompt 000', function(){
      var test;

      get.solution(function(solution) {
        test = false;
      }, function() {
        test = true;
      }, '000');

      test.should.be.true;
    });

    it('should call failure callback as the solution for prompt 405', function(){
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

      script = 'script = ->\n\t100\n\nreturn do script';
      answer = get.answer(script, 'coffee');

      answer.should.equal('100');
    });

    it('should evaluate javascript functions', function() {
      var script, answer;

      script = 'return 100';
      answer = get.answer(script, 'coffee');

      answer.should.equal('100');
    });

  });

});

