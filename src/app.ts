import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import session from "express-session";
import passport from "passport";

import { NODE_ENV, SECRET_WORD } from "./config";

import indexRouter from "./routes/index";
import clientRouter from "./routes/clientRoutes";
import adminRoutes from "./routes/adminRoutes";
import categoryRouter from "./routes/categoryRoutes";
import productRouter from "./routes/productRoutes";

const app = express();

// app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

if (NODE_ENV !== "production") app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"../", "public")));

app.use(
	session({
		secret: SECRET_WORD,
		resave: true,
		saveUninitialized: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());

// app.use(
// 	fileUpload({
// 		useTempFiles: true,
// 		tempFileDir: "./uploads",
// 		debug: NODE_ENV !== "production",
// 	})
// );

// ****************************************************************************
// 										              Endpoints
// ****************************************************************************

app.use("/", indexRouter);
app.use("/client", clientRouter);
app.use("/admin/dashboard", adminRoutes);
app.use("/admin/dashboard/category", categoryRouter);
app.use("/admin/dashboard/product", productRouter);
// app.use('/users', usersRouter);

// app.use("/uploads", express.static(path.join(path.resolve(), "/uploads")));

// catch 404 and forward to error handler
app.use((_req, _res, next) => next(createError(404)));

// error handler
app.use((err: any, req: any, res: any) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({ error: err });
});

export default app;
