import { IConfig } from "node-config-ts";
import { NetworkUtils } from "../utils/network-utils";
import { DataProviderFactory } from "./data-provider-factory";
import { Storage } from "./storage";
import { NodeChecker } from "./node-checker";
import { Inject, Service } from "typedi";
import { Logger } from "../utils/logger";

@Service()
export class NetworksChecker {

    constructor(@Inject("config")
                private config: IConfig,
                private networkUtils: NetworkUtils,
                private nodeCheckerFactory: DataProviderFactory,
                private logger: Logger,
                @Inject("storage")
                private storage: Storage,
                private nodeChecker: NodeChecker) {
    }

    async start(): Promise<void> {
        this.logger.debug("Starting networks check");
        const networks = this.config.networks;
        for (let network of networks) {
            this.logger.info(`Getting network type for ${network.type}`);
            const networkType = this.networkUtils.getNetworkType(network.type);
            this.logger.info(`Checking nodes for ${network.type}`);
            const result = await this.nodeChecker.checkNodes(networkType, network);
            this.logger.info(`Nodes check complete for ${network.type}`);
            this.logger.info(`Saving results for ${network.type}`);
            for (const value of result) {
                await this.storage.save(value);
            }
            this.logger.info(`Network check complete for  ${network.type}`);
        }

        const interval = this.calculateInterval();
        this.logger.debug(`Setting up new task for node check in ${interval}ms`);
        setTimeout(async () => {
            return await this.start();
        }, interval);
    }

    private calculateInterval(): number {
        // if we want here anything more complex that this line,
        // then this should be put to separate service
        return this.config.interval.period * Math.random();
    }
}
