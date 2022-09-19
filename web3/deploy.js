require('dotenv').config();

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

// Uses a test wallet on the Goerli network, directly injects seed phrase to create provider.
const mnemonic = process.env.MNEMONIC;
const network = process.env.GOERLI_ENDPOINT;

// Set provider to testnet wallet on goerli net.
const provider = new HDWalletProvider(mnemonic, network);
const web3 = new Web3(provider);

const compiledFactory = require("./build/Factory.json");

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ gas: "1400000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();