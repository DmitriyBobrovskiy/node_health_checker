import 'reflect-metadata';
import { Container } from "typedi";
import { NetworksChecker } from "./services/networks-checker";

class Main {
    public static async start(): Promise<void> {
        const networksChecker = Container.get(NetworksChecker);
        await networksChecker.start()


    }
}

Main.start();
