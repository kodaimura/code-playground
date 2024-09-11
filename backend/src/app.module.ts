import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

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
    providers: [AppService, EventsGateway],
})
export class AppModule {}
