// see next routes official docs
// require statement here returns a function that is invoked immediately after we require it into this file.
const routes = require('next-routes')();

// Routes higher up take precedent over routes lower in hierarchy.
routes
  .add('/campaigns/new', '/campaigns/new')
// :address means basically a wildcard variable we will name address.
  .add('/campaigns/:address', '/campaigns/show')
  .add('/campaigns/:address/requests', '/campaigns/requests/index')
  .add('/campaigns/:address/requests/new', '/campaigns/requests/new');

// exports helpers that allow us to automatically navigate users around the app
module.exports = routes;

