import { DataProvider } from "../data-provider";
import { Eth } from "web3-eth";
import Web3 from "web3";
import { Service } from "typedi";

@Service()
export class EthereumDataProvider implements DataProvider {
    private provider: Eth;

    constructor(nodeUrl: string, timeout: number) {
        const web3 = new Web3(new Web3.providers.HttpProvider(nodeUrl, {timeout: timeout}));
        this.provider = web3.eth;
    }

    public async getLastBlockNumber(): Promise<number> {
        const lastBlock = await this.provider.getBlockNumber();
        return lastBlock;
    }

    public async isSyncing(): Promise<boolean> {
        const isSyncing = await this.provider.isSyncing();
        return isSyncing != false;
    }

}
