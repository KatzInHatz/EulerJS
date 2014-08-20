var numToStringWithPadding = function(num){
  var padding = '000';
  num = padding + num;
  num = num.slice(-padding.length);
  return num;
};

module.exports.numToStringWithPadding = numToStringWithPadding;
