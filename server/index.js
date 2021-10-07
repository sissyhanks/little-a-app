import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
import { connectDB } from './config/db.js'

// ... other imports 
import  path from 'path';

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))



import routes from './routes/routes.js'

// mongoose.connect('mongodb://localhost/pharm_assist', {
//       //things that prevent warnings in console???? 8 &9 gave me shit in the console ??? commented them out are OK
//       useNewUrlParser: true,
//       // useUnifiedTypology : true,
//       // useFindAndModify: false
//     }, () => {
//     console.log(`Mongo DB connected`);
//   });

const app = express();



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

connectDB();

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});



app.listen(PORT, console.log(`Server running on port ${PORT}`));

dotenv.config({ path: '.env'});