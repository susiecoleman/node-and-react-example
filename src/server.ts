import * as express from 'express';
import { Application, Request, Response } from 'express';
import { json, urlencoded } from 'body-parser';
import * as path from 'path';

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/api/greet', (req: Request, res: Response) => {
  res.send({ express: 'Hello Everyone' });
});

app.post('/api/name', (req: Request, res: Response) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '..', 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
