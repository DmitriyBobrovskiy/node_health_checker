export interface DataProvider {
    getLastBlockNumber(): Promise<number>;
    isSyncing(): Promise<boolean>;
}
