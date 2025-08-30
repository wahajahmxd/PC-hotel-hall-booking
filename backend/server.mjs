import app from './app.mjs';
import { connectDatabase } from './config/database.mjs';
import dotenv from 'dotenv';


dotenv.config();

const mongoDBURI = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

connectDatabase(mongoDBURI);

const server = app.listen(port, () => {
    console.log(`Server is working on ${port}`);
});


process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Unhandled Rejection");

    server.close(() => {
        process.exit(1);
    });
});

process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Unhandled Exception");

    server.close(() => {
        process.exit(1);
    });
});
