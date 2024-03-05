import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import Cors from "cors";

//App config m69Rk1A7c2udBc7j
const app = express();
const port = 4000;
// process.env.PORT ||

console.log("MONGO_PASSWORD:", process.env.MONGO_PASSWORD);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);

// const connection_url = `mongodb+srv://admin:${password}@cluster0.esauzrd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const connection_url =
  "mongodb+srv://admin:" +
  password +
  "@cluster0.esauzrd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const connection_url =
//   "mongodb+srv://admin:m69Rk1A7c2udBc7j@cluster0.esauzrd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Define the base connection URL for MongoDB
// const baseConnectionUrl =
//   "mongodb+srv://admin:m69Rk1A7c2udBc7j@cluster0.esauzrd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Construct the final connection URL based on the environment
// const connection_url =
//   process.env.NODE_ENV === "production"
//     ? baseConnectionUrl
//     : `mongodb+srv://admin:${password}@cluster0.esauzrd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

//Middleware
app.use(express.json());
app.use(Cors());

///DB config - original
// console.log("Connection URL:", connection_url);
// mongoose.connect(connection_url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

//DB config
// Async function to connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(connection_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// Call the async function to connect to MongoDB
connectToDatabase();

//API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello World"));

app.post("/engage/cards", async (req, res) => {
  try {
    const dbCard = req.body;
    const data = await Cards.create(dbCard);
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/engage/cards", async (req, res) => {
  try {
    const data = await Cards.find().exec();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});
//Listener
app.listen(port, () => console.log(`Listening on localhost:${port}`));
