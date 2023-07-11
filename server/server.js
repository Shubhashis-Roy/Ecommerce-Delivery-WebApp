import express from "express";
import color from "colors";
import dotenv from 'dotenv';
import morgan from "morgan";
import mongoose from "mongoose";
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRouters from './routes/productRouters.js'
import cors from 'cors';

// rest obj.
const app = express();

// middelwares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRouters);


//rest api
app.get('/', (req, res) => {
    res.send(
        "<h1>Helo</h1>"
    )
});


// configure env
dotenv.config();

mongoose
    .connect(process.env.mongo_Url, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Connect Mongodb");
    })
    .catch((e) => console.log(e));


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`.bgCyan.white)
})
