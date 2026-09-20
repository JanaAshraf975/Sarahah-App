import connectDB from "./DB/connection.js";
import { authRouter, messageRouter, userRouter } from "./Modules/index.js";
import { errorGlobalHandler } from "./Utils/response/error.response.js";


export const bootstrap = async (app, express) => {
  app.use(express.json());
  app.use("/api/v1/auth" , authRouter);
  app.use("/api/v1/user" , userRouter);
  app.use("/api/v1/msg" , messageRouter);

  await connectDB();
  app.use(errorGlobalHandler);
};
