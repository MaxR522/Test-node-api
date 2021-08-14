import config from './config';
import Logger from './loaders/winston';
import app from './loaders/express';

app
  .listen(config.port, () =>
    Logger.info(
      `Server :: application is running @ 'http://localhost:${config.port}' ! 🎉 `,
    ),
  )
  .on('error', (error) => {
    Logger.error(`${error} ❌`);
  });
