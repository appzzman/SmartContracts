var solc = require('solc');
var contracts = require('./solcontract');
// var contracts = require('./simple');
var Web3 = require('web3');
var web3;

function loadWeb3(){

   if (typeof web3 !== 'undefined') {
       web3 = new Web3(web3.currentProvider);
       console.log("aaa");
   } else {

     // $("#error_text").text("Make sure your Metamask is enabled. For more details about MetaMask visit <a href='https://metamask.io/'></a>");
     // $("#error_message").show();
       // set the provider you want from Web3.providers
       web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
       console.log("bb");
   }
   var version = web3.version.api;
   console.log("API VErsion", version);
}

loadWeb3();

function compileContract(_symbol,_tname,_decimals,_supply){
 console.log(_symbol);
 console.log(_tname);
 console.log(_decimals);
 console.log(_supply);


var symbol = _symbol;
var tname = _tname;
var decimals = _decimals;
var supply = _supply;


var input = contracts.bigcontract(symbol,tname,supply,decimals);
// console.log("Contract",input);

var output = solc.compile(input, 1)
// console.log(output);
// console.log("Smart Contracts",output.contracts);
// console.log("DONE");
for (var contractName in output.contracts) {
  // console.log(contractName); //.inteface
  // console.log(output.contracts[contractName]["interface"]);
  var bytecode  = output.contracts[contractName]["bytecode"];
  var _interface  = JSON.parse(output.contracts[contractName]["interface"]);
  var myContract = new web3.eth.contract(_interface);



    // code and ABI that are needed by web3
    // console.log(contractName + ': ' + output.contracts[contractName].bytecode)
    // console.log(contractName + '; ' + JSON.parse(output.contracts[contractName].interface))
  // console.log("Contract",contractName);
   const c = myContract.new({data:"0x"+bytecode, from:web3.eth.coinbase, gas: 4700000}, (err,res)=>{
    if (err) {
      console.log("ERROR ", err);
      return;
    }

  // Log the tx, you can explore status with eth.getTransaction()
  console.log(res.transactionHash);

  // If we have an address property, the contract was deployed
  if (res.address) {
      console.log('Contract address: ' + res.address);
      // Let's test the deployed contract
      testContract(res.address);
    }
  })


  // myContract.deploy({data:"0x"+bytecode}).send({from: accounts[0], gas: 4700000})
  // .then((instance) => {
  //   console.log(`Address: ${instance.options.address}`);
  // })
  // .catch(console.log);


}


// if (output.contracts.length >1){
//   var bytecode  = output.contracts[0].bytecode;
//   var _inteface  = output.contracts[0].inteface;
//
//
//   //Deploy here
//   var myContract = new web3.eth.Contract(_inteface,{data:bytecode});

//
//
//
//   return [bytecode,_inteface];
//  }
}


module.exports.compileContract = compileContract;


require('make-runnable');
