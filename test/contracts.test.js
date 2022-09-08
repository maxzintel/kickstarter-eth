const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // Capital W means we are using the constructor here.
const web3 = new Web3(ganache.provider()); // instantiating the constructor above. Attempts to connect to local test network. Different providers will be set for 'production' networks.

const compiledFactory = require('../build/Factory.json');
const compiledCampaign = require('../build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: '1400000' });

  // minimum contribution is 100 wei for this campaign
  await factory.methods.createCampaign('100').send({ from: accounts[0], gas: '1000000' });

  // this function is a VIEW which means we change nothing
  // thus we call() it rather than send() to it.
  // the [] says take the first element from the array returned but the function call and assign it to the campaignAddress variable.
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

  // Uses existing contract (already deployed via above)
  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe('Campaigns', () => {

  it('deploys a factory', () => {
    assert.ok(factory.options.address);
  });

  it('deploys a campaign', () => {
    assert.ok(campaign.options.address);
  });


  it('marks caller as campaign manager', async () => {
    const manager = await campaign.methods.manager().call()

    // what we hope it to be, what it is.
    assert.equal(accounts[0], manager);
  });

  it('allows contributions to the campaign', async () => {
    const notManager = accounts[1];

    await campaign.methods.contribute().send({ 
      from: notManager, 
      value: '200'
    });

    assert(campaign.methods.approvers(notManager).call());
  });

  // it('does not allow contributions below the minimum', async () => {

  //   assert.ifError
  // });

  // it('allows the manager to create a request', async () => {

  // });

  // it('does not allow non-managers to create requests', async () => {

  // });

  // it('allows contributors to vote once on a request', async () => {

  // });

  // it('does not allow non-contributors to vote', async () => {

  // });

  // it('allows the manager to finalize a request', async () => {

  // });

});