const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router.route("/")
  .post(usersController.create);

// Matches with "/api/users/:email/:password"
router.route("/:email/:password")
  .get(usersController.findAll);



module.exports = router;
