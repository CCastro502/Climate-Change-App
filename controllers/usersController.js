const crypto = require("crypto");
const db = require("../models");

// Defining methods for the booksController
module.exports = {

  checkPassword: function (passwordHash, salt, password) {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let value = hash.digest('hex');

    console.log("Password Hash: ", passwordHash, "\nValue: ", value)
    if (passwordHash === value) {
      return true;
    } else {
      return false;
    }
  },
  findAll: function (req, res) {
    db.User
      .find({ email: req.params.email })
      .then(dbModel => {
        const { passwordHash, salt } = dbModel[0];
        let isPwCorrect = module.exports.checkPassword(passwordHash, salt, req.params.password)
        console.log(isPwCorrect);
        isPwCorrect ? res.json(dbModel) : res.status(422).json({ error: "password is not correct, or system is malfunctioning" });
      })
      .catch(err => res.status(422).json(err))
  },
  findOne: function (req, res) {
    db.User
      .findOne({ email: req.params.email })
      .then(dbModel => {
        res.json(dbModel.saved)
      })
  },
  find: function (req, res) {
    db.User
      .findOne({ email: req.params.email })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  addChart: function (req, res) {
    db.User
      .findOne({ email: req.params.email })
      .then(currentRow => {
        db.User.findOneAndUpdate({ email: req.params.email }, { saved: [...currentRow.saved, req.body] })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  },
  updateRow: function (req, res) {
    db.User
      .findOneAndUpdate({ email: req.params.email}, { saved: req.body })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
  }
};