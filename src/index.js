const http = require("http");
const cors = require("cors");
const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const config = require("./config/index");
const logger = require("./utils/logger");
const path = require("path");

module.exports = class App {
  #app;
  #env;

  constructor(routes) {
    this.#app = express();
    this.#env = config;

    this.#initMiddleware();
    this.#initRoutes(routes);
  }

  /** @returns {void} */
  #initMiddleware = () => {
    this.#app.use(
      cors({
        origin: this.#corsOptions,
        credentials: this.#env.CREDENTIALS === "true",
      })
    );

    this.#app.use(
      "/cdn",
      express.static(path.resolve(process.cwd(), "public", "cdn"))
    );
    this.#app.use(compression());
    this.#app.use(bodyParser.json());
    this.#app.use(bodyParser.urlencoded({ extended: true }));

    if (this.#env.NODE_ENV !== "production") {
      logger.info("Middleware's loaded!");
    }
  };

  /** @returns {void} */
  #initRoutes = (routes) => {
    routes.map(({ path, router }) => {
      this.#app.use(path, router);
    });

    if (this.#env.NODE_ENV !== "production") {
      logger.info("Routes loaded!");
    }
  };

  /** @returns {express.Application} */
  get server() {
    return this.#app;
  }

  /** @returns {void} */
  run = () => {
    http.createServer(this.#app).listen(this.#env.PORT, () => {
      console.info("╭────────────────────────────────╮");
      console.info("|                                |");
      console.info(`|   App running on "${this.#env.PORT}" port   |`);
      console.info(`|  visit: http://127.0.0.1:${this.#env.PORT}  |`);
      console.info("|                                |");
      console.info("╰────────────────────────────────╯");
    });
  };

  /**
   * @param {string | undefined} origin
   * @param {(err: Error | undefined, origin: string | boolean | undefined) => void} ctx
   *
   * @returns {cors.CorsOptions['origin']}
   */
  #corsOptions = (origin, ctx) => {
    const whiteList = this.#env.ORIGIN.split(" ");

    if (whiteList.indexOf(origin) !== -1 || !origin) ctx(null, true);
    else ctx(new Error("Not allowed by CORS"));
  };
};
