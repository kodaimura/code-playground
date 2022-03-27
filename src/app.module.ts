import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from './users/user.entity';
import { File } from './files/file.entity';
import { Folder } from './folders/folder.entity';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RunModule } from './run/run.module';
import { FilesModule } from './files/files.module';
import { FoldersModule } from './folders/folders.module';

import { EventsGateway } from './events.gateway';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env'
        }),
        AuthModule, 
        UsersModule,
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'code-playgrounds.db',
            synchronize: true,  
            entities: [
                User,
                File,
                Folder
            ],
        }),
        RunModule,
        FilesModule,
        FoldersModule
    ],
    controllers: [AppController],
    providers: [AppService, EventsGateway],
})
export class AppModule {}
