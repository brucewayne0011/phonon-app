import pino from "pino";

const LOG_LEVEL = {
  DEBUG: 20,
  INFO: 30,
  WARN: 40,
  ERROR: 50,
  CRITICAL: 60,
};

export const logger = pino({
  browser: {
    asObject: true,
    serialize: true,
    transmit: {
      send: function (level, logEvent) {
        if (logEvent.level.value >= LOG_LEVEL.ERROR) {
          // covers error and fatal
          fetch("/log", {
            method: "post",
            body: JSON.stringify(logEvent),
          }).catch(logger.error);
        }
      },
    },
  },
});
