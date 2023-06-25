const express = require("express");
const Controller = require("../controllers/brend");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

module.exports = class BrendRoutes {
  path;
  router;
  controller;
  mCategory;

  constructor() {
    this.path = "/brend";
    this.router = express.Router();
    this.controller = new Controller();

    this.mCategory = [auth, isAdmin];

    this.initRoutes();
  }

  /** @returns {void} */
  initRoutes = () => {
    this.router.post("/", this.mCategory, this.controller.CREATE_BREND);
    this.router.get("/", this.controller.GET_BREND);
    this.router.put("/:id", this.mCategory, this.controller.UPDATE_BREND);
    this.router.delete("/:id", this.mCategory, this.controller.DELETE_BREND);
  };
};
