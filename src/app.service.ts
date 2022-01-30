import { Injectable } from '@nestjs/common';

import { exec } from 'child_process';


@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    getFileExtension(lang: string): string {
        const fileExtensions = {
            "python" : "py",
            "ruby" : "rb" 
        }

        return fileExtensions[lang]
    }

    getRunCommand(lang: string): string {
        const runCommand = {
            "python" : "python",
            "ruby" : "ruby" 
        }

        return runCommand[lang]
    }

    async run(
        lang: string,
        version: string,
        code: string
    ): Promise<string> {
        return new Promise<string> (async (resolve) => {
            const fName = await Math.random();
            const fEx = this.getFileExtension(lang);
            const runCommand = this.getRunCommand(lang);

            await exec(`mkdir ${fName}; cd ${fName}; touch ${fName}.${fEx}; echo "${code}" > ${fName}.${fEx};`,
                 async (err) => {
                    if (err) {
                        resolve(err.message);
                        exec(`yes | rm -r ../${fName}`)
                        exec(`yes | rm -r ${fName}`)
                    }else {
                        let timeOut = false
                        setTimeout(()=>{
                            timeOut = true;
                            exec(`docker stop ${fName}`);
                        }, 20000);
                        await exec(`docker run --rm --name ${fName} -v "$PWD":/src -w /src 
                                    ${lang}:${version} ${runCommand} ${fName}/${fName}.${fEx};`,
                            (err, stdout) => {
                                if (timeOut) {
                                    resolve("Timed Out")
                                }else if (err) {
                                    resolve(err.message);
                                }else {
                                    resolve(stdout);
                                }
                                exec(`yes | rm -r ../${fName}`)
                                exec(`yes | rm -r ${fName}`)
                            }
                        )                        
                    }
                }
            )
        })
    }
}
