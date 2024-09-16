import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class RunService {
    private readonly TIMEOUT = 30000;

    async runCode(language: string, code: string): Promise<string> {
        let command: string;

        switch (language) {
            case 'python3':
                command = `python3 -c "${code.replace(/"/g, '\\"')}"`;
                break;
            case 'golang':
                command = `echo "${code.replace(/"/g, '\\"')}" | go run -`;
                break;
            case 'rust':
                command = `rustc -e "${code.replace(/"/g, '\\"')}"`;
                break;
            case 'node':
                command = `node -e "${code.replace(/"/g, '\\"')}"`;
                break;
            case 'php':
                command = `php -r "${code.replace(/"/g, '\\"')}"`;
                break;
            case 'julia':
                command = `julia -e "${code.replace(/"/g, '\\"')}"`;
                break;
            case 'typescript':
                command = `ts-node -e "${code.replace(/"/g, '\\"')}"`;
                break;
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
            return error.message || error
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
