require('dotenv').config()

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

// Uses a test wallet on the Goerli network, directly injects seed phrase to create provider.
const mnemonic = process.env.MNEMONIC;
const network = process.env.GOERLI_ENDPOINT;

// Set provider to testnet wallet on goerli net.
const provider = new HDWalletProvider(mnemonic, network);
const web3 = new Web3(provider);

const compiledFactory = require("./build/Factory.json");
const abi = compiledFactory.abi;
const bytecode = compiledFactory.evm.bytecode.object;

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: '0x' + bytecode})
    .send({ from: accounts[0] })
    .catch(err => console.log(err));

  console.log('Deployed Contract to ', result.options.address);
  provider.engine.stop();
};

deploy();