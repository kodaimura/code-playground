import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';

@Injectable()
export class RunService {
    private readonly TIMEOUT = 30000; // 30秒
    private execAsync = promisify(exec); // 非同期で exec を使うためのラップ

    async runCode(language: string, code: string): Promise<string> {
        let command: string;

        switch (language) {
            case 'python3':
                command = `python3 -c "${code.replace(/"/g, '\\"')}"`; // コード内の " をエスケープ
                break;
            case 'go':
                command = `echo "${code.replace(/"/g, '\\"')}" | go run -`; // 標準入力から Go のコードを実行
                break;
            case 'rust':
                command = `rustc -e "${code.replace(/"/g, '\\"')}"`; // Rust を直接実行
                break;
            case 'node':
                command = `node -e "${code.replace(/"/g, '\\"')}"`; // Node.js で直接実行
                break;
            case 'php':
                command = `php -r "${code.replace(/"/g, '\\"')}"`; // PHP で直接実行
                break;
            case 'julia':
                command = `julia -e "${code.replace(/"/g, '\\"')}"`; // Julia で直接実行
                break;
            case 'typescript':
                // TypeScript コードを直接コンパイルして実行
                command = `ts-node -e "${code.replace(/"/g, '\\"')}"`;
                break;
            default:
                throw new Error('Unsupported language');
        }

        try {
            // コマンドをタイムアウト付きで実行
            const { stdout, stderr } = await this.execWithTimeout(command, this.TIMEOUT);
            if (stderr) {
                throw new Error(stderr);
            }
            return stdout;
        } catch (error) {
            throw new Error(`Execution error: ${error.message}`);
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

            // タイムアウト処理
            setTimeout(() => {
                child.kill(); // タイムアウト時にプロセスを強制終了
                reject(new Error('Execution timed out'));
            }, timeout);
        });
    }
}
