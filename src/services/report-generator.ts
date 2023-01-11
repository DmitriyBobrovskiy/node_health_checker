import { SlaLevel } from "../config/slaLevel";
import { Storage } from "./storage";
import { NetworkType } from "../config/network-type";
import { Report, ReportRow } from "../models/report";
import { Service } from "typedi";

@Service()
export class ReportGenerator {
    private storage: Storage;

    constructor(storage: Storage) {
        this.storage = storage;
    }

    async generate(): Promise<Report> {
        const data = await this.storage.getData();
        const map = new Map<[NetworkType, string], number>();

        for(let record of data) {
            if (map.has([record.networkType, record.node])) {
                let value = map.get([record.networkType, record.node]);
                if (!value) {
                    value = 0;
                }
                map.set([record.networkType, record.node], value + (record.result ? 0 : 1))
            }
        }
        const reportRows: ReportRow[] = [];
        map.forEach((value, key) => {
            reportRows.push({
                node: key[1],
                networkType: key[0],
                slaLevel: this.getSlaLevel(value)
            })
        });

        return {
            data: reportRows
        }
    }

    getSlaLevel(numberOfFails: number): SlaLevel {
        // can be put to config as well
        // very simplified SLA level calculation
        // let's imagine we check node every 7 minutes and 30 seconds
        // if there are 2 negative records in storage then it was down for 15 minutes
        // that's very rough and is done only for simplicity - I didn't want to worry with dates to calculate proper SLA
        // and I believe it wouldn't show any more knowledge of Node.js or web3 knowledge/related packages
        if (numberOfFails <= 2) return SlaLevel.Level1;
        if (numberOfFails <= 8) return SlaLevel.Level2;
        if (numberOfFails <= 24) return SlaLevel.Level3;
        if (numberOfFails <= 48) return SlaLevel.Level4;
        if (numberOfFails <= 96) return SlaLevel.Level5;
        return SlaLevel.None;
    }
}
