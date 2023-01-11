import { NodeCheckResult } from "../models/node-check-result";

export interface Storage {
    save(record: NodeCheckResult): Promise<void>;
    getData(): Promise<NodeCheckResult[]>;
}

