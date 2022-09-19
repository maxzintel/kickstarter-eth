import React, { Component } from "react";

// import factory instance
import factory from '../web3/factory';

// export async function getStaticProps(context) {

// }

class CampaignIndex extends Component {
  async componentDidMount() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    console.log(campaigns);
  }

  render() {
    return <h1>Campaigns Index!</h1>
  }
}

export default CampaignIndex;