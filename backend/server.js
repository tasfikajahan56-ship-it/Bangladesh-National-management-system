const express = require('express');
const cors = require('cors');
const env = require('./config/env');

const citizenRoutes = require('./src/routes/citizen.routes');
const fatherRoutes = require('./src/routes/father.routes');
const motherRoutes = require('./src/routes/mother.routes');
const spouseRoutes = require('./src/routes/spouse.routes');
const authRoutes = require('./src/routes/auth.routes');
const requestRoutes = require('./src/routes/request.routes');
const paymentRoutes = require('./src/routes/payment.routes');
const errorHandler = require('./src/middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/citizens', citizenRoutes);
app.use('/api/fathers', fatherRoutes);
app.use('/api/mothers', motherRoutes);
app.use('/api/spouses', spouseRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/payments', paymentRoutes);
// Root Endpoint
app.get('/', (req, res) => {
  res.json({ message: 'BNIMS API operational' });
});

// Error Middleware
app.use(errorHandler);

// Start Server
app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`);
});