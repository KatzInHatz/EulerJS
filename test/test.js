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

// generate.file(function(prompt) {
//   console.log('success');
// }, function() {
//   console.log('failure');
// }, 'js', '010');

// describe('Generator', function(){
//   describe('#generate.file coffee', function(){
//     it('should return -1 when the value is not present', function(){
//       [1,2,3].indexOf(5).should.equal(-1);
//       [1,2,3].indexOf(0).should.equal(-1);
//     });
//   });
// });

describe('Generator', function(){
  describe('* get solution', function(){

    it('should return \'142913828922\' as the solution for prompt 010', function(){
      get.solution(function(solution) {
        solution.should.equal('142913828922');
      }, function() {
        console.log('failure');
      }, '010');
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

      (answer).should.equal('100');
    });

    it('should evaluate javascript functions', function() {
      var script, answer;

      script = 'return 100';
      answer = get.answer(script, 'coffee');

      (answer).should.equal('100');
    });

  });

});

describe('Getter', function(){
  describe('* get solution', function(){

    it('should return \'142913828922\' as the solution for prompt 010', function(){
      get.solution(function(solution) {
        solution.should.equal('142913828922');
      }, function() {
        console.log('failure');
      }, '010');
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

      (answer).should.equal('100');
    });

    it('should evaluate javascript functions', function() {
      var script, answer;

      script = 'return 100';
      answer = get.answer(script, 'coffee');

      (answer).should.equal('100');
    });

  });

});

