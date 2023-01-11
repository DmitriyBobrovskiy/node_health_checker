import { NetworkType } from "../config/network-type";

export class NetworkUtils {
    getNetworkType(type: string) : NetworkType {
        switch (type) {
            case "ethereum":
                return NetworkType.Ethereum;
            case "near":
                return NetworkType.Near;
            default:
                throw new Error(`Network type is not supported - ${type}`);
        }
    }
}
