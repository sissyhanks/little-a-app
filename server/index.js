import express from 'express';
import mongoose from 'mongoose';

import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js'

import("./models/user");

connectDB();

import routes from './routes/routes.js'

// ... other imports 
import  path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);







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

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))

app.use(express.urlencoded({
  limit: "30mb",
  extended: true
}));
app.use(express.json({
  limit: "30mb",
  extended: true
}));

app.use(cors());
app.use('/', routes);

app.get('/', (req, res) => {
  res.send('hi i will be your pharm-assist today');
});

const PORT = process.env.PORT || 5000;

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, "./client/build")))
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')) // relative path
  })
}

// ...
// Right before your app.listen(), add this:
// Step 1:
// app.use(express.static(path.resolve(__dirname, "./client/build")));
// // Step 2:
// app.get("*", function (request, response) {
//   response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });

app.listen(process.env.PORT, console.log(`Server running on port ${PORT}`));

