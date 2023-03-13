import { 
	Controller, 
	Get,
	Post,
	Delete, 
	Request,	
	Body, 
	Param,
	Query,
	UseGuards, 
	ParseIntPipe,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { FilesService, FileInfo, FileBody } from './files.service';
import { File } from './file.entity';
import { 
	InsertFileInfoDto, 
	UpdateFileInfoDto, 
	RegisterFileBodyDto 
} from './files.dto';


@Controller('files')
export class FilesController {

	constructor(private filesService: FilesService) {}

	@Get('info')
	@UseGuards(AuthGuard('jwt'))
	async getFilesInfo(
		@Query('parentFolderNo', ParseIntPipe) parentFolderNo: number, 
		@Request() req,
	): Promise<FileInfo[]> {
		return this.filesService.getFilesInfo(
			req.user.userNo, parentFolderNo
		);
	}

	@Post('info')
	@UseGuards(AuthGuard('jwt'))
	async insertFileInfo(
		@Body() insertFileInfoDto: InsertFileInfoDto, 
		@Request() req,
	): Promise<FileInfo[]> {
		return this.filesService.insertFileInfo(
			req.user.userNo, insertFileInfoDto
		);
	}

	@Post('info/:fileNo')
	@UseGuards(AuthGuard('jwt'))
	async updateFileInfo(
		@Param('fileNo', ParseIntPipe) fileNo: number,
		@Body() updateFileInfoDto: UpdateFileInfoDto, 
		@Request() req,
	): Promise<FileInfo[]> {
		return this.filesService.updateFileInfo(
			req.user.userNo, fileNo, updateFileInfoDto
		);
	}

	@Get('body/:fileNo')
	@UseGuards(AuthGuard('jwt'))
	async getFileBody(
		@Param('fileNo', ParseIntPipe) fileNo: number,
		@Request() req,
	): Promise<FileBody> {
		return this.filesService.getFileBody(
			req.user.userNo, fileNo
		);
	}

	@Post('body/:fileNo')
	@UseGuards(AuthGuard('jwt'))
	async registerFileBody(
		@Param('fileNo', ParseIntPipe) fileNo: number,
		@Body() registerFileBodyDto: RegisterFileBodyDto, 
		@Request() req,
	): Promise<FileBody> {
		return this.filesService.registerFileBody(
			req.user.userNo, fileNo, registerFileBodyDto
		);
	}

	@Get()
	@UseGuards(AuthGuard('jwt'))
	async getFiles(
		@Query('parentFolderNo', ParseIntPipe) parentFolderNo: number, 
		@Request() req,
	): Promise<File[]> {
		return this.filesService.getFiles(
			req.user.userNo, parentFolderNo
		);
	}

	@Get(':fileNo')
	@UseGuards(AuthGuard('jwt'))
	async getFile(
		@Param('fileNo', ParseIntPipe) fileNo: number,
		@Request() req,
	): Promise<File> {
		return this.filesService.getFile(
			req.user.userNo, fileNo
		);
	}

	@Delete(':fileNo')
	@UseGuards(AuthGuard('jwt'))
	async deleteFile(
		@Param('fileNo', ParseIntPipe) fileNo: number,
		@Request() req,
	): Promise<void> {
		return this.filesService.deleteFile(
			req.user.userNo, fileNo
		);
	}
}
