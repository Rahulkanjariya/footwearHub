"use strict";

const express = require("express");
const http = require("http");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./helpers/swaggerConnection");

const { dbConnect } = require("./config/db.config");

const app = express();
app.use(express.json());
app.use(fileUpload());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Auth API
app.use("/api/v1/auth",require("./routes/auth/authRoutes"));

// Admin API
app.use("/api/admin",require("./routes/admin/userRoutes"));
app.use("/api/admin",require("./routes/admin/addressRoutes"));
app.use("/api/admin",require("./routes/admin/categoryRoutes"));
app.use("/api/admin",require("./routes/admin/subCategoryRoutes"));
app.use("/api/admin",require("./routes/admin/brandRoutes"));
app.use("/api/admin",require("./routes/admin/productRoutes"));
app.use("/api/admin",require("./routes/admin/reviewRoutes"));
app.use("/api/admin",require("./routes/admin/couponRoutes"));
app.use("/api/admin",require("./routes/admin/orderRoutes"));
app.use("/api/admin",require("./routes/admin/shipmentRoutes"));

// User API
app.use("/api/v1/user",require("./routes/user/userRoutes"));
app.use("/api/v1/user",require("./routes/user/addressRoutes"));
app.use("/api/v1/user",require("./routes/user/categoryRoutes"));
app.use("/api/v1/user",require("./routes/user/subCategoryRoutes"));
app.use("/api/v1/user",require("./routes/user/brandRoutes"));
app.use("/api/v1/user",require("./routes/user/productRoutes"));
app.use("/api/v1/user",require("./routes/user/wishlistRoutes"));
app.use("/api/v1/user",require("./routes/user/reviewRoutes"));
app.use("/api/v1/user",require("./routes/user/couponRoutes"));
app.use("/api/v1/user",require("./routes/user/orderRoutes"));
app.use("/api/v1/user",require("./routes/user/shipmentRoutes"));

// Establishes connection to the database
global.clientConnection = dbConnect();

// Create HTTP server using express app
const server = http.createServer(app);

server.listen(process.env.PORT, process.env.HOST,() => {
    console.log(`Listening on http://${process.env.HOST}:${process.env.PORT}`);
});

module.exports = app;
