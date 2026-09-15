import connectDB from "./DB/connection.js";
import { errorGlobalHandler } from "./Utils/response/error.response.js";


export const bootstrap = async (app, express) => {
  app.use(express.json());
  app.get("/", (req, res) => {
    res.send("Hello World");
  });
  await connectDB();
  app.use(errorGlobalHandler);
};
