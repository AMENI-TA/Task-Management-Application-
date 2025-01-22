

/* const express = require('express');

const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const connectDB = require('./config/dbconnection.js');
connectDB ();
const userRoutes =require ('./routes/userRoutes.js');

const User = require('./models/User.js');

 const app=express()
 app.use(express.json())

 const port=process.env.PORT

 
 console.log('hellow AMENI welcome ')

 app.listen(port ,()=> console.log(`server runnig on ${port}`))


 app.use('/users',userRoutes)



*/


const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/dbconnection');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' }));  // Frontend React sur le port 3000

app.use(express.json());  // To parse incoming JSON data

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Define port
const PORT = process.env.PORT || 3005;

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


if (process.env.NODE_ENV === "production") {
    const path = require('path');
    app.use(express.static(path.join(__dirname, "../frontend/build")));
  
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"))
    );
  }
  