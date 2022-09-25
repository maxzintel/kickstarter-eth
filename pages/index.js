import React, { Component } from "react";
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/layout';

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
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>
          <Button
            content="Create Campaign"
            icon="add circle"
            floated="right"
            primary={true} // A button can be formatted to show different levels of emphasis.
          />

          {this.renderCampaigns()}
        </div>
      </Layout>
    )
  }
}

export default CampaignIndex;