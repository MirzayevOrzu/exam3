module.exports = class ComputerController {
  constructor() {}

  /**
   * @returns {Promise<void>}
   */
  CREATE = async (req, res, next) => {
    res.json({
      status: false,
      message: "true",
    });
  };
};
