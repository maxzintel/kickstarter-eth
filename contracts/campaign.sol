pragma solidity ^0.4.17;

contract Campaign {
  address public manager;
  address[] public approvers;

  modifier restricted() {
    require(msg.sender == manager);
    _;
  }

   constructor() public {
    manager = msg.sender;
  }
}