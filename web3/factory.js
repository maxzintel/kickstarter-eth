
// import web3 interface from web3.js
import web3 from './web3';
// import the compiled contract from our build directory
import Factory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(Factory.abi, "0xf1720c3f4aF1AcAc27CA4033801bB628621f7f78" );

export default instance;