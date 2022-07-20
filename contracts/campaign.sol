pragma solidity ^0.4.17;

contract Campaign {

  //  struct definition to create a new 'type' like string, address, etc.
  struct Request {
    string description; // describes why the request is being created
    uint value; // amt of money that the manager wants to send to the vendor
    address recipient; // address of the vendor that would receive the money
    bool complete; // true if the request has been processed and money has been spent
  }

  Request[] public requests; // Create array of Request type. Behaves just like normal array.
  address public manager;
  uint public minContribution;
  address[] public approvers;
  
  // How modifiers work is essentially, each function that has this on it will be
  // pasted below the logic we put in.
  modifier restrictManager() {
    require(msg.sender == manager);
    _; // where we want the virtual pasting to occur.
  }

   constructor(uint minimum) public {
    manager = msg.sender;
    minContribution = minimum; // allow manager to set this on the fly.
  }

  function contribute() public payable {
    require(msg.value > minContribution);

    approvers.push(msg.sender); // This needs logic to discern if someone has already been added to the list.
  }

  // create instance of struct Request
  // manager must provide description, value, and recipient.
  function createRequest(string description, uint value, address recipient) 
  public restrictManager 
  {
    // Request = Prep to create a new variable that will contain a 'Request'/will be of type 'Request
    // newRequest = The name of the instance of type Request
    // Request({}) = the instance of Request
    Request newRequest = Request({
      description: description,
      value: value,
      recipient: recipient,
      complete: false
    });

    requests.push(newRequest); // Push this new request to the requests array.
  }
}