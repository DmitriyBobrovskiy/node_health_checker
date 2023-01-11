import { Service } from "typedi";
import winston, { createLogger, format, transports } from "winston";
import { Logger } from "./logger";

const {printf, combine, colorize, timestamp, errors} = format;

@Service()
export class DevLogger implements Logger {

    private logger: winston.Logger;

    constructor() {
        const devLogFormat = printf(
            (log) =>
                `${log.timestamp} ${log.level}: ${
                    log.stack || typeof log.message === "object"
                        ? JSON.stringify(log.message)
                        : log.message
                }`
        );
        this.logger = createLogger({
                                       level: "debug",
                                       format: combine(
                                           colorize(),
                                           timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
                                           errors({stack: true}),
                                           devLogFormat
                                       ),
                                       transports: [new transports.Console()],
                                       exceptionHandlers: [new transports.Console()]
                                   });
    }

    info(message: string): void {
        this.logger.info(message);
    }

    debug(message: string): void {
        this.logger.debug(message);
    }

    warn(message: string): void {
        this.logger.warn(message);
    }

    error(message: string): void {
        this.logger.error(message);
    }
}
