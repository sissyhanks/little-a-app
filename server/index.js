import express from 'express';
import mongoose from 'mongoose';

import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js'

import  path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(express.urlencoded({
  limit: "30mb",
  extended: true
}));
app.use(express.json({
  limit: "30mb",
  extended: true
}));

import routes from './routes/routes.js'

// If in production, then use static frontend build files.
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

connectDB();

// mongoose.connect('mongodb://localhost/pharm_assist', {
//       //things that prevent warnings in console???? 8 &9 gave me shit in the console ??? commented them out are OK
//       useNewUrlParser: true,
//       // useUnifiedTypology : true,
//       // useFindAndModify: false
//     }, () => {
//     console.log(`Mongo DB connected`);
//   });

dotenv.config({ path: '.env'});

const app = express();

app.use(cors());
app.use('/', routes);

app.get('/', (req, res) => {
  res.send('developers can make test apps ... as a treat');
});

const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT, console.log(`Server running on port ${PORT}`));

