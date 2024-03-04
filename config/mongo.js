"use strict";

import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        mongoose.connection.on("error", () => {
            console.log("MongoDB | cannont be connected to mongoDB")
            mongoose.disconnect();
        })
        mongoose.connection.on('connecting', () => {
            console.log('Mongoose | trying connection')
        })
        mongoose.connection.on('connected', () => {
            console.log('Mongoose | Connection succesfully with mongoDB')
        })
        mongoose.connection.on('open', () => {
            console.log('Mongoose | Connection succesfully with database')
        })
        mongoose.connection.on('reconnected', () => {
            console.log('Mongoose | trying to reconect to MongoDB')
        })
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose | disconnected')
        })

        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 40
        });     
    } catch (e) {
        console.log("The database connectiong failed, please try in another moment", err);
    }
};