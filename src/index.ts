import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

app.use('*', cors());

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/todos', (c) => {
  return c.html('<h1>Todos</h1>');
});

app.post('/todos', async (c) => {
  // Get the inputs
  const input = await c.req.formData();
  const title = input.get('title');

  // TODO: Do something when there is no title

  const id = crypto.randomUUID();

  // Generate the new HTML using the inputs
  return c.html(/*html*/ `
  <div id="todo_item_${id}" class="todo_item">
    <div>${title}</div>

    <form hx-delete="http://127.0.0.1:8787/todos" hx-target="#todo_item_${id}" hx-swap="outerHTML">
      <input type="hidden" name="id" value="${id}">
      <input type="hidden" name="title" value="${title}">
      <button type="submit" class="todo_item-delete">Delete</button>
    </form>
  </div>
  `);
});

app.delete('/todos', (c) => {
  return c.body(null);
});

export default app;
