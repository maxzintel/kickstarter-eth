pragma solidity ^0.4.17;

contract Campaign {
  address public manager;
  address[] public approvers;
  uint public minContribution;

  modifier restrictManager() {
    require(msg.sender == manager);
    _;
  }

  modifier restrictApprover() {
    //require msg.sender to be in the array of approvers.
    _;
  }

   constructor(uint minimum) public {
    manager = msg.sender;
    minContribution = minimum; // allow manager to set this on the fly.
  }

  function contribute() public payable {
    require(msg.value > minContribution);
    
    approvers.push(msg.sender); // This needs logic to discern if someone has already been added to the list.
  }

  function createRequest() public restrictManager {

  }

  function approveRequest() public restrictApprover {

  }

  function finalizeRequest() public restrictManager {

  }
}