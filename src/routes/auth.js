const express = require("express");
const Controller = require("../controllers/auth");
const auth = require("../middleware/auth");

module.exports = class AuthRoutes {
  path;
  router;
  controller;

  constructor() {
    this.path = "/auth";
    this.router = express.Router();
    this.controller = new Controller();

    this.initRoutes();
  }

  /** @returns {void} */
  initRoutes = () => {
    this.router.post("/login", this.controller.LOGIN);
    this.router.get("/me", auth, this.controller.GETME);
  };
};
