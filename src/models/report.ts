import { NetworkType } from "../config/network-type";
import { SlaLevel } from "../config/slaLevel";

export interface Report {
    data: ReportRow[];
}

export interface ReportRow {
    networkType: NetworkType;
    node: string;
    slaLevel: SlaLevel;
}
