import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoDB: MongoMemoryServer;

export const connect = async () => {
  mongoDB = await MongoMemoryServer.create();
  const uri = mongoDB.getUri();
  await mongoose.connect(uri);
};

export const disconnect = async () => {
  // await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  await mongoDB.stop();
};
