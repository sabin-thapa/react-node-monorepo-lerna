import app from './app';
import env from "./utils/validateEnv";
import mongoose from "mongoose";

const PORT = env.PORT || 5000;



mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log(`Mongoose Database Connected!`);
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error(err));
