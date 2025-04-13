const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  const router = require("express").Router();

  router.post("/signup", [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], controller.signup);
  router.post("/signin", controller.signin);

  // ✅ NEW: Authenticated user profile
  router.get("/profile", [authJwt.verifyToken], controller.currentUser);

  app.use("/api/auth", router);
};


