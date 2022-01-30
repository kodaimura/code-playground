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

import { FoldersService } from './folders.service';
import { Folder } from './folder.entity';
import { InsertFolderDto, UpdateFolderDto } from './folders.dto';


@Controller('folders')
export class FoldersController {

	constructor(private foldersService: FoldersService) {}


	@Get()
	@UseGuards(AuthGuard('jwt'))
	async getFolders(
		@Query('parentFolderNo', ParseIntPipe) parentFolderNo: number, 
		@Request() req,
	): Promise<Folder[]> {
		return this.foldersService.getFolders(
			req.user.userNo, parentFolderNo
		);
	}

	@Post()
	@UseGuards(AuthGuard('jwt'))
	async insertFolder(
		@Body() insertFolderDto: InsertFolderDto, 
		@Request() req,
	): Promise<Folder[]> {
		return this.foldersService.insertFolder(
			req.user.userNo, insertFolderDto
		);
	}

	@Post(':folderNo')
	@UseGuards(AuthGuard('jwt'))
	async updateFolder(
		@Param('folderNo', ParseIntPipe) folderNo: number,
		@Body() updateFolderDto: UpdateFolderDto, 
		@Request() req,
	): Promise<Folder[]> {
		return this.foldersService.updateFolder(
			req.user.userNo, folderNo, updateFolderDto
		);
	}

	@Delete(':folderNo')
	@UseGuards(AuthGuard('jwt'))
	async deleteFolder(
		@Param('folderNo', ParseIntPipe) folderNo: number,
		@Request() req,
	): Promise<void> {
		return this.foldersService.deleteFolder(
			req.user.userNo, folderNo
		);
	}

	@Get('pass/:folderNo')
	@UseGuards(AuthGuard('jwt'))
	async getPass(
		@Param('folderNo', ParseIntPipe) folderNo: number, 
		@Request() req,
	) {
		return this.foldersService.getPass(
			req.user.userNo, folderNo
		);
	}

}
