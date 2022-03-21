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
        const msg = {
          ...logEvent,
          userAgent: navigator.userAgent,
          env: process.env.NODE_ENV,
          version: process.env.REACT_APP_VERSION,
        };

        // if (logEvent.level.value >= LOG_LEVEL.DEBUG) {
        fetch("/logs", {
          method: "post",
          body: JSON.stringify(msg),
        }).catch(logger.error);
        // }
      },
    },
  },
});
