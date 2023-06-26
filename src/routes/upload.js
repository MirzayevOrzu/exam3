const express = require("express");
const Controller = require("../controllers/upload");
const auth = require("../middleware/auth");
const isSuperAdmin = require("../middleware/isSuperAdmin");
const { upload } = require("../middleware/multer");

module.exports = class UploadRoutes {
  path;
  router;
  controller;
  mTeacher;

  constructor() {
    this.path = "/upload";
    this.router = express.Router();
    this.controller = new Controller();

    this.mTeacher = [auth, isSuperAdmin];

    this.initRoutes();
  }

  /**@returns {void} */
  initRoutes = () => {
    this.router.post(
      "/",
      this.mTeacher,
      upload.array("image"),
      this.controller.UPLOAD
    );
  };
};
