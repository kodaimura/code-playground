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
} from '../constants'


@Controller('run')
export class RunController {
	constructor(private readonly runService: RunService) {}

	@Post(`${python}/:version`)
    async runPython(
        @Param('version') version, 
        @Body('code') code 
    ): Promise<string> {
        return await this.runService.runPython(version, code);
    }

    @Post(`${ruby}/:version`)
    async runRuby(
        @Param('version') version, 
        @Body('code') code 
    ): Promise<string> {
        return await this.runService.runRuby(version, code);
    }

    @Post(`${java}/:version`)
    async runJava(
        @Param('version') version, 
        @Body('code') code 
    ): Promise<string> {
        return await this.runService.runJava(version, code);
    }

    @Post(`${racket}/:version`)
    async runRacket(
        @Param('version') version, 
        @Body('code') code 
    ): Promise<string> {
        return await this.runService.runRacket(version, code);
    }

    @Post(`${nodejs}/:version`)
    async runNodejs(
        @Param('version') version, 
        @Body('code') code 
    ): Promise<string> {
        return await this.runService.runNodejs(version, code);
    }

    @Post(`${typescript}/:version`)
    async runTypescript(
        @Param('version') version, 
        @Body('code') code 
    ): Promise<string> {
        return await this.runService.runTypescript(version, code);
    }

    @Post(`${golang}/:version`)
    async runGolang(
        @Param('version') version, 
        @Body('code') code 
    ): Promise<string> {
        return await this.runService.runGolang(version, code);
    }

    @Post(`${rust}/:version`)
    async runRust(
        @Param('version') version, 
        @Body('code') code 
    ): Promise<string> {
        return await this.runService.runRust(version, code);
    }

    @Post(`${c}/:version`)
    async runC(
        @Param('version') version, 
        @Body('code') code 
    ): Promise<string> {
        return await this.runService.runC(version, code);
    }

    @Post(`${cpp}/:version`)
    async runCpp(
        @Param('version') version, 
        @Body('code') code 
    ): Promise<string> {
        return await this.runService.runCpp(version, code);
    }

}
