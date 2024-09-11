import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import {
    pythonEx,
    rubyEx,
    javaEx,
    racketEx,
    nodejsEx,
    typescriptEx,
    golangEx,
    rustEx,
    cEx,
    cppEx
} from '../constants';

@Injectable()
export class RunService {
    private readonly languageConfig = {
        python: { 
            ex: pythonEx, 
            image: 'python', 
            compile: '', 
            run: (fileName: string) => `python ${fileName}/${fileName}.${pythonEx}` 
        },
        ruby: { 
            ex: rubyEx, 
            image: 'ruby', 
            compile: '', 
            run: (fileName: string) => `ruby ${fileName}/${fileName}.${rubyEx}` 
        },
        java: { 
            ex: javaEx, 
            image: 'openjdk', 
            compile: (fileName: string) => `javac ${fileName}/${fileName}.${javaEx}`, 
            run: (fileName: string) => `java -cp ${fileName} Main` 
        },
        racket: { 
            ex: racketEx, 
            image: 'racket/racket', 
            compile: '', 
            run: (fileName: string) => `racket ${fileName}/${fileName}.${racketEx}` 
        },
        nodejs: { 
            ex: nodejsEx, 
            image: 'node', 
            compile: '', 
            run: (fileName: string) => `node ${fileName}/${fileName}.${nodejsEx}` 
        },
        typescript: { 
            ex: typescriptEx, 
            image: 'cp/typescript', 
            compile: (fileName: string) => `npx tsc ${fileName}/${fileName}.${typescriptEx}`, 
            run: (fileName: string) => `node ${fileName}/${fileName}.js` 
        },
        golang: { 
            ex: golangEx, 
            image: 'golang', 
            compile: '', 
            run: (fileName: string) => `go run ${fileName}/${fileName}.${golangEx}` 
        },
        rust: { 
            ex: rustEx, 
            image: 'rust', 
            compile: (fileName: string) => `rustc -o ./${fileName}/a.out ${fileName}/${fileName}.${rustEx}`, 
            run: (fileName: string) => `./${fileName}/a.out` 
        },
        c: { 
            ex: cEx, 
            image: 'gcc', 
            compile: (fileName: string) => `gcc -o ./${fileName}/a.out ${fileName}/${fileName}.${cEx}`, 
            run: (fileName: string) => `./${fileName}/a.out` 
        },
        cpp: { 
            ex: cppEx, 
            image: 'gcc', 
            compile: (fileName: string) => `g++ -o ./${fileName}/a.out ${fileName}/${fileName}.${cppEx}`, 
            run: (fileName: string) => `./${fileName}/a.out` 
        }
    };

    makeRandName(): Promise<string> {
        return new Promise<string>((resolve) => {
            resolve(String(Math.random()));
        });
    }

    makeError(err: Error | undefined | null): string {
        if (err) {
            return err.message.startsWith('Command failed:')
                ? err.message.substring(err.message.indexOf('\n') + 1)
                : err.message;
        }
        return '';
    }

    rmFolder(folderName: string): void {
        exec(`yes | rm -r ../${folderName}`);
        exec(`yes | rm -r ${folderName}`);
    }

    dockerExec(fileName: string, image: string, execCommand: string): Promise<string> {
        return new Promise<string>((resolve) => {
            let timeOut = false;
            setTimeout(() => {
                timeOut = true;
                exec(`docker stop ${fileName}`);
            }, 20000);
            exec(`docker run --rm --name ${fileName} -v "$PWD":/src -w /src ${image} ${execCommand}`, (err, stdout) => {
                resolve(timeOut ? 'Error: Timed Out' : (stdout ? this.makeError(err) + '\n' + stdout : this.makeError(err)));
                this.rmFolder(fileName);
            });
        });
    }

    dockerCompileAndExec(fileName: string, image: string, compileCommand: string, execCommand: string): Promise<string> {
        return new Promise<string>((resolve) => {
            exec(`docker run --rm --name ${fileName} -v "$PWD":/src -w /src ${image} ${compileCommand}`, (err, stdout) => {
                if (err) {
                    resolve(stdout ? this.makeError(err) + '\n' + stdout : this.makeError(err));
                    this.rmFolder(fileName);
                } else {
                    resolve(this.dockerExec(fileName, image, execCommand));
                }
            });
        });
    }

    run(fileName: string, fileEx: string, code: string, image: string, compileCommand: string, execCommand: string): Promise<string> {
        return new Promise<string>((resolve) => {
            exec(
                `mkdir ${fileName}; cd ${fileName}; 
                touch ${fileName}.${fileEx}; 
                echo "${code}" > ${fileName}.${fileEx};`,
                (err) => {
                    if (err) {
                        resolve(err.message);
                        this.rmFolder(fileName);
                    } else {
                        if (compileCommand) {
                            resolve(this.dockerCompileAndExec(fileName, image, compileCommand, execCommand));
                        } else {
                            resolve(this.dockerExec(fileName, image, execCommand));
                        }
                    }
                }
            );
        });
    }

    async runCode(language: string, version: string, code: string): Promise<string> {
        const fileName = await this.makeRandName();
        const { ex, image, compile, run } = this.languageConfig[language];
        if (!ex || !image || !run) {
            throw new Error('Unsupported language');
        }
        return this.run(fileName, ex, code, `${image}:${version}`, compile(fileName), run(fileName));
    }
}
