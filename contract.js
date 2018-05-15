
var web3;
var Person;
var contractAddress = "0x0a2b0224e39c99cb0c8f4b3122142d90dfa26118";

function loadWeb3(){

   if (typeof web3 !== 'undefined') {
       web3 = new Web3(web3.currentProvider);
       console.log("aaa");
   } else {

     $("#error_text").text("Make sure your Metamask is enabled. For more details about MetaMask visit <a href='https://metamask.io/'></a>");
     $("#error_message").show();
       // set the provider you want from Web3.providers
       web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
       console.log("bb");
   }

   web3.version.getNetwork((err, netId) => {
switch (netId) {
case "1":
  console.log('This is mainnet')
  break
case "2":
  console.log('This is the deprecated Morden test network.')
  break
case "3":
  console.log('This is the ropsten test network.')
  break
case "4":
  console.log('This is the Rinkeby test network.')
  break
case "42":
  console.log('This is the Kovan test network.')
  break
default:
  console.log('This is an unknown network.')
}
})


    web3.eth.defaultAccount = web3.eth.accounts[0];
    // console.log(web3.eth.defaultAccount);
    // web3.eth.getBalance(web3.eth.defaultAccount).then(function(res,err){
    //   console.log(res,err);
    // })



    var PersonContract = web3.eth.contract([
{
"constant": false,
"inputs": [],
"name": "kill",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"anonymous": false,
"inputs": [
  {
    "indexed": false,
    "name": "message",
    "type": "string"
  },
  {
    "indexed": false,
    "name": "value",
    "type": "uint256"
  }
],
"name": "Log",
"type": "event"
},
{
"constant": false,
"inputs": [
  {
    "name": "_title",
    "type": "string"
  },
  {
    "name": "_fName",
    "type": "string"
  },
  {
    "name": "_lName",
    "type": "string"
  }
],
"name": "setPerson",
"outputs": [],
"payable": true,
"stateMutability": "payable",
"type": "function"
},
{
"payable": true,
"stateMutability": "payable",
"type": "fallback"
},
{
"inputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "constructor"
},
{
"constant": true,
"inputs": [],
"name": "getHighestBidderPerson",
"outputs": [
  {
    "name": "",
    "type": "string"
  },
  {
    "name": "",
    "type": "string"
  },
  {
    "name": "",
    "type": "string"
  },
  {
    "name": "",
    "type": "uint256"
  }
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "getLastBidderPerson",
"outputs": [
  {
    "name": "",
    "type": "string"
  },
  {
    "name": "",
    "type": "string"
  },
  {
    "name": "",
    "type": "string"
  },
  {
    "name": "",
    "type": "uint256"
  }
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "owner",
"outputs": [
  {
    "name": "",
    "type": "address"
  }
],
"payable": false,
"stateMutability": "view",
"type": "function"
}
]);

Person = PersonContract.at(contractAddress);
  // console.log(Person);
}
