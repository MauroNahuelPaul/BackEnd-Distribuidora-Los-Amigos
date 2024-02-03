import express from "express"
import session from "express-session";
import MongoStore from 'connect-mongo'
import { MONGO_DB_NAME, MONGO_URI, PORT, SESSION_SECRET_KEY } from "./config/config.js"
import mongoose from "mongoose"

import productRouter from "./routers/product.router.js"

const app = express()
app.use(express.json());

try {
    //BD Config
    await mongoose.connect(MONGO_URI + MONGO_DB_NAME)
    app.use(session({
        store: MongoStore.create({
            mongoUrl: MONGO_URI,
            dbName: MONGO_DB_NAME,
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        }),
        secret: SESSION_SECRET_KEY,
        resave: true,
        saveUninitialized: true
    }))
    //Initialize server
    const serverHttp = app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
    //Routers
    app.use("/api/products", productRouter);


} catch (err) {
    console.log(err)
}
