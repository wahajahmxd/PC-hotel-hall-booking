import app from './app.mjs';
import { connectDatabase } from './config/database.mjs';


const mongoDBURI = 'mongodb://localhost:27017/PC-hall-booking';
const port = 5000; 


connectDatabase(mongoDBURI);

const server = app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
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
