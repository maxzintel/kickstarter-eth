import React, { Component } from 'react';
// import 'semantic-ui-css/semantic.min.css';
import Layout from '../../components/layout';
import { Form, Button, Input } from 'semantic-ui-react';

class CampaignNew extends Component {
  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>
        <Form>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label='wei'
              labelPosition='right'
              placeholder='Ex: 1000'
            />
          </Form.Field>

          <Button primary loading>Create</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;