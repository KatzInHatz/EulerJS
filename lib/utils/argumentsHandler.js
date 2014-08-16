var ArgumentHandler = function(){
  this.options = {};
};

ArgumentHandler.prototype.addOption = function(full_name, short_name, takes_arg, name, help_string, callbacks){
  //add conditional logic to ensure required args are being passed
  var option = {
    fullName: full_name,
    shortName: short_name,
    takes_arg: takes_arg,
    name: name,
    help_string: help_string || "",
    callbacks: callbacks || []
  };
  this.options[full_name] = option;
  this.options[short_name] = option;
  return this;
};

ArgumentHandler.prototype.addDefault = function(){};
ArgumentHandler.prototype.addCallback = function(name, callbacks){};
ArgumentHandler.prototype.printHelp = function(){};
ArgumentHandler.prototype._selectOption = function(argv){
  var keys = Object.keys(argv);
  if (keys[0] === '_'){
    return [keys[1], argv[keys[1]]];
  } 
    return [keys[0], argv[keys[0]]];

};

ArgumentHandler.prototype.invoke = function(argv){
  var args = argv._;
  var option = this._selectOption(argv);
  var cbs;
  if (this.options[option[0]]){
    cbs = this.options[option[0]].callbacks;
    for ( var i = 0; i < cbs.length; i++ ){
      cbs[i](option[1]);
    }
  } else {
    //TO_ DO --- if no option selected invoke default
  }
};

module.exports = ArgumentHandler;