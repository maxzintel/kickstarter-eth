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
    // summary returns as an object with keys/vals
    const summary = await campaign.methods.getSummary().call();

    // even though summary is an object, we can refer to its values like its an array.
    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props;

    const items = [
      {
        header: manager,
        meta: 'Campaign Manager',
        description: 'The address of the campaigns manager & as such the address that manages request creation.',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: balance,
        meta: 'Balance of the Campaign',
        description: 'Measured in Wei. Sum of all contributions thus far, less payments made by the campaign approved by its participants.',
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution',
        description: 'Measured in Wei. The minimum contribution an individual must make to participate in the campaign as an approver.',
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description: 'Initiated by the campaigns manager, the number of requests made. Each request is a request to use some of the campaigns balance to pursue the goals of the campaign.',
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description: 'Also the number of contributors. Greater than 50% this number is required to approve a request to use the campaign funds.',
      }
    ];

    return <Card.Group items={items}/>;
  }

  render() {
    return (
      <Layout>
        {this.renderCards()}
      </Layout>
    )
  }
}

export default CampaignShow;