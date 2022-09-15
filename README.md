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

## Campaign Frontend

NOTE: There's no reason other than my own personal convenience that this frontend is in the same repo as the contract code. In fact, they _should_ be in different ones.

### Routes

* `/` - List of Campaigns - `/pages/index.js`
  * Requirements:
    * Configure web3 with a provider from metamask
    * tell web3 that a deployed copy of the 'Factory' exists
    * use Factory instance to retrieve a list of deployed campaigns
    * use react to show something about each campaign
* `campaigns/new` - Form to make a campaign
* `/campaigns/$ADDRESS` - Campaign details for a campaign at address `$ADDRESS`
* `/campaigns/$ADDRESS/requests` - Requests for above campaign
* `/campaigns/$ADDRESS/requests/new` - Form to create a request for above campaign

In next.js, the files within the `/pages` directory are automatically made as routes at that filename.

### Next.JS

Next JS uses something called server-side render. All the JS code is being executed on the Next Server, which renders an HTML doc, and sends that doc to the browser.

Thus, content appears on the screen very quickly. Especially if users are on mobile.

Data fetching logic also happens on the Next Server. Next fetches campaigns and other info from the  ETH Network BEFORE we ever require web3/Metamask being present.

This is pretty cool, most ETH applications require a wallet to enter the 'app' presently. This one will not.

```txt
(our code) => (Next Server) => (HTML doc) => (our code)
                   ||             ||            ||
             (ETH NETWORK)       (    BROWSER     )
```
