import Express from 'express';
import UserController from './controllers/UserController';
import PostController from './controllers/PostController';

const app = Express();
app.use(Express.json);
const PORT = 8000;

app.get('/', (request, response) => {
  return response.send({
    message: 'Hello World'
  });
});

app.post('/users', UserController.create);
app.post('/posts', PostController.create);
app.get('/posts/:id', PostController.list);
app.put('/posts', PostController.update);
app.delete('/posts/:id', PostController.delete);

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});