import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

import todoRoutes from './routes/todos';

const app = express();

app.use(json()); //registering parsing body middleware: it extracts json data from request and populates the res.body with that parsed json data

app.use('/todos', todoRoutes); //forwarding all requests starting with /todos to the router in todos.ts file

app.use((err: Error, req: Request, res: Response, next: NextFunction) => { //error handling middleware fn
  res.status(500).json({ message: err.message });
});

app.listen(3000);