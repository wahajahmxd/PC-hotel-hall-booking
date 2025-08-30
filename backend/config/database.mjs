import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testDBURI = process.env.MONGO_URI;
const deploymentDBURI = 'mongodb://localhost:27017/deploymentDatabase';
const isProduction = false; // Set this to true for production environment, false for testing

const connectDatabase = () => {
    const dbURI = isProduction ? deploymentDBURI : testDBURI;

    mongoose.connect(dbURI, {})
        .then((data) => {
            console.log(`MongoDB connected with server at ${data.connection.host}!`);
        })
        .catch((err) => {
            console.log('Error connecting to MongoDB:', err);
        });
};

export { connectDatabase };
