import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';

import { RunModule } from './run/run.module';

import { EventsGateway } from './events.gateway';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env'
        }),
        RunModule,
    ],
    controllers: [AppController],
    providers: [EventsGateway],
})
export class AppModule {}
