import React, { Component } from "react";
import { Card } from 'semantic-ui-react';
// import 'semantic-ui-css/semantic.min.css'; // this also seems to work (remove link tag to see)

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

  // iterate over list of campaign addresses and for each, create a new object.
  renderCampaigns() {
    // pass a function into map
    // that function is then called one time for every element inside this array
    // whatever we return is assigned to the items var.
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: <a>View Campaign</a>, // placeholder
        fluid: true // tells the card to take up the width of its container.
      };
    });

    return <Card.Group items={items}/>;
  }

  render() {
    return <div>
      <link
      async
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
      />
      {this.renderCampaigns()}
    </div>

  }
}

export default CampaignIndex;