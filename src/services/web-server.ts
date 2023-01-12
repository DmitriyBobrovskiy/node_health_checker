import { Service } from "typedi";
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { ReportGenerator } from "./report-generator";
import { Logger } from "../utils/logger";
import { NetworkType } from "../config/network-type";
import { SlaLevel } from "../config/slaLevel";

@Service()
export class WebServer {
    constructor(private reportGenerator: ReportGenerator,
                private logger: Logger) {
    }

    start(): void {
        const server = createServer(async (request: IncomingMessage, response: ServerResponse) => {
            this.logger.debug("Received request");
            const report = await this.reportGenerator.generate();

            const rows = [];
            let counter = 1;
            for (const line of report.data) {
                rows.push(`
                    <tr>
                        <th scope="row">${counter}</th>
                        <td>${NetworkType[line.networkType]}</td>
                        <td>${line.node}</td>
                        <td>${SlaLevel[line.slaLevel]}</td>
                    </tr>
                `);
                counter++;
            }
            response.writeHead(200);

            response.end(this.getHtml(rows));
        });
        const host = "localhost";
        const port = 80;
        server.listen(port, host, () => {
            this.logger.info(`Server is running on http://${host}:${port}`);
        });
    }

    private getHtml(rows: string[]): string {
        return `
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Nodes status</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
</head>
<body>
    <div class="row d-flex justify-content-center mt-5">
        <div class="col-md-6">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Network</th>
                        <th scope="col">Node</th>
                        <th scope="col">Level</th>
                    </tr>
                </thead>
                <tbody>
                ${rows.join("")}
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>`;
    }
}
