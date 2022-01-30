import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { File } from './file.entity';

@Module({
	imports: [TypeOrmModule.forFeature([File])], 
 	providers: [FilesService],
  	exports: [FilesService],
  	controllers: [FilesController],
})
export class FilesModule {}
