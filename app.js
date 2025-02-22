
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://user:urbanauta@cluster0.9nky6.mongodb.net/ADHDData?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
    try {
      // Connect the client to the server
      await client.connect();
      console.log("Connected to MongoDB!");
  
      const database = client.db("ADHDData");
      const usersCollection = database.collection("Users");
  
      // Create a new user document
      const newUser = {
        name: "John Doe",
        age: 30,
        email: "johndoe@example.com"
      };
  
      // Insert the user document
      const result = await usersCollection.insertOne(newUser);
      console.log(`New user created with the following id: ${result.insertedId}`);
  
      // Find all users in the collection
      const users = await usersCollection.find().toArray();
      console.log("Users in the collection:");
      console.log(users);
  
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Ustawienia Mongoose
mongoose.connect('mongodb://user:urbanauta@cluster0.mongodb.net/ADHDData?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Serwer
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});

  
  run().catch(console.dir);