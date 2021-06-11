import mongoose from 'mongoose';

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNX, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('base de datos online')
    } catch (error) {
        console.log(error)
        throw new Error('db error')
    }
}

export default dbConnection;
