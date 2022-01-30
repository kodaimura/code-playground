import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { File } from './file.entity';
import { 
	InsertFileInfoDto, 
	UpdateFileInfoDto, 
	RegisterFileBodyDto 
} from './files.dto';


export type FileInfo = UpdateFileInfoDto 
export type FileBody = RegisterFileBodyDto


@Injectable()
export class FilesService {

	constructor(
    	@InjectRepository(File)
    	private readonly filesRepository: Repository<File>,
  	) {}

  	async getFilesInfo(
  		userNo: File['userNo'],
  		parentFolderNo: File['parentFolderNo']
  	): Promise<FileInfo[]> {
  		return this.filesRepository.find({
  			select: ['fileNo', 'fileName', 'fileEx', 'lang', 'version', 'parentFolderNo'],
  			where: {userNo, parentFolderNo}
  		});
  	}

  	async insertFileInfo(
  		userNo: File['userNo'],
  		insertFileInfoDto: InsertFileInfoDto
  	): Promise<FileInfo[]> {
  		insertFileInfoDto.userNo = userNo;
  		await this.filesRepository.insert(insertFileInfoDto);
  		return this.getFilesInfo(userNo, insertFileInfoDto.parentFolderNo);
  	}

  	async updateFileInfo(
  		userNo: File['userNo'],
  		fileNo: File['fileNo'],
  		updateFileInfoDto: UpdateFileInfoDto
  	): Promise<FileInfo[]> {
  		await this.filesRepository.update(
  			{fileNo, userNo}, updateFileInfoDto
  		);
  		return this.getFilesInfo(userNo, updateFileInfoDto.parentFolderNo);
  	}

  	async getFileBody(
  		userNo: File['userNo'],
  		fileNo: File['fileNo']
  	): Promise<FileBody> {
  		return this.filesRepository.findOne({
  			select: ['fileNo', 'fileName', 'lang', 'version', 'parentFolderNo'],
  			where: {userNo, fileNo}
  		});
  	}

  	async registerFileBody(
  		userNo: File['userNo'],
  		fileNo: File['fileNo'],
  		registerFileBodyDto: RegisterFileBodyDto
  	): Promise<FileBody> {
  		await this.filesRepository.update(
  			{fileNo, userNo}, registerFileBodyDto
  		);
  		return this.getFileBody(userNo, fileNo);
  	}

	async getFiles(
  		userNo: File['userNo'],
  		parentFolderNo: File['parentFolderNo']
  	): Promise<File[]> {
  		return this.filesRepository.find({
  			where: {userNo, parentFolderNo}
  		});
  	}

  	async getFile(
  		userNo: File['userNo'],
  		fileNo: File['fileNo']
  	): Promise<File> {
  		return this.filesRepository.findOne({
  			where: {userNo, fileNo}
  		});
  	}

  	async deleteFile(
  		userNo: File['userNo'],
  		fileNo: File['fileNo']
  	): Promise<void> {
  		const file = await this.filesRepository.findOne({
  			where: {userNo, fileNo}
  		});
  		if (!file) {
  			throw new NotFoundException();
  		}else {
  			await this.filesRepository.delete({
  				userNo, fileNo
  			});
  		}
  	}

  	async deleteFiles(
  		userNo: File['userNo'],
  		parentFolderNo: File['parentFolderNo']
  	): Promise<void> {
  		await this.filesRepository.delete({
  			userNo, parentFolderNo
  		});
  	}

}
