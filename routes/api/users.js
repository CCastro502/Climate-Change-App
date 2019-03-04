const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router.route("/")
  .post(usersController.create);
// Matches with "/api/users/save/:email"
router.route("/save/:email")
  .post(usersController.addChart);
router.route("/update/:email")
  .get(usersController.find)
  .post(usersController.updateRow);
// Matches with "/api/users/:email"
router.route("/:email")
  .get(usersController.findOne);
// Matches with "/api/users/update/:email"

// Matches with "/api/users/:email/:password"
router.route("/:email/:password")
  .get(usersController.findAll);



module.exports = router;
