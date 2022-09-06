const path = require('path'); // cross-platform compatibility between windows and unix.
const fs = require('fs-extra');
const solc = require('solc');

// Find and remove the tmp build directory and its contents.
// See readme for details on why we do this.
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// Get and compile the contracts.
const campaignPath = path.resolve(__dirname, 'contracts', 'campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
var input = {
  language: 'Solidity',
  sources: 
  {
    'campaign.sol': {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
// const output = solc.compile(source, 1).contracts;

// Checks to see if the dir exists and if not creates it for us.
fs.ensureDirSync(buildPath);

// output the contracts to our tmp directory.
console.log(output);
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract + '.json'),
    output[contract]
  );
}
