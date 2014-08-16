var ArgumentHandler = function(){
  this.options = [];
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
  this.options.push(option);
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
  //TO_ DO --- if no option selected invoke default

  //else look through list of options and invoke the needed callbacks
  var i, j;
  if ( option[0].length === 1){
    for ( i = 0; i < this.options.length; i++ ){
      if (this.options[i].shortName === option[0]){
        for ( j = 0; j < this.options[i].callbacks.length; j++ ) {
          this.options[j].callbacks[j].call(null, option[1]);
        }
      }
    }
  } else {
    for ( i = 0; i < this.options.length; i++ ){
      if (this.options[i].fullName === option[0]){
        for ( j = 0; j < this.options[i].callbacks.length; j++ ) {
          this.options[j].callbacks[j].call(null, option[1]);
        }
      }
    }
  }
};

module.exports = ArgumentHandler;