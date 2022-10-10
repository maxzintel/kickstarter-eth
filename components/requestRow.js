import React, {Component} from "react";
import { Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Campaign from '../web3/campaign';
import web3 from "../web3/web3";
import { Router } from '../routes';

class RequestRow extends Component {
  state = {

  }

  render() {
    const { Row, Cell } = Table;
    const { id, request } = this.props;
    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{request.value}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{request.approvalCount}</Cell>
      </Row>
    );
  }
};

export default RequestRow;