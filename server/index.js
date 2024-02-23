const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const cors = require("cors");
const authenticateUser = require("./middleware/authenticateUser");
const dotenv = require("dotenv");
dotenv.config();

// TypeDefs and resolvers
const userTypeDefs = require("./schema/userSchema");
const problemTypeDefs = require("./schema/problemSchema");
const submissionTypeDefs = require("./schema/submissionSchema");
const userResolvers = require("./resolvers/userResolver");
const problemResolvers = require("./resolvers/problemResolver");
const submissionResolvers = require("./resolvers/submissionResolver");

// Connect to MongoDB
try {
  mongoose.connect(process.env.MONGODB_URI);
  console.log("DB connected");
} catch (err) {
  console.log(err);
}

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authenticateUser); // Apply middleware to /api route

const server = new ApolloServer({
  typeDefs: [userTypeDefs, problemTypeDefs, submissionTypeDefs],
  resolvers: [userResolvers, problemResolvers, submissionResolvers],
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(
      `Server running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer().catch((err) => console.error(err));
