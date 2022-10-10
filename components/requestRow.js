import React, {Component} from "react";
import { Table, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Campaign from '../web3/campaign';
import web3 from "../web3/web3";
import { Router } from '../routes';

class RequestRow extends Component {
  state = {

  }

  onApprove = async (event) => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);

    this.setState({ loading: true, errorMessage: ''});

    try {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.approveRequest(this.props.id).send({
        from: accounts[0]
      });
      Router.replaceRoute(`/campaigns/${this.props.address}`)
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }

    this.setState({
      loading: false
    });
  }

  onFinalize = async (event) => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);

    this.setState({ loading: true, errorMessage: ''});

    try {
      const accounts = await web3.eth.getAccounts()

      await campaign.methods.finalizeRequest(this.props.id).send({
        from: accounts[0]
      });
      Router.replaceRoute(`/campaigns/${this.props.address}`)
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }

    this.setState({
      loading: false
    });
  }

  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{request.approvalCount}/{approversCount}</Cell>
        <Cell>
          <Button color="green" basic onClick={this.onApprove}>
            Approve
          </Button>
        </Cell>
        <Cell>
          <Button color="red" basic onClick={this.onFinalize}>
            Finalize
          </Button>
        </Cell>
      </Row>
    );
  }
};

export default RequestRow;