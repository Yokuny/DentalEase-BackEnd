import mongoose from "mongoose";

const uri = "mongodb+srv://yokuny:021395@dentaleaseapp.8gdustp.mongodb.net/?retryWrites=true&w=majority";

export const dbConnect = async () => {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.error("<> Database error <>", error);
  }
};
