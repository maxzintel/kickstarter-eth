import React, {Component} from "react";
import { Form, Input, Message, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Campaign from '../web3/campaign';
import web3 from "../web3/web3";
 
class ContributeForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);

    this.setState({ loading: true,
    errorMessage: ''});

    try {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether")
      });
    } catch (err) {
      this.setState({
        errorMessage: err.message
      });
    }

    this.setState({loading: false});
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>
            Amount to Contribute
          </label>
          <Input
            label="ether"
            labelPosition="right"
            placeholder='Ex: 1'
            value={this.state.value}
            onChange={event => this.setState({value: event.target.value})}
          />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errorMessage}/>
        <Button loading={this.state.loading} primary>
          Contribute!
        </Button>
      </Form>
    )
  }
};
export default ContributeForm;