import mongoose from 'mongoose';

interface Options {
  dbName: string;
  mongoUrl: string;
}

export class MongoDatabase {
  static async connect(options: Options) {
    const { dbName, mongoUrl } = options;

    try {
      await mongoose.connect(mongoUrl, { dbName });
      console.log(`Database connected`);
      return true;
    } catch (error) {
      console.log('Mongo connection error');
      throw error;
    }
  }
}
