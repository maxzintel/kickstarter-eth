const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // Capital W means we are using the constructor here.
const web3 = new Web3(ganache.provider()); // instantiating the constructor above. Attempts to connect to local test network. Different providers will be set for 'production' networks.

const compiledFactory = require('../contracts/build/Factory.json');
const compiledCampaign = require('../contracts/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Campaign', () => {

  it('deploys a contract', () => {
    assert.ok(campaign.options.address);
  });

});