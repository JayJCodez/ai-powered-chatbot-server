const express = require("express");
const cors = require("cors");
const pool = require("./database");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: false,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const port = 5100;

async function testDatabase() {
  try {
    await pool.query("SELECT NOW();");

    console.log(`Successfully connected to Chatbot Databases`);
  } catch (error) {
    console.error(
      `An error occured while attempting to test database connection: ${error}`
    );
  }
}

testDatabase();

app.use("/api", require("./routers/index"));

app.listen(port, (err) => {
  if (err) {
    console.log(`Error starting server: ${err}`);
  } else {
    console.log(`Server is running on http://localhost:${port}`);
  }
});
