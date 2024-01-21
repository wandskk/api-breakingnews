import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("Wait connecting to the database");

  mongoose
    .connect(
      "mongodb+srv://devwk:sz991471443br@cluster0.yvin9uh.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch((error) => console.log(error));
};

export default connectDatabase;
