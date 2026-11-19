require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const healthRoutes = require('./routes/healthRoutes');
const notFound = require('./middleware/notFound');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/health', healthRoutes);

app.use(notFound);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
