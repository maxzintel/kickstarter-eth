// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "contracts/campaign.sol";

// deploys instances of the campaign contract and stores a list of all deployed campaigns.
contract Factory {
  address[] public deployedCampaigns;

// remember we require all new contracts to set the minimum amount of money that needs to be contributed.
// if we only specify the arg of minimum here, the manager address in the campaign will be...
// ...set to the FACTORY contract address, that is not what we want.
// 
  function createCampaign(uint minimum) public {
    address newCampaign = address(new Campaign(minimum, msg.sender));
    deployedCampaigns.push(newCampaign);
  }

  function getDeployedCampaigns() public view returns (address[] memory) {
    return deployedCampaigns;
  }
}