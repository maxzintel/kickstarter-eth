import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Form, Button, Input, Message, Card } from 'semantic-ui-react';
import factory from '../../web3/factory';
import web3 from '../../web3/web3';
import { Link, Router } from '../../routes';
import Campaign from '../../web3/campaign';

class CampaignShow extends Component {

  static async getInitialProps(props) {
    const address = props.query.address;
    const campaign = Campaign(address);
    const summary = await campaign.methods.getSummary().call();

    const summaryObj = Object.entries(summary).map(([key, value]) => {
      return {
        key: key,
        value: value
      };
    });

    summaryObj[0].key;

    console.log(summaryObj);

    return { summary };
  }

  renderSummary() {

    const summary = Object.entries(this.props.summary).map(([key, value]) => {
      return {

      };
    });

    console.log(summary);

    return summary;
    // return <Card.Group items={summary}/>;
  }

  render() {
    return (
      <Layout>
        {/* {this.renderSummary()} */}
      </Layout>
    )
  }
}

export default CampaignShow;