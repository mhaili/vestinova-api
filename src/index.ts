import express from "express";
import cors from "cors";
import sequelize from "../sequelize.config";
import router from "./routes";
import seedCategories from "../seedCategories";

const initDb = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        // await seedCategories();
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

initDb()

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(router);