import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FoldersController } from './folders.controller';
import { FoldersService } from './folders.service';
import { Folder } from './folder.entity';
import { FilesModule } from '../files/files.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Folder]),
		FilesModule,
	], 
 	providers: [FoldersService],
  	exports: [FoldersService],
  	controllers: [FoldersController],
})
export class FoldersModule {}