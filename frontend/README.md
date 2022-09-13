# Kickstarter but on Ethereum

## Campaign Frontend

### Routes

* `/` - List of Campaigns
* `campaigns/new` - Form to make a campaign
* `/campaigns/$ADDRESS` - Campaign details for a campaign at address `$ADDRESS`
* `/campaigns/$ADDRESS/requests` - Requests for above campaign
* `/campaigns/$ADDRESS/requests/new` - Form to create a request for above campaign

In next.js, the files within the `/pages` directory are automatically made as routes at that filename.
