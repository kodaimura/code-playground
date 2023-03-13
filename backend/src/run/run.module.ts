import { Module } from '@nestjs/common';
import { RunService } from './run.service';
import { RunController } from './run.controller';

@Module({
  providers: [RunService],
  controllers: [RunController]
})
export class RunModule {}
