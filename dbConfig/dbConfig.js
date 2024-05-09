import mongoose from 'mongoose';

export async function connectDB() {
    try {
      await  mongoose.connect(process.env.MONGO_URI_CLOUD);
        const connection = mongoose.connection;

      await  connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

       await connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);

    }


}