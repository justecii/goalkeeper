const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./variables.env" });
const Recipe = require("./models/Recipe");
const User = require("./models/User");
const Goal = require("./models/Goal");
const Asset = require("./models/Asset");
const Debt = require("./models/Debt");
const Subgoal = require("./models/Subgoal");

// Bring in graphQL Express middleware
const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

// create schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// connects to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

//   Initializes applications
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};
app.use(cors(corsOptions));

// Set up JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers["authorization"];
  if (token !== "null") {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch (err) {
      console.error(err);
    }
  }
  next();
});

// create GraphiQL application
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Connect schemas with GraphQL
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
      Recipe,
      User,
      Goal,
      Subgoal,
      Asset,
      Debt,
      currentUser
    }
  }))
);

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server Listening on Port ${PORT}`);
});
