const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const documentRoutes = require('./routes/documentRoutes');
const signatureRoutes = require('./routes/signatureRoutes');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/docs', documentRoutes);
app.use('/api/signatures', signatureRoutes);

app.get('/', (req, res) => {
  res.send('Server running');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.log(err));
