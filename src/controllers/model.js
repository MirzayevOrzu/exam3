const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

module.exports = class ModelController {
  constructor() {}

  /**
   * @returns {Promise<void>}
   */
  CREATE_MODEL = async (req, res, next) => {
    try {
      const { error } = validateCategory(req.body);
      if (error) return res.status(422).send(error.details[0].message);

      let { name, brend_id } = req.body;

      let isCategory = await prisma.model.findFirst({
        where: { name },
      });

      if (isCategory)
        return res.status(400).json({
          message: "Bunday user mavjud",
        });

      let newModel = await prisma.model.create({
        data: {
          name,
          brend: {
            connect: {
              id: brend_id
            },
          },
        },
      });

      res.status(200).json({
        data: newModel,
        message: "Ok",
      });

      await next();
    } catch (error) {
      next(error);
    }
  };

  GET_MODEL = async (req, res, next) => {
    try {
      let model = await prisma.model.findMany();

      res.status(200).json({
        msg: "Ok",
        data: model,
      });
    } catch (error) {
      next(error);
    }
  };

  UPDATE_MODEL = async (req, res, next) => {
    try {
      const { error } = validateCategory(req.body);
      if (error) return res.status(422).send(error.details[0].message);

      let model = await prisma.model.findFirst({
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!model)
        return res.status(404).json({
          msg: "Bunaqa id li kategoriya mavjud emas",
        });

      let duplicated_model = await prisma.model.findFirst({
        where: {
          id: { not: model.id },
          AND: {
            phone: req.body.phone,
            OR: { name: req.body.name },
          },
        },
      });

      if (duplicated_model)
        return res.status(422).json({
          msg: "Bunaqa telefon raqam yoki username bn allaqachon royhatdan otilgan",
        });

      if (!model) {
        return res.status(404).json({
          msg: "User not found",
        });
      }

      let { name } = req.body;

      let updated_model = await prisma.model.update({
        where: {
          id: model.id,
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

  DELETE_MODEL = async (req, res, next) => {
    try {
      let model = await prisma.model.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      if (!model) {
        return res.status(404).json({
          msg: "User not found",
        });
      }

      let deleted_category = await prisma.model.delete({
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

function validateCategory(model) {
  const schema = Joi.object({
    name: Joi.string().required(),
    brend_id: Joi.number().required(),
  });

  return schema.validate(model);
}
