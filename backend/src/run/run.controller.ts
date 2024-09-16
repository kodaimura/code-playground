import { Body, Controller, Post } from '@nestjs/common';
import { RunService } from './run.service';

@Controller('run')
export class RunController {
  constructor(private readonly codeExecutionService: RunService) {}

  @Post()
  async executeCode(
    @Body('language') language: string,
    @Body('code') code: string
  ): Promise<string> {
    return this.codeExecutionService.runCode(language, code);
  }
}
