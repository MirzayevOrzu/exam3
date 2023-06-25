const express = require("express");
const Controller = require("../controllers/computer");

module.exports = class ComputerRoutes {
  path;
  router;
  controller;

  constructor() {
    this.path = "/computer";
    this.router = express.Router();
    this.controller = new Controller();

    this.initRoutes();
  }

  /** @returns {void} */
  initRoutes = () => {
    this.router.get("/", this.controller.CREATE);
  };
};
