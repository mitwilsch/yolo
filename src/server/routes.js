const ctrl = require('./ctrl.js');

const appRouter = function (app) {
  app.get('/', (req, res) => {
    res.status(200).send('Hello World');
  });

  app.get('/player', (req, res) => {
    const player = ctrl.getPlayer();
    res.status(200).send(player);
  });
};

// route = '/player'
// ctrl => return player info
//

module.exports = appRouter;
