const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

module.exports = class ComputerController {
  constructor() {}

  /**
   * @returns {Promise<void>}
   */
  CREATE_COMPUTER = async (req, res, next) => {
    try {
      const { error } = validateCategory(req.body);
      if (error) return res.status(422).send(error.details[0].message);

      let { name, brend_id, model_id, category_id, image, description, price } =
        req.body;

      let isCategory = await prisma.computer.findFirst({
        where: { name },
      });

      if (isCategory)
        return res.status(400).json({
          message: "Bunday computer mavjud",
        });

      let newCategory = await prisma.computer.create({
        data: {
          name,
          description,
          price,
          image,
          brend: {
            connect: {
              id: brend_id,
            },
          },
          model: {
            connect: {
              id: model_id,
            },
          },
          category: {
            connect: {
              id: category_id,
            },
          },
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

  GET_ALL_COMPUTERS = async (req, res, next) => {
    try {
      let computer = await prisma.computer.findMany();

      res.status(200).json({
        msg: "Ok",
        data: computer,
      });
    } catch (error) {
      next(error);
    }
  };

  UPDATE_COMPUTER = async (req, res, next) => {
    try {
      const { error } = validateCategory(req.body);
      if (error) return res.status(422).send(error.details[0].message);

      let computer = await prisma.computer.findFirst({
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!computer)
        return res.status(404).json({
          msg: "Bunaqa id li komputer mavjud emas",
        });

      let duplicated_category = await prisma.computer.findFirst({
        where: {
          id: { not: computer.id },
          AND: {
            OR: { name: req.body.name },
          },
        },
      });

      if (duplicated_category)
        return res.status(422).json({
          msg: "Bunaqa telefon raqam yoki username bn allaqachon royhatdan otilgan",
        });

      let { name, brend_id, model_id, category_id, image, description, price } =
        req.body;

      let updated_category = await prisma.computer.update({
        where: {
          id: computer.id,
        },
        data: {
          name,
          brend: {
            connect: {
              id: brend_id,
            },
          },
          model: {
            connect: {
              id: model_id,
            },
          },
          category: {
            connect: {
              id: category_id,
            },
          },
          image,
          description,
          price,
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

  DELETE_COMPUTER = async (req, res, next) => {
    try {
      let computer = await prisma.computer.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      if (!computer) {
        return res.status(404).json({
          msg: "User not found",
        });
      }

      let deleted_category = await prisma.computer.delete({
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

function validateCategory(computer) {
  const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string(),
    brend_id: Joi.number().required(),
    model_id: Joi.number().required(),
    category_id: Joi.number().required(),
  });

  return schema.validate(computer);
}
