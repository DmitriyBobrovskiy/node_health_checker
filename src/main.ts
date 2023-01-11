import 'reflect-metadata';
import { Container } from "typedi";
import { NetworksChecker } from "./services/networks-checker";
import { InMemoryStorage } from "./services/in-memory-storage";
import { config } from "node-config-ts";

class Main {
    public static async start(): Promise<void> {
        Container.set("storage", new InMemoryStorage());
        Container.set("config", config);
        const networksChecker = Container.get(NetworksChecker);
        await networksChecker.start()


    }
}

Main.start();
