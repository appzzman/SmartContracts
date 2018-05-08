pragma solidity ^0.4.18;
/*
author:Janusz Chudzynski
email:janusz@izotx.com
version 1.5
*/

contract AdvPerson {

struct PersonData{
   string fName;
   string lName;
   string title;
   uint256 bid;
}

   address public owner;
   uint256 private highestBid;

   PersonData private lastPerson;
   PersonData private highestBidder;

   event Log(string message,uint256 value);

   constructor() public{
       owner = msg.sender;
       highestBid = 0;
   }

   function setPerson(string _title, string _fName, string _lName) public payable{
       owner.transfer(msg.value);

       lastPerson.title = _title;
       lastPerson.fName = _fName;
       lastPerson.lName = _lName;
       uint256 val = msg.value;
       lastPerson.bid = val;

       checkBidder(val);
       emit Log("Person Set", val);
   }


   function getHighestBidderPerson() public constant returns (string, string, string,uint256) {
        // PersonData _person = highestBidder;
        //  return (_person.title, _person.fName, _person.lName, _person.bid);
         return (highestBidder.title, highestBidder.fName, highestBidder.lName, highestBidder.bid);
   }

  function getLastBidderPerson() public constant returns (string, string, string,uint256) {
        // PersonData _person = lastPerson;
         return (lastPerson.title, lastPerson.fName, lastPerson.lName, lastPerson.bid);
   }

   function kill() public {
     if(msg.sender == owner) selfdestruct(owner);
  }

   //Fallback function
   function() public payable {
    /*
        If a contract receives Ether (without a function being called), the fallback function is executed.
        ... During the execution of the fallback function, the contract can only rely on the “gas stipend”
        (2300 gas) being available to it at that time.
        This stipend is not enough to access storage in any way.
    */
   }

   function checkBidder(uint256 _value) private
   {
      emit Log("Check Value", _value);
      if(_value > highestBid){
        highestBid =_value;
        highestBidder = lastPerson;
      }
   }
}
