const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Joi = require("joi");

module.exports = class UploadController {
  /**
   * @returns {Promise<void>}
   */

  UPLOAD = async (req, res, next) => {
    try {
      if (req.files.length < 1) {
        return res.status(400).send({ message: "Please upload files!" });
      }

      return res.status(201).send({
        image: req.files[0].filename,
        message: "Image uploaded successfully",
      });
    } catch (error) {
      next(error);
    }
  };
};
