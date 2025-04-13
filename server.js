const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/resource.routes")(app);

// database
const db = require("./app/models");

// 🔧 ⬇️ This now preserves your data
db.sequelize.sync().then(() => {
  console.log("Synced db.");
  initial(); // still seeds roles if they don't exist
});

// function to seed roles (will be skipped if already exists)
function initial() {
  db.role.findAll().then(roles => {
    if (roles.length === 0) {
      db.role.create({ id: 1, name: "user" });
      db.role.create({ id: 2, name: "admin" });
      console.log("Seeded roles: user, admin");
    }
  });
}

// set port and listen
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
