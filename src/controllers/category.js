const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

module.exports = class WebController {
  constructor() {}

  /**
   * @returns {Promise<void>}
   */
  CREATE_CATEGORY = async (req, res, next) => {
    try {
      const { error } = validateCategory(req.body);
      if (error) return res.status(422).send(error.details[0].message);

      let { name } = req.body;

      let isCategory = await prisma.category.findUnique({
        where: { name },
      });

      if (isCategory)
        return res.status(400).json({
          message: "Bunday user mavjud",
        });

      let newCategory = await prisma.category.create({
        data: {
          name,
        },
      });

      res.status(200).json({
        data: newCategory,
        message: "Ok",
      });

      await next();
    } catch (error) {
      next(error);
    }
  };

  GET_CATEGORIES = async (req, res, next) => {
    try {
      let category = await prisma.category.findMany();

      res.status(200).json({
        msg: "Ok",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  };

  UPDATE_CATEGORY = async (req, res, next) => {
    try {
      const { error } = validateCategory(req.body);
      if (error) return res.status(422).send(error.details[0].message);

      let category = await prisma.category.findFirst({
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!category)
        return res.status(404).json({
          msg: "Bunaqa id li kategoriya mavjud emas",
        });

      let duplicated_category = await prisma.category.findFirst({
        where: {
          id: { not: category.id },
          AND: {
            phone: req.body.phone,
            OR: { name: req.body.name },
          },
        },
      });

      if (duplicated_category)
        return res.status(422).json({
          msg: "Bunaqa telefon raqam yoki username bn allaqachon royhatdan otilgan",
        });

      if (!category) {
        return res.status(404).json({
          msg: "User not found",
        });
      }

      let { name } = req.body;

      let updated_category = await prisma.category.update({
        where: {
          id: category.id,
        },
        data: {
          name,
        },
      });

      res.status(200).json({
        status: "OK",
        data: updated_category,
      });
    } catch (error) {
      next(error);
    }
  };

  DELETE_CATEGORY = async (req, res, next) => {
    try {
      let category = await prisma.category.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      if (!category) {
        return res.status(404).json({
          msg: "User not found",
        });
      }

      let deleted_category = await prisma.category.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });

      res.status(200).json({
        status: "ok",
        msg: "Deleted successfully",
        data: deleted_category,
      });
    } catch (error) {
      next(error);
    }
  };
};

function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  return schema.validate(category);
}
