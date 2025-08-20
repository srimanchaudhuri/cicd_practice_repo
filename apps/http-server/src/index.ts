import { client } from '@repo/db/client';
import express from 'express';

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
  res.send('Hello from the HTTP server!');
});

app.post('/signup', async (req, res) => {
  // Handle signup logic here
  console.log(`Received signup request ${req.body}`);
  const { username, password } = req.body;
  console.log(`Received signup request for user: ${username}`);
  const user = await client.user.create({
    data: {
      email: username,
      password: password // Note: In a real application, ensure to hash the password before storing it
    },
  });
  if (!user) {
    return res.status(400).send('Signup failed!');
  }
  res.json({
    message: 'Signup successful!',
    id: user.id
  });
});

app.listen(3002, () => {
  console.log('HTTP server is running on http://localhost:3002');
});