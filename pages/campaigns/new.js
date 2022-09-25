import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Form, Button, Input } from 'semantic-ui-react';
import factory from '../../web3/factory';
// need this to get list of accounts and tell createCampaign where we are coming from.
import web3 from '../../web3/web3';

class CampaignNew extends Component {
  state = {
    minimumContribution: ''
  };

  // Create event handler
  onSubmit = async (event) => {
    // Keep browser from attempting to submit the form.
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    // use imported factory instance
    await factory.methods
      .createCampaign(this.state.minimumContribution)
      .send({
        from: accounts[0]
      });
  };

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>
        {/* Pass a reference to onSubmit */}
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label='wei'
              labelPosition='right'
              placeholder='Ex: 1000'
              value={this.state.minimumContribution}
              // Whenever a user changes this, we are sent the event object containing this value.
              // The minimumContribution state is updated with it, causing the whole component to re-render.
              onChange={event => this.setState({ minimumContribution: event.target.value })}
            />
          </Form.Field>

          <Button primary >Create</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;