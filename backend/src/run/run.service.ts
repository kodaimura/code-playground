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
} from '../constants' 


@Injectable()
export class RunService {

	makeRandName(): Promise<string> {
		return new Promise<string> ((resolve) => {
			resolve(String(Math.random()));
		})
	}

	makeError (
		err: Error | undefined | null
	): string {
		if (err) {
			return err.message.startsWith('Command failed:')? 
				err.message.substr(err.message.indexOf("\n") + 1) 
				: err.message;
		} else {
			return "";
		}
	}

	rmFolder (
		folderName: string
	): void {
		exec(`yes | rm -r ../${folderName}`)
		exec(`yes | rm -r ${folderName}`)
	}

	dockerExec(
		fileName: string,
		image: string,
		execCommand: string
	): Promise<string> {
		return new Promise<string> ((resolve) => {
			let timeOut = false
        	setTimeout(()=>{
           		timeOut = true;
            	exec(`docker stop ${fileName}`);
        	}, 20000);
			exec(`docker run --rm --name ${fileName} -v "$PWD":/src -w /src ${image} ${execCommand}`,
            	(err, stdout) => {
                	resolve(timeOut? 'Error: Timed Out"' : 
                		stdout? this.makeError(err) + '\n' + stdout : 
                		this.makeError(err));
                	this.rmFolder(fileName);
            	}
        	)
        });
	}

	dockerCompileAndExec(
		fileName: string,
		image: string,
		compileCommand: string,
		execCommand: string,
	): Promise<string> {
		return new Promise<string> ((resolve) => {
			exec(`docker run --rm --name ${fileName} -v "$PWD":/src -w /src ${image} ${compileCommand}`,
            	(err, stdout) => {
                	if (err) {
                    	resolve(stdout? this.makeError(err) + "\n" + stdout : this.makeError(err));
                    	this.rmFolder(fileName);
                	} else {
                    	resolve(this.dockerExec(fileName, image, execCommand));
                	}
            	}
        	)
        });
	}

	run(
		fileName: string,
		fileEx: string, 
		code: string,
		image: string,
		compileCommand: string,
		execCommand: string,
	): Promise<string> {
		return new Promise<string> ((resolve) => {
			exec(
			`mkdir ${fileName}; cd ${fileName}; 
			touch ${fileName}.${fileEx}; 
			echo "${code}" > ${fileName}.${fileEx};`,
			(err) => {
				if (err) {
					resolve(err.message);
					this.rmFolder(fileName);
				}else {
                	if (compileCommand !== "") {
                		resolve(this.dockerCompileAndExec(fileName, image, compileCommand, execCommand));
                	} else {
                		resolve(this.dockerExec(fileName, image, execCommand));
                	} 
                }
            })
       	})
    }


	async runPython(
        version: string,
        code: string
    ): Promise<string> {
		const fileName = await this.makeRandName();
		const fileEx = pythonEx;
		const image = `python:${version}`;
        const execCommand = `python ${fileName}/${fileName}.${fileEx}`;
        return this.run(fileName, fileEx, code, image, "", execCommand);
    }

    async runRuby(
        version: string,
        code: string
    ): Promise<string> {
		const fileName = await this.makeRandName();
		const fileEx = rubyEx;
		const image = `ruby:${version}`;
		const execCommand = `ruby ${fileName}/${fileName}.${fileEx}`;
        return this.run(fileName, fileEx, code, image, "", execCommand);
    }

    async runJava(
        version: string,
        code: string
    ): Promise<string> {
		const fileName = await this.makeRandName();
		const fileEx = javaEx;
		const image = `openjdk:${version}`;
		const compileCommand = `javac ${fileName}/${fileName}.${fileEx}`;
		const execCommand = `java -cp ${fileName} Main`;
        return this.run(fileName, fileEx, code, image, compileCommand, execCommand);
    }

    async runRacket(
        version: string,
        code: string
    ): Promise<string> {
		const fileName = await this.makeRandName();
		const fileEx = racketEx;
		const image = `racket/racket:${version}`;
		const execCommand = `racket ${fileName}/${fileName}.${fileEx}`;
        return this.run(fileName, fileEx, code, image, "", execCommand);
    }

    async runNodejs(
        version: string,
        code: string
    ): Promise<string> {
		const fileName = await this.makeRandName();
		const fileEx = nodejsEx;
		const image = `node:${version}`;
		const execCommand = `node ${fileName}/${fileName}.${fileEx}`;
        return this.run(fileName, fileEx, code, image, "", execCommand);
    }

    async runTypescript(
        version: string,
        code: string
    ): Promise<string> {
		const fileName = await this.makeRandName();
		const fileEx = typescriptEx;
		const image = `cp/typescript`;
		const compileCommand = `npx tsc ${fileName}/${fileName}.${fileEx}`;
		const execCommand = `node ${fileName}/${fileName}.js`;
        return this.run(fileName, fileEx, code, image, compileCommand, execCommand);
    }

    async runGolang(
        version: string,
        code: string
    ): Promise<string> {
		const fileName = await this.makeRandName();
		const fileEx = golangEx;
		const image = `golang:${version}`;
		const execCommand = `go run ${fileName}/${fileName}.${fileEx}`;
        return this.run(fileName, fileEx, code, image, "", execCommand);
    }

    async runRust(
        version: string,
        code: string
    ): Promise<string> {
		const fileName = await this.makeRandName();
		const fileEx = rustEx;
		const image = `rust:${version}`;
		const compileCommand = `rustc -o ./${fileName}/a.out ${fileName}/${fileName}.${fileEx}`;
		const execCommand = `./${fileName}/a.out`;
        return this.run(fileName, fileEx, code, image, compileCommand, execCommand);
    }

    async runC(
        version: string,
        code: string
    ): Promise<string> {
		const fileName = await this.makeRandName();
		const fileEx = cEx;
		const image = `gcc:${version}`;
		const compileCommand = `gcc -o ./${fileName}/a.out ${fileName}/${fileName}.${fileEx}`;
		const execCommand = `./${fileName}/a.out`;
        return this.run(fileName, fileEx, code, image, compileCommand, execCommand);
    }

    async runCpp(
        version: string,
        code: string
    ): Promise<string> {
		const fileName = await this.makeRandName();
		const fileEx = cppEx;
		const image = `gcc:${version}`;
		const compileCommand = `g++ -o ./${fileName}/a.out ${fileName}/${fileName}.${fileEx}`;
		const execCommand = `./${fileName}/a.out`;
        return this.run(fileName, fileEx, code, image, compileCommand, execCommand);
    }

}
