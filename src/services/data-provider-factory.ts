import { NetworkType } from "../config/network-type";
import { DataProvider } from "./data-provider";
import { EthereumDataProvider } from "./data-providers/ethereum-data-provider";
import { NearDataProvider } from "./data-providers/near-data-provider";
import { Service } from "typedi";

@Service()
export class DataProviderFactory {
    // those arguments can be combined into single model
    produce(networkType: NetworkType, nodeUrl: string, timeout: number, networkId?: string): DataProvider {
        switch (networkType) {
            case NetworkType.Ethereum:
                return new EthereumDataProvider(nodeUrl, timeout);
            case NetworkType.Near:
                return new NearDataProvider(nodeUrl, timeout, <string>networkId);
            default:
                throw new Error(`Network type ${networkType} is not supported`);
        }
    }
}
