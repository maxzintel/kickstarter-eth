// import web3 interface from web3.js
import web3 from './web3';

// import the compiled contract from our build directory
import Factory from './build/Factory.json';

const instance = new web3.eth.Contract(
  JSON.parse(Factory.interface),
  process.env.FACTORY_ADDRESS
);

export default instance;