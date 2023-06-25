const express = require("express");
const Controller = require("../controllers/model");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

module.exports = class ModelRoutes {
  path;
  router;
  controller;
  mCategory;

  constructor() {
    this.path = "/model";
    this.router = express.Router();
    this.controller = new Controller();

    this.mCategory = [auth, isAdmin];

    this.initRoutes();
  }

  /** @returns {void} */
  initRoutes = () => {
    this.router.post("/", this.mCategory, this.controller.CREATE_MODEL);
    this.router.get("/", this.controller.GET_MODEL);
    this.router.put("/:id", this.mCategory, this.controller.UPDATE_MODEL);
    this.router.delete("/:id", this.mCategory, this.controller.DELETE_MODEL);
  };
};
