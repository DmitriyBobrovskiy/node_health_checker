import { NodeCheckResult } from "../models/node-check-result";
import { NetworkType } from "../config/network-type";
import { IConfig, Network } from "node-config-ts";
import { DataProviderFactory } from "./data-provider-factory";
import { Inject, Service } from "typedi";
import { Logger } from "../utils/logger";

@Service()
export class NodeChecker {
    // entire config is not needed here, can be simplified
    constructor(@Inject("config")
                private config: IConfig,
                private dataProviderFactory: DataProviderFactory,
                private logger: Logger) {
    }

    async checkNodes(networkType: NetworkType, network: Network): Promise<NodeCheckResult[]> {
        this.logger.info(`Starting checking nodes for ${NetworkType[networkType]}`);
        this.logger.debug(`Getting trusted node for ${NetworkType[networkType]}`);

        const trustedProvider = this.dataProviderFactory.produce(networkType, network.trustedNode,
                                                                 this.config.timeout,
                                                                 network.networkId);
        this.logger.debug(`Getting last block of trusted node for ${NetworkType[networkType]}`);
        const trustedLastBlock = await trustedProvider.getLastBlockNumber();
        // TODO: probably we should check here if trusted node is syncing

        const result: NodeCheckResult[] = [];
        for (let node of network.nodes) {
            this.logger.debug(`Checking node ${node} of ${NetworkType[networkType]}`);
            const provider = this.dataProviderFactory.produce(networkType, node,
                                                              this.config.timeout,
                                                              network.networkId);
            const lastBlock = await provider.getLastBlockNumber();
            const difference = trustedLastBlock - lastBlock;
            const isSyncing = await provider.isSyncing();
            this.logger.debug(`Check of ${node} node is finished for ${NetworkType[networkType]}`);
            result.push({
                            node: node,
                            result: this.getResult(difference, this.config.maxBlockDifference,
                                                   isSyncing),
                            networkType: networkType
                        });
        }
        this.logger.info(`Checking nodes complete for ${networkType}`);
        return result;
    }

    private getResult(difference: number, maxDifference: number, isSyncing: boolean): boolean {
        if (difference > maxDifference) {
            return false;
        }
        if (isSyncing) {
            return false;
        }
        return true;
    }
}
