const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

module.exports = class BrendController {
  constructor() {}

  /**
   * @returns {Promise<void>}
   */
  CREATE_BREND = async (req, res, next) => {
    try {
      const { error } = validateCategory(req.body);
      if (error) return res.status(422).send(error.details[0].message);

      let { name, brend } = req.body;

      let isCategory = await prisma.brend.findUnique({
        where: { name },
      });

      if (isCategory)
        return res.status(400).json({
          message: "Bunday user mavjud",
        });

      let newCategory = await prisma.brend.create({
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

  GET_BREND = async (req, res, next) => {
    try {
      let brend = await prisma.brend.findMany();

      res.status(200).json({
        msg: "Ok",
        data: brend,
      });
    } catch (error) {
      next(error);
    }
  };

  UPDATE_BREND = async (req, res, next) => {
    try {
      const { error } = validateCategory(req.body);
      if (error) return res.status(422).send(error.details[0].message);

      let brend = await prisma.brend.findFirst({
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!brend)
        return res.status(404).json({
          msg: "Bunaqa id li kategoriya mavjud emas",
        });

      let duplicated_brend = await prisma.brend.findFirst({
        where: {
          id: { not: brend.id },
          AND: {
            phone: req.body.phone,
            OR: { name: req.body.name },
          },
        },
      });

      if (duplicated_brend)
        return res.status(422).json({
          msg: "Bunaqa telefon raqam yoki username bn allaqachon royhatdan otilgan",
        });

      if (!brend) {
        return res.status(404).json({
          msg: "User not found",
        });
      }

      let { name } = req.body;

      let updated_model = await prisma.brend.update({
        where: {
          id: brend.id,
        },
        data: {
          name,
        },
      });

      res.status(200).json({
        status: "OK",
        data: updated_model,
      });
    } catch (error) {
      next(error);
    }
  };

  DELETE_BREND = async (req, res, next) => {
    try {
      let brend = await prisma.brend.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      if (!brend) {
        return res.status(404).json({
          msg: "User not found",
        });
      }

      let deleted_category = await prisma.brend.delete({
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

function validateCategory(brend) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  return schema.validate(brend);
}
