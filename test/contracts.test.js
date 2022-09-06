const assert = require('assert');
const { exec } = require('child_process');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // Capital W means we are the constructor here.
const web3 = new Web3(ganache.provider()); // instantiating the constructor above. attempts to connect to local test network. Different providers will be set for 'production' networks.
const { interface, bytecode } = require('../compile');

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  campaign = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000' });
})

describe('Campaign', () => {

  it('deploys a contract', () => {
    assert.ok(campaign.options.address);
  })

})