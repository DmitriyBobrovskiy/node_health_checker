import { NetworkType } from "../config/network-type";
import { Service } from "typedi";

@Service()
export class NetworkUtils {
    getNetworkType(type: string) : NetworkType {
        switch (type.toLowerCase()) {
            case "ethereum":
                return NetworkType.Ethereum;
            case "near":
                return NetworkType.Near;
            default:
                throw new Error(`Network type is not supported - ${type}`);
        }
    }
}
