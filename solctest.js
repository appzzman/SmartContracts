var solc = require('solc');
var contracts = require('./solcontract');

function compileContract(_symbol,_tname,_decimals,_supply){
// console.log(symbol);
// console.log(decimals);
// console.log(name);
var symbol = _symbol;
var tname = _tname;
var decimals = 18;
var supply = _supply;

//
var input = contracts.bigcontract;


var output = solc.compile(input, 1)
console.log(output.contracts);
console.log("DONE");
if (output.contracts.length >1){
  var bytecode  = output.contracts[0].bytecode;
  var _inteface  = output.contracts[0].inteface;
  return [bytecode,_inteface];
}
}
module.exports.compileContract = compileContract;


require('make-runnable');
