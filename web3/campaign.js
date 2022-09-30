// import web3 interface from web3.js
import web3 from './web3';
// import the compiled contract from our build directory
import Campaign from './build/Campaign.json';

const address = (address) => {
  return new web3.eth.Contract(
    Campaign.abi,
    address
  );
};

export default address;