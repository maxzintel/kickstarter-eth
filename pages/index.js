import React, { Component } from "react";

// import factory instance
import factory from '../web3/factory';

class CampaignIndex extends Component {
  // componentDidMount is appropriate for data fetching in traditional react apps
  // BUT since we are using next & since we want to fetch data on the next server...
  // we ACTUALLY want to use getInitialProps
  // getInitialProps is the first and only thing the next server will do, it will not attempt to render anything.

  // static = class function => does not require an instance to call this method.
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    // below object is provided to the component as props
    return { campaigns };
  }

  render() {
    return <h1>{this.props.campaigns[0]}</h1>
  }
}

export default CampaignIndex;