import { NetworkType } from "../config/network-type";

export interface NodeCheckResult {
    networkType: NetworkType;
    node: string;
    result: boolean;
}
