import React, { Component } from 'react';
import Layout from '../../components/layout';
import ContributeForm from '../../components/contributeForm';
import { Button, Card, Grid } from 'semantic-ui-react';
import web3 from '../../web3/web3';
import Campaign from '../../web3/campaign';
import { Link } from "../../routes";

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
      manager: summary[4],
      address: props.query.address,
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
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Balance of the Campaign (ether)',
        description: 'Measured in Ether. Sum of all contributions thus far, less payments made by the campaign approved by its participants.',
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
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
        <h3> </h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    )
  }
}

export default CampaignShow;