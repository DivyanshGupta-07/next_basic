import mongoose from "mongoose";

export async function connect() {
  try {
    //"!" gurantees for the env variable
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("mongodb connected");
    });
    connection.on("error", (err) => {
      console.log("mongodb connection error" + err);
      process.exit(1);
    });
  } catch (error) {
    console.log("some error while connecting to db");
    console.log(error);
  }
}
