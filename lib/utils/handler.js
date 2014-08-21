var colors = require('colors');
var generate = require('./generator');
var validate = require('./validator');
var find = require('./finder');
var get = require('./getter');
var inquirer = require('inquirer');
var helpers = require('./helpers');

//inquirer prompt question objects
var promptQuestions = {
  solve: {
    type: "confirm",
    name: "solveAnswer",
    message: "View answer to problem",
    default: false
    },
  solve_confirm: {
    type: "confirm",
    name: "solveAnswer",
    message: "Are you super sure?",
    default: false
    },
  generate_js: {
    type: "confirm",
    name: "generateProblem",
    message: "Generate js file for problem 2?",
    default: false
    },
  generate_js_overwrite: {
    type: "confirm",
    name: "generateProblem",
    message: "A js file for this problem already exists, are you sure you want to overwrite?",
    default: false
    },
  generate_coffee: {
    type: "confirm",
    name: "generateProblem",
    message: "Generate coffeescript file for problem ?",
    default: false
    },
  generate_coffee_overwrite: {
    type: "confirm",
    name: "generateProblem",
    message: "A coffeescript file for this problem already exists, are you sure you want to overwrite?",
    default: false
    },
};

colors.setTheme({
  correct: 'green',
  incorrect: 'red'
});

var printAllAnswers = function(answers){
  var keys = Object.keys(answers);
  keys.sort();
  if (keys.length > 0){
    console.log('\n');
    console.log('-------------------------------');      
  } else {
    console.log('No Project Euler files were found.');
    return;
  }
  keys.forEach(function(key){
    if (answers[key][0] === answers[key][1]) printOneAnswer(key, answers[key][0], true, answers[key][2]);
    else printOneAnswer(key, answers[key][0], false, answers[key][2]);
    console.log('-------------------------------');
  });
  console.log("\n");
};

var printOneAnswer = function(problem, answer, correct, time, separator){
  time = time.cyan + " run time";
  problem = "Problem " + problem;
  var output = problem + "\n";
  if (correct){
    output += answer.green + " is correct\n";
  } else {
    output += answer.red + " is incorrect\n";
  }
  output += time.cyan + " run time";
  if (separator) output = '\n-------------------------------\n' + output + '\n-------------------------------\n';
  console.log(output);
};

var printGeneration = function(problem, suffix, success){
  if (success){
    console.log("Successfully generated ", ("problem_"+ problem + "." + suffix).cyan);
  } else {
    console.log("Was unable to generate ", ("problem_"+ problem + "." + suffix).red);
  }
};

var handler = {};

//handler functions for cl options
handler.noFilesFailure = function(err){
  console.log("There are no Euler files contained in this directory :(".red);
};

//helper for determing the number to pass to helper
handler.problemNumberHandler = function(success, failure, problem, suffix, next){
  if (typeof problem === 'number'){
    num = helpers.numToStringWithPadding(problem);
    success(num, suffix);
  } else {
    find.highest(function(num){
      if (num === '000') num = '001';
      else if (next) num = helpers.numToStringWithPadding((+num)+1);
      success(num, suffix);
    }, function(err){
      failure(err, suffix);
    });
  }
};

//return solution to input problem
handler.solveHandler = function(problem){
  get.solution(function(sol){
    inquirer.prompt([promptQuestions.solve], function(answer){
      if (answer.solveAnswer === true){
        inquirer.prompt([promptQuestions.solve_confirm], function(answer){
          if (answer.solveAnswer === true ){
            console.log("The solution to problem " + problem, "is", sol.cyan);
          } else {
            console.log("A wise decision.".cyan);
          }
        });
      } else {
        console.log("A wise decision.".cyan);
      }
    });
  }, function(err){
    console.log("An answer to that problem doesn't exist :(".red);
  }, problem);
};

//generate cs or js file for given problem
handler.generateHandler = function(problem, suffix){
  var question, confirmation;
  if (suffix === 'js'){
    promptQuestions.generate_js.message = "Generate js file for problem " + problem + "?";
    question = [promptQuestions.generate_js]; 
    confirmation = [promptQuestions.generate_js_overwrite];
  } else {
    promptQuestions.generate_coffee.message = "Generate coffeescript file for problem " + problem + "?";
    question = [promptQuestions.generate_coffee]; 
    confirmation = [promptQuestions.generate_coffee_overwrite];
  }

  find.ifExists(function(){
    inquirer.prompt(confirmation, function(answer){
      if (answer.generateProblem){
        generate.file(function(prompt){
          printGeneration(problem, suffix, true);
        }, function(){
          printGeneration(problem, suffix, false);
        },
        suffix, problem);
      }
    });
  }, function(){
    inquirer.prompt(question, function(answer){
      if (answer.generateProblem){
        generate.file(function(prompt){
          printGeneration(problem, suffix, true);
        }, function(){
          printGeneration(problem, suffix, false);
        },
        suffix, problem);
      }
    });
  }, suffix, problem);
};

//generate preview for input problem
handler.previewHandler = function(problem){
  generate.preview(function(prompt){
    console.log("\n", prompt, "\n");
  }, function(err){
  }, problem);
};

//verify solution to single problem
handler.verifyHandler = function(problem, suffix){
  validate.one(function(answer, solution, num, time){
    if (answer === solution){printOneAnswer(num, answer, true, time, true);}
    else printOneAnswer(num, answer, false, time, true);
  }, function(){
    console.log('inside error callback of verify');
  }, suffix, problem);
};
//validate.all = function(success, failure, suffix) 
//    this.one(success, failure, suffix, number);
handler.verifyAllHandler = function(problem, suffix){
  validate.all(function(answers){
    printAllAnswers(answers);
  }, function(){

  }, suffix);
};

module.exports = handler;
