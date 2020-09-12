import { Request } from 'express';

interface NameRequest extends Request {
  body: { post: string };
}

export { NameRequest };
