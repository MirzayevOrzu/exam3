const express = require("express");
const Controller = require("../controllers/category");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

module.exports = class CategoryRoutes {
  path;
  router;
  controller;
  mCategory;

  constructor() {
    this.path = "/category";
    this.router = express.Router();
    this.controller = new Controller();

    this.mCategory = [auth, isAdmin];

    this.initRoutes();
  }

  /** @returns {void} */
  initRoutes = () => {
    this.router.post("/", this.mCategory, this.controller.CREATE_CATEGORY);
    this.router.get("/", this.controller.GET_CATEGORIES);
    this.router.put("/:id", this.mCategory, this.controller.UPDATE_CATEGORY);
    this.router.delete("/:id", this.mCategory, this.controller.DELETE_CATEGORY);
  };
};
