const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const citizenRoutes = require('./src/routes/citizen.routes');
const errorHandler = require('./src/middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/citizens', citizenRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.json({ message: 'BNIMS API operational' });
});

// Error Middleware
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`);
});
