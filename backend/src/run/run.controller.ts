import { 
    Controller,
    Param,
    Body,
    Post
} from '@nestjs/common';

import { RunService } from './run.service';
import { 
    python,
    ruby,
    java,
    racket,
    nodejs,
    typescript,
    golang,
    rust,
    c,
    cpp
} from '../constants';

@Controller('run')
export class RunController {
    private readonly languageMap = {
        [python]: 'runPython',
        [ruby]: 'runRuby',
        [java]: 'runJava',
        [racket]: 'runRacket',
        [nodejs]: 'runNodejs',
        [typescript]: 'runTypescript',
        [golang]: 'runGolang',
        [rust]: 'runRust',
        [c]: 'runC',
        [cpp]: 'runCpp'
    };

    constructor(private readonly runService: RunService) {}

    @Post(':language/:version')
    async runCode(
        @Param('language') language: string,
        @Param('version') version: string,
        @Body('code') code: string
    ): Promise<string> {
        const methodName = this.languageMap[language];
        if (methodName) {
            return await this.runService[methodName](version, code);
        }
        throw new Error('Unsupported language');
    }
}
