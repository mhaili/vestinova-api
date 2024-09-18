import express from "express";
import User from "./entities/User";
import sequelize from "./sequelize.config";
const initDb = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        await User.create({
            name: "John Doe",
            email: "johndoe@gmail.com",
        });
        const users = await User.findAll();
        console.log(users)
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

initDb()
