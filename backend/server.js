const initialize = require('./services/initializer');
const logger = require('./utils/logger');
const app = require('./app');

const port = 5555;

initialize().then(() => {
  app.listen(port, () => {
    logger.info(`Node App listening at ${port}`);
  });
}).catch((err) => {
  logger.error(
    `Node App failed to listen at ${port} : err: ${err}`,
  );
});
