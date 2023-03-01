require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
// const adminauthRouter = require("./Routes/AdminAuthRoute");
const userauthRouter = require("./Routes/UserAuthRoute");
const userRouter = require("./Routes/UserRoute");
const productRouter = require("./Routes/ProductRoute");
const couponRouter = require("./Routes/CouponRoute");
const contactRouter = require("./Routes/ContactRoute");
const contactUsRouter = require("./Routes/ContactUsRoute");
const preregisterRoute = require('./Routes/Pre-registrationRoute')


const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const connectDB = require("./DB/ConnectDB");

const errorHandlerMiddleware = require("./Middleware/Error-Handler");
const notFoundMiddleware = require("./Middleware/Not-Found");

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// app.use("/api/v1/admin", adminauthRouter);
app.use("/api/v1/auth", userauthRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/coupon", couponRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/contactus", contactUsRouter);
app.use('/api/v1/preregister',preregisterRoute)

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`server is listning on port:${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
