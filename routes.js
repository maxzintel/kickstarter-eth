// see next routes official docs
// require statement here returns a function that is invoked immediately after we require it into this file.
const routes = require('next-routes')();

// Routes higher up take precedent over routes lower in hierarchy.
routes
  .add('/campaigns/new', '/campaigns/new')
// :address means basically a wildcard variable we will name address.
  .add('/campaigns/:address', '/campaigns/show');

// exports helpers that allow us to automatically navigate users around the app
module.exports = routes;

