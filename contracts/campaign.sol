// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

contract Campaign {

  //  struct definition to create a new 'type' like string, address, etc.
  struct Request {
    string description; // describes why the request is being created
    uint value; // amt of money that the manager wants to send to the vendor
    address recipient; // address of the vendor that would receive the money
    bool complete; // true if the request has been processed and money has been spent
    uint approvalCount; // the number of 'yes' votes on the request
    mapping(address => bool) approvals; // map which addresses have voted such that they cannot re-vote.
  }

  // Held in contracts STORAGE.
  Request[] public requests; // Create array of Request type. Behaves just like normal array.
  address public manager;
  uint public minContribution;
  mapping(address => bool) public approvers;
  //       key    => val
  
  // How modifiers work is essentially, each function that has this on it will be
  // pasted below the logic we put in.
  modifier restrictManager() {
    require(msg.sender == manager);
    _; // where we want the virtual pasting to occur.
  }

  modifier restrictApprover() {
    require(approvers[msg.sender]);
    _;
  }
  
  // args here are stored in MEMORY.
  constructor(uint minimum) {
    manager = msg.sender;
    minContribution = minimum; // allow manager to set this on the fly.
  }

  function contribute() public payable {
    require(msg.value > minContribution);

    approvers[msg.sender] = true; // maps the address of the sender to the boolean true!
    // Remember the key is not actually stored, its just used to look up the value.
  }

  // create instance of struct Request
  // manager must provide description, value, and recipient.
  function createRequest(string memory description, uint value, address recipient) 
  public restrictManager 
  {

    Request storage newRequest = requests.push(); // push this new Request to the array of requests.
    newRequest.description = description;
    newRequest.value = value;
    newRequest.recipient = recipient;
    newRequest.complete = false;
    newRequest.approvalCount = 0;
  }

  // for now, each contributor can only vote once.
  function approveRequest(uint index) public restrictApprover {
    Request storage request = requests[index];

    require(!request.approvals[msg.sender]); // if this person has already voted on this contract, kick them out of the function call.

    request.approvals[msg.sender] = true; // set this user as having voted.
    request.approvalCount++; // increase approval count by 1.
  }
}