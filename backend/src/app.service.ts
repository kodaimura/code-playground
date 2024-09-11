import { Injectable } from '@nestjs/common';
import { exec as execCallback } from 'child_process';
import { promisify } from 'util';
import { promises as fsPromises } from 'fs';
import { join } from 'path';

const exec = promisify(execCallback);

@Injectable()
export class AppService {
    getFileExtension(lang: string): string {
        const fileExtensions = {
            "python": "py",
            "ruby": "rb",
        };

        return fileExtensions[lang];
    }

    getRunCommand(lang: string): string {
        const runCommands = {
            "python": "python",
            "ruby": "ruby",
        };

        return runCommands[lang];
    }

    async run(lang: string, version: string, code: string): Promise<string> {
        const fName = String(Math.random());
        const fEx = this.getFileExtension(lang);
        const runCommand = this.getRunCommand(lang);
        const dirPath = join(process.cwd(), fName);

        try {
            await fsPromises.mkdir(dirPath);
            const filePath = join(dirPath, `${fName}.${fEx}`);
            await fsPromises.writeFile(filePath, code);

            let timeout: NodeJS.Timeout;
            const containerRunPromise = new Promise<string>((resolve, reject) => {
                timeout = setTimeout(() => {
                    exec(`docker stop ${fName}`).catch(reject);
                    resolve("Error: Timed Out");
                }, 20000);

                exec(`docker run --rm --name ${fName} -v "$PWD":/src -w /src ${lang}:${version} ${runCommand} ${filePath}`)
                    .then(({ stdout, stderr }) => {
                        clearTimeout(timeout);
                        if (stderr) {
                            resolve(stderr);
                        } else {
                            resolve(stdout);
                        }
                    })
                    .catch(reject);
            });

            return await containerRunPromise;
        } catch (err) {
            return `Error: ${err.message}`;
        } finally {
            // Cleanup
            await fsPromises.rm(dirPath, { recursive: true, force: true }).catch(console.error);
        }
    }
}
