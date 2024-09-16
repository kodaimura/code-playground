import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import * as path from 'path';
import { randomBytes } from 'crypto';

@Injectable()
export class RunService {
    private readonly TIMEOUT = 30000;
    private readonly TEMP_DIR = path.join(__dirname, 'temp');

    constructor() {
        fs.mkdir(this.TEMP_DIR, { recursive: true }).catch(console.error);
    }

    async runCode(language: string, code: string): Promise<string> {
        let command: string;

        switch (language) {
            case 'python3':
                command = `python3 -c "${code}"`;
                break;
            case 'rust':
                command = `rustc -e "${code}"`;
                break;
            case 'node':
                command = `node -e "${code}"`;
                break;
            case 'php':
                command = `php -r "${code}"`;
                break;
            case 'julia':
                command = `julia -e "${code}"`;
                break;
            case 'typescript':
                command = `ts-node -e "${code}"`;
                break;
            case 'golang':
                return await this.runGolangCode(code);
            default:
                throw new Error('Unsupported language');
        }

        try {
            const { stdout, stderr } = await this.execWithTimeout(command, this.TIMEOUT);
            if (stderr) {
                throw new Error(stderr);
            }
            return stdout;
        } catch (error) {
            return error.message || error;
        }
    }

    private async runGolangCode(code: string): Promise<string> {
        let decodedCode = code
            .replace(/\\"/g, '"')
            .replace(/\\\\/g, '\\');

        const fileName = `${randomBytes(8).toString('hex')}.go`;
        const tempFileName = path.join(this.TEMP_DIR, fileName);
        await fs.writeFile(tempFileName, decodedCode);

        try {
            const command = `go run ${tempFileName}`;
            const { stdout, stderr } = await this.execWithTimeout(command, this.TIMEOUT);
            if (stderr) {
                throw new Error(stderr);
            }
            return stdout;
        } catch (error) {
            return error.message || error;
        } finally {
            await fs.unlink(tempFileName).catch(console.error);
        }
    }

    private async execWithTimeout(command: string, timeout: number): Promise<{ stdout: string; stderr: string }> {
        return new Promise((resolve, reject) => {
            const child = exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ stdout, stderr });
                }
            });

            setTimeout(() => {
                child.kill();
                reject(new Error('Execution timed out'));
            }, timeout);
        });
    }
}
