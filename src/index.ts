import { Hono } from 'hono';
import { cors } from 'hono/cors';
import {
  UpdateIDHandler,
  RemoveItemHandler,
  UpdateInputValueHandler,
  UpdateTextHandler,
} from './todos';

const app = new Hono();

app.use('*', cors());

app.get('/', async (c) => {
  const response = await fetch(`https://stream-htmx.webflow.io/custom-server`);

  return new Response(response.body, response);
});

app.get('/todos', (c) => {
  return c.body(null);
});

app.post('/todos', async (c) => {
  // Get the inputs
  const input = await c.req.formData();
  const title = input.get('title');

  // TODO: Do something when there is no title

  const id = crypto.randomUUID();

  // Fetch Webflow's page
  const response = await fetch('https://stream-htmx.webflow.io/custom-server');

  // Mutate Webflow's page
  return new HTMLRewriter()
    .on('[data-element="todo_item"]', new UpdateIDHandler(id))
    .on(
      '[data-element="todo_item"] [data-element="title"]',
      new UpdateTextHandler(title!)
    )
    .on('[data-element="title-input"]', new UpdateInputValueHandler(title!))
    .on(
      '[data-element="title-input"][data-type="edit"]',
      new RemoveItemHandler()
    )
    .transform(response);
});

app.post('/todos/edit', async (c) => {
  // Get the inputs
  const input = await c.req.formData();
  const title = input.get('title');

  // TODO: Do something when there is no title

  const id = crypto.randomUUID();

  // Fetch Webflow's page
  const response = await fetch('https://stream-htmx.webflow.io/custom-server');

  // Mutate Webflow's page
  return new HTMLRewriter()
    .on('[data-element="todo_item"]', new UpdateIDHandler(id))
    .on(
      '[data-element="todo_item"] [data-element="title"]',
      new RemoveItemHandler()
    )
    .on('[data-element="title-input"]', new UpdateInputValueHandler(title!))
    .transform(response);
});

app.delete('/todos', (c) => {
  return c.body(null);
});

export default app;
