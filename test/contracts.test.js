const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // Capital W means we are using the constructor here.
const web3 = new Web3(ganache.provider()); // instantiating the constructor above. Attempts to connect to local test network. Different providers will be set for 'production' networks.

const compiledFactory = require('../build/Factory.json');
const compiledCampaign = require('../build/Campaign.json');
const { exec } = require('child_process');

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

    const isContributor = await campaign.methods.approvers(notManager).call();
    assert(isContributor);
  });

  it('does not allow contributions below the minimum', async () => {
    const notManager = accounts[1];
    let executed;

    // Try contributing less than the minimum.
    try {
      await campaign.methods.contribute().send({ 
        from: notManager, 
        value: '90'
      });
      executed = 'success';
    } catch(err) {
      executed = 'failed';
    }

    assert.equal('failed', executed);
  });

  it('allows the manager to create a request', async () => {
    const manager = await campaign.methods.manager().call()

    await campaign.methods
      .createRequest('Buy Batteries', '100', accounts[2])
      .send({
        from: manager,
        gas: '1000000'
      });

    // get request we just made
    const request = await campaign.methods.requests(0).call();

    assert.equal('Buy Batteries', request.description);
  });

  it('does not allow non-managers to create requests', async () => {
    const notManager = accounts[1];
    let executed;

    try {
      await campaign.methods
      .createRequest('Buy Batteries', '100', accounts[2])
      .send({
        from: notManager,
        gas: '1000000'
      });
      executed = 'success';
    } catch {
      executed = 'failed';
    }

    assert.equal('failed', executed);
  });

  it('allows the full campaign flow', async () => {
    const manager = await campaign.methods.manager().call()
    const approver = accounts[1];
    const receiver = accounts[2];
    let executed;

    let originalBalance = await web3.eth.getBalance(receiver);
    originalBalance = web3.utils.fromWei(originalBalance, 'ether');
    originalBalance = parseFloat(originalBalance); // takes string and converts to number.

    await campaign.methods
      .createRequest('Buy Batteries', web3.utils.toWei('5', 'ether'), receiver)
      .send({
        from: manager,
        gas: '1000000'
      });

    await campaign.methods.contribute().send({ 
      from: approver, 
      value: web3.utils.toWei('10', 'ether')
    });

    await campaign.methods.approveRequest(0).send({
      from: approver,
      gas: 1000000
    });

    try {
      await campaign.methods.finalizeRequest(0).send({
        from: manager,
        gas: 1000000
      });
      executed = 'success';
    } catch {
      executed = 'failed';
    }

    // assert the request is successfully finalized.
    assert.equal('success', executed);

    let newBalance = await web3.eth.getBalance(receiver);
    newBalance = web3.utils.fromWei(newBalance, 'ether');
    newBalance = parseFloat(newBalance);

    // assert that generally the new balance is higher, then assert the exact increase.
    assert(originalBalance < newBalance );
    assert.equal(originalBalance + 5, newBalance);
  });

  // it('does not allow non-contributors to vote', async () => {

  // });

  // it('allows the manager to finalize a request', async () => {

  // });

});