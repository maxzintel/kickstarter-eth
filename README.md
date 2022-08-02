# Kickstarter, but on ETH

## Campaign Contract

### Variables

* manager - `address` - Address of the person who is managing the campaign.
* minimumContribution - `uint` - Min donation required to be considered a contributor.
* approvers - `address[]` - List of addresses for every person who has donated.
  * Will change a bit over time.
* requests - `Request[]` - List of requests that the manager has created.

* Factory.deployedCampaigns - `address[]` - Addresses of all deployed campaigns.

### Functions

* Campaign - Constructor fnc that sets the minimumContribution and the owner.
* contribute - Called when someone wants to donate money to the campaign and become an approver/contributor.
* createRequest - Called by the manager to create a spending request.
* approveRequest - called by each contributor to approve a request.
  * Will change a bit over time.
* finalizeRequest - After enough approvals are received, the manager can call this to get money sent to the vendor.

* Factory.createCampaign - Deploys a new instance of a Campaign and stores the resulting address.
* Factory.getDeployedCampaigns - Returns a list of all deployed campaigns.
