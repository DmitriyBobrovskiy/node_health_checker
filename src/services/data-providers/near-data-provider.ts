import { DataProvider } from "../data-provider";
import * as nearAPI from "near-api-js";
import { ConnectConfig, Near } from "near-api-js";
import { NodeStatusResult } from "near-api-js/lib/providers/provider";
import { promiseWithTimeout } from "../../utils/promise-timeout";

export class NearDataProvider implements DataProvider {
    private connection: Near | undefined;

    constructor(private nodeUrl: string,
                private timeout: number,
                private networkId: string) {
    }

    public async getLastBlockNumber(): Promise<number> {
        const status = await this.getStatus();
        return status.sync_info.latest_block_height;
    }

    public async isSyncing(): Promise<boolean> {
        const status = await this.getStatus();
        return status.sync_info.syncing;
    }

    private async getStatus(): Promise<NodeStatusResult> {
        const config: ConnectConfig = {
            networkId: this.networkId,
            nodeUrl: this.nodeUrl
        };
        if (!this.connection) {
            this.connection = await promiseWithTimeout(nearAPI.connect(config), this.timeout,
                                                       new Error("Connection attempt timed out"));
        }
        const status = await promiseWithTimeout(this.connection.connection.provider.status(),
                                                this.timeout,
                                                new Error("Getting near status timed out"));
        return status;
    }
}
