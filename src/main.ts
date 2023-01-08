import Web3 from "web3";
import { Eth } from "web3-eth";
import * as solanaWeb3 from '@solana/web3.js';
import { Connection } from "@solana/web3.js";
import * as nearAPI from "near-api-js";
import { ConnectConfig } from "near-api-js";

class Main {
    public static async start(): Promise<void> {

        const provider = this.getProvider("https://mainnet.infura.io/v3/41dc58193ba14b0e9e677c17b34e98a9");
        const lastBlock = await this.getLastBlockNumber(provider);
        const sync = await provider.isSyncing();
        console.log(sync);

        const trustedProvider = this.getProvider("https://eth.llamarpc.com");
        const trustedLastBlock = await this.getLastBlockNumber(trustedProvider);

        console.log(trustedLastBlock - lastBlock);

        const connection = new Connection("https://api.testnet.solana.com");
        const block = await connection.getBlockHeight();
        console.log(block);

        const config: ConnectConfig = {
            networkId: "mainnet",
            nodeUrl: "https://rpc.mainnet.near.org"
        };
        const nearConnection = await nearAPI.connect(config);
        const status = await nearConnection.connection.provider.status();
        const nearBlock = status.sync_info.latest_block_height;
        const nearSync = status.sync_info.syncing;

    }

    static getProvider(url: string) : Eth {
        let web3 = new Web3(new Web3.providers.HttpProvider(url, { timeout: 60000 }));
        return web3.eth;
    }

    static async getLastBlockNumber(eth: Eth) : Promise<number> {
        return eth.getBlockNumber()
    }
}

Main.start();
