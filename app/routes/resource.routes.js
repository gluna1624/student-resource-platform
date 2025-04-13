const authJwt = require("../middleware/authJwt");
const controller = require("../controllers/resource.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/resources", [authJwt.verifyToken], controller.create);
  app.get("/api/resources", controller.findAll);
  app.get("/api/resources/:id", controller.findOne);
  app.put("/api/resources/:id", [authJwt.verifyToken], controller.update);
  app.delete("/api/resources/:id", [authJwt.verifyToken], controller.delete);
  app.delete("/api/resources", [authJwt.verifyToken], controller.deleteAll);
};
