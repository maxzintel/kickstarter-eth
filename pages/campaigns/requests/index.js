import React, {Component} from "react";
import Layout from "../../../components/layout";
import { Link } from "../../../routes";
import { Button, Table } from 'semantic-ui-react';
import Campaign from '../../../web3/campaign';
import RequestRow from "../../../components/requestRow";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    // the plus here converts this return value to an int.
    // otherwise, requests only returns 1 element because the number is simply a string rather than an actual int it can measure length with.
    const requestCount = +await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call()

    // Create array of returned structs(console.log it)
    // What we are trying to do here is iterate from 0 to the value of request count.
    const requests = await Promise.all(
      Array(requestCount).fill().map((element, index) => {
        return campaign.methods.requests(index).call()
      })
    );

    return { address, requests, requestCount, approversCount };
  }

  // We need to setup an array of structs
  // Request is a struct in our contract code.
  renderRows() {
    // arrow function is called for every request/index of request
    return this.props.requests.map((request, index) => {
      return <RequestRow
        key={index}
        id={index}
        request={request}
        address={this.props.address}
        approversCount={this.props.approversCount}
      />;
    });
  }

  render() {
    // es2015 destructuring
    const {Header, Row, HeaderCell, Body} = Table;
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: 10 }}>
              Add Request
            </Button>
          </a>
        </Link>
        <Table striped>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount (ether)</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>

          <Body>
            {this.renderRows()}
          </Body>
        </Table>
      </Layout>
    );
  };
}

export default RequestIndex;