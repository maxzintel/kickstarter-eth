const {createServer} = require('http');
const next = require('next');
const routes = require('./routes');

// Create new app instance and pass config object to it.
// Tells the app to look at the NODE_ENV global var...
// and look to see if its set to prod. If it is, it changes how next behaves.
const app = next({
  dev: process.env.NODE_ENV !== 'production'
});

const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  createServer(handler).listen(3000, (err) => {
    if (err) throw err;
    console.log('Application ready on localhost:3000');
  });
});