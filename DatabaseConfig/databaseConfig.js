import mongoose from "mongoose";

// const DATABASE_URL = "mongodb+srv://fypggclms:admin@cluster0.lf9nggn.mongodb.net/?retryWrites=true&w=majority"
//mongodb://localhost:27017
const connectToDatabase = async () => {
    const DATABASE_URL = 'mongodb+srv://fypggclms:admin@cluster0.lf9nggn.mongodb.net/?retryWrites=true&w=majority';
    // const DATABASE_URL = 'mongodb://localhost:27017/fypggclms';
    console.log(DATABASE_URL);
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4 // Use IPv4, skip trying IPv6
    }
    mongoose.Promise = global.Promise;
    try {
        await mongoose.connect(DATABASE_URL, options);
        console.log('Connected to MongoDB database');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        // Exit the process or handle the error as per your application's requirements
        process.exit(1);
    }
};
export default connectToDatabase;
