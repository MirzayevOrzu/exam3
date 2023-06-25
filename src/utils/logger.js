const fs = require("fs");
const path = require("path");
const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");

const { existsSync, mkdirSync } = fs;

const logDir = path.join(process.cwd(), "logs");
const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `[${timestamp}] [${level}] ${message}`;
});

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

module.exports = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize({
      all: false,
    }),
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),

  transports: [
    // Debug log settings
    new winstonDaily({
      level: "debug",
      datePattern: "YYYY-MM-DD",
      dirname: `${logDir}/debug`,
      filename: "%DATE%.log",
    }),
    // Error log settings
    new winstonDaily({
      level: "debug",
      datePattern: "YYYY-MM-DD",
      dirname: `${logDir}/errors`,
      filename: "%DATE%.log",
      handleExceptions: true,
      handleRejections: true,
    }),

    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.colorize()
      ),
    }),
  ],
});
