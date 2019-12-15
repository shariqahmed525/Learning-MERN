const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Body middleware
app.use(express.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to mongo
mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })  // Added new mongo url parser
  .then(() => console.log('MongoDB Connected....'))
  .catch(err => console.log('error in MongoDB Connection ', err));

// Use Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/items', require('./routes/api/items'));

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

// define Port
const port = process.env.PORT || 5000;

// port listen
app.listen(port, () => console.log(`Server started on port ${port}`));