var numToStringWithPadding = function(num){
  var padding = '000';
  num = padding + num;
  num = num.slice(-padding.length);
  return num;
};

function wordWrap( str, width, brk, cut ) {
    brk = brk || '\n';
    width = width || 75;
    cut = cut || false;
    if (!str) { return str; }
    var regex = '.{1,' +width+ '}(\\s|$)' + (cut ? '|.{' +width+ '}|.+$' : '|\\S+?(\\s|$)');
    return str.match( RegExp(regex, 'g') ).join( brk );
 
}

module.exports.numToStringWithPadding = numToStringWithPadding;
module.exports.wordWrap = wordWrap;