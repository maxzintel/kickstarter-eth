import React, {Component} from "react";
import Layout from "../../../components/layout";
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Campaign from '../../../web3/campaign';
import { Link, Router } from '../../../routes';
import web3 from "../../../web3/web3";

class RequestNew extends Component {
  state = {
    description: '',
    amount: '',
    recipient: '',
    errorMessage: '',
    loading: false
  };

  static async getInitialProps(props) {
    return {
      address: props.query.address
    }
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);

    this.setState({ loading: true, errorMessage: ''});

    try {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods
        .createRequest(this.state.description, web3.utils.toWei(this.state.amount, 'ether'), this.state.recipient)
        .send({from: accounts[0]});
      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>Back</a>
        </Link>
        <h3>Create a new request!</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>
              Request Description
            </label>
            <Input 
              placeholder='Ex: To buy 3000 ball bearings from XYZ Company'
              value={this.state.description}
              onChange={event => this.setState({
                description: event.target.value
              })}
            />
          </Form.Field>
          <Form.Field>
            <label>
              Amount to Send
            </label>
            <Input 
              placeholder='Ex: 2'
              label='ether'
              labelPosition="right"
              value={this.state.amount}
              onChange={event => this.setState({
                amount: event.target.value
              })}
            />
          </Form.Field>
          <Form.Field>
            <label>
              Recipient Address
            </label>
            <Input 
              placeholder='Ex: 0x69420'
              value={this.state.recipient}
              onChange={event => this.setState({
                recipient: event.target.value
              })}
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Create</Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;