import mongoose from 'mongoose';

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.log(error);
        throw new Error("Cannot connect to MongoDB");
    }
}

async function disconnectFromDatabase() {
    try {
        await mongoose.disconnect();
    } catch (error) {
        console.log(error);
        throw new Error("Could not disconnect from MongoDB");
    }
}

export { connectToDatabase, disconnectFromDatabase}