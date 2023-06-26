const express = require("express");
const Controller = require("../controllers/computer");
const auth = require("../middleware/auth");
const isSuperAdmin = require("../middleware/isSuperAdmin");

module.exports = class ComputerRoutes {
  path;
  router;
  controller;
  mComputer;

  constructor() {
    this.path = "/computer";
    this.router = express.Router();
    this.controller = new Controller();

    this.mComputer = [auth, isSuperAdmin];

    this.initRoutes();
  }

  /** @returns {void} */
  initRoutes = () => {
    this.router.post("/", this.mComputer, this.controller.CREATE_COMPUTER);
    this.router.get("/", this.controller.GET_ALL_COMPUTERS);
    this.router.get("/:id", this.controller.GET_COMPUTER);
    this.router.put("/:id", this.mComputer, this.controller.UPDATE_COMPUTER);
    this.router.delete("/:id", this.mComputer, this.controller.DELETE_COMPUTER);
  };
};
