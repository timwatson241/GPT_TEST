// Import the 'mongoose' package as a module
import mongoose from 'mongoose';

// Define a function 'connectDB' that takes a single argument 'url'
const connectDB = (url: string) => {

  // Set the 'strictQuery' option to 'true' on the 'mongoose' object. This option enforces strict mode for querying, which means that queries that include undefined fields will be rejected.
  mongoose.set('strictQuery', true);
  
  // Connect to the MongoDB database using the specified 'url'. The 'mongoose.connect()' method returns a Promise, which allows us to use the 'then()' and 'catch()' methods to handle the result of the connection attempt.
  mongoose.connect(url)
    // If the connection is successful, log a message to the console.
    .then(() => console.log('connected to mongo'))
    // If the connection fails, log an error message and the error object to the console.
    .catch((err) => {
      console.error('failed to connect with mongo');
      console.error(err);
    });
};

// Export the 'connectDB' function as the default export of the module. This allows other modules to import and use this function.
export default connectDB;
