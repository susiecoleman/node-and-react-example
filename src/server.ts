import * as express from 'express';
import { Application, Request, Response, NextFunction } from 'express';
import { json, urlencoded } from 'body-parser';
import * as path from 'path';
import { load } from 'yamljs';
import { serve, setup } from 'swagger-ui-express';
import { logger } from './utils/logger';
import { getEnvVariable } from './utils/config';
import { NameRequest } from './models';

const app: Application = express();
const port = getEnvVariable('PORT') || 5000;

app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/api/greet', (req: Request, res: Response) => {
  res.send({ express: 'Hello Everyone!' });
});

app.post('/api/name', (req: NameRequest, res: Response, next: NextFunction) => {
  const post: string = req.body.post;
  if (post !== undefined) {
    res.send(
      `I received your POST request. This is what you sent me: ${req.body.post}`
    );
  } else {
    next(new Error('Body did not contain a post string'));
  }
  req.on('error', e => {
    logger.info(e);
  });
});

const yaml = load(path.join(__dirname, '../', 'apiSpec.yml'));
app.use('/api/docs', serve, setup(yaml));

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '..', 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'client/build', 'index.html'));
  });
}

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ error: [error.message] });
});

app.listen(port, () => logger.info(`Listening on port ${port}`));
