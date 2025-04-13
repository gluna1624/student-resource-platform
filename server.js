require("dotenv").config(); // ✅ Load .env config

const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000" // ✅ React frontend
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// Routes
require("./app/routes/auth.routes")(app);
require("./app/routes/resource.routes")(app);

// Database setup
const db = require("./app/models");
db.sequelize.sync().then(() => {
  console.log("Synced db.");
  initial();
});

function initial() {
  db.role.findAll().then((roles) => {
    if (roles.length === 0) {
      db.role.create({ id: 1, name: "user" });
      db.role.create({ id: 2, name: "admin" });
      console.log("Seeded roles: user, admin");
    }
  });
}

// Dynamic port setup
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
