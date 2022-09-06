# Kickstarter but on Ethereum

## Campaign Contract

### Variables

* manager - `address` - Address of the person who is managing the campaign.
* minimumContribution - `uint` - Min donation required to be considered a contributor.
* approvers - `address[]` - List of addresses for every person who has donated.
  * Will change a bit over time.
* requests - `Request[]` - List of requests that the manager has created.
_
* Factory.deployedCampaigns - `address[]` - Addresses of all deployed campaigns.

### Functions

* Campaign - Constructor fnc that sets the minimumContribution and the owner.
* contribute - Called when someone wants to donate money to the campaign and become an approver/contributor.
* createRequest - Called by the manager to create a spending request.
* approveRequest - called by each contributor to approve a request.
  * Will change a bit over time.
* finalizeRequest - After enough approvals are received, the manager can call this to get money sent to the vendor.
_
* Factory.createCampaign - Deploys a new instance of a Campaign and stores the resulting address.
* Factory.getDeployedCampaigns - Returns a list of all deployed campaigns.

### Compile

In sequential order this script...

* Deletes the contents of the build folder.
* Reads factory.sol and campaign.sol from the contracts folder.
* Compiles both contracts with the solidity compiler.
* Writes the output to the build directory.

<!-- If CI/CD is added, only run compile when contracts folder is actually changed. -->