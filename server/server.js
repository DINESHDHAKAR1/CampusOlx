const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({path: "./.env"})
const app = require("./index")
const port = process.env.PORT || 5000
const URI = process.env.URI || "mongo URI"

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB connection successful...");
  });

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.on('disconnected', () => {
  console.log('MongoDB connection disconnected');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
