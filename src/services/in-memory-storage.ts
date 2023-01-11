import { Storage } from "./storage";
import { NodeCheckResult } from "../models/node-check-result";
import { Service } from "typedi";

@Service()
export class InMemoryStorage implements Storage {
    private data: NodeCheckResult[] = [];

    public getData(): Promise<NodeCheckResult[]> {
        const data = this.data;
        // cleaning to simplify aggregation
        this.data = [];
        return Promise.resolve(data);
    }

    public save(record: NodeCheckResult): Promise<void> {
        this.data.push(record);
        return Promise.resolve();
    }
}


