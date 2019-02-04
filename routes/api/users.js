const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/books"
router.route("/")
    .post(usersController.create);

// Matches with "/api/books/:id"
router.route("/:email/:password")
  .get(usersController.findAll);

module.exports = router;
