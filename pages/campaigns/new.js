import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../web3/factory';
// need this to get list of accounts and tell createCampaign where we are coming from.
import web3 from '../../web3/web3';

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  };

  // Create event handler
  onSubmit = async (event) => {
    // Keep browser from attempting to submit the form.
    event.preventDefault();

    this.setState({ loading: true });

    try {
      const accounts = await web3.eth.getAccounts();
      // use imported factory instance
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>
        {/* Pass a reference to onSubmit */}
        {/* Error here is set to an empty string by default, which is falsy, so the error will not appear until there is a real issue. */}
        {/* !! here turns the string into its equivalent boolean. */}
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
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

          <Message error header="Oops!" content={this.state.errorMessage}/>
          <Button loading={this.state.loading} primary >Create</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;