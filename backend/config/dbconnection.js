

const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()


const connectDB = async () =>{

    try{
        await mongoose.connect(process.env.DB_URI)
        console.log('DB is connected now ✅' )
    }
    catch(err){
        console.log('DB not connected ❌ check the matter', err)
    }
}

module.exports = connectDB;





/*const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;

*/