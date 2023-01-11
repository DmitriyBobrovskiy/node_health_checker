import 'reflect-metadata';
import { Container } from "typedi";
import { NetworksChecker } from "./services/networks-checker";
import { InMemoryStorage } from "./services/in-memory-storage";
import { config } from "node-config-ts";
import { WebServer } from "./services/web-server";

class Main {
    public static async start(): Promise<void> {
        Container.set("storage", new InMemoryStorage());
        Container.set("config", config);

        const webServer = Container.get(WebServer);
        webServer.start();
        const networksChecker = Container.get(NetworksChecker);
        await networksChecker.start();
    }
}

Main.start();
