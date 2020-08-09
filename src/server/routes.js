const ctrl = require('./ctrl.js');

const appRouter = function (app) {
  const arr = [1, 2, 3];
  app.get('/', (req, res) => res.json(arr));
};

// route = '/player'
// ctrl => return player info
//

module.exports = appRouter;
