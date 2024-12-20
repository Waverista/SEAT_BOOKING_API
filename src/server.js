const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config');
const authRoutes = require('./routes/auth');
const routeRoutes = require('./routes/routes');
const busRoutes = require("./routes/buses");
const tripRoutes = require("./routes/trips");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/routes', routeRoutes);
app.use("/buses", busRoutes);
app.use("/buses", tripRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
