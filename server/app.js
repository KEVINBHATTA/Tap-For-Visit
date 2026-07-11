if (process.platform === 'win32') {
  const dns = require('dns');
  dns.setServers(['8.8.8.8', '8.8.4.4']);
}

require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGODB_URL;





app.use(express.json());


mongoose.connect(DB_URL)
.then(() => {
  console.log("Connected to MongoDB");

  app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
  });
})

.catch((err) => {
  console.log("Error while connecting to MongoDB", err);
});

