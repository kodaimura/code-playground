import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Folder } from '../folders/folder.entity';
import { InsertFolderDto, UpdateFolderDto } from './folders.dto';
import { FilesService } from '../files/files.service';


@Injectable()
export class FoldersService {

	constructor(
    	@InjectRepository(Folder)
    	private readonly foldersRepository: Repository<Folder>,
    	private readonly filesService: FilesService
  	) {}

  	async getFolders(
  		userNo: Folder['userNo'],
  		parentFolderNo: Folder['parentFolderNo']
  	): Promise<Folder[]> {
  		return this.foldersRepository.find({
  			where: {userNo, parentFolderNo}
  		})
  	}

  	async insertFolder(
  		userNo: Folder['userNo'],
  		insertFolderDto: InsertFolderDto
  	): Promise<Folder[]> {
  		insertFolderDto.userNo = userNo;
  		await this.foldersRepository.insert(insertFolderDto);
  		return this.getFolders(userNo, insertFolderDto.parentFolderNo);
  	}

  	async updateFolder(
  		userNo: Folder['userNo'],
  		folderNo: Folder['folderNo'],
  		updateFolderDto: UpdateFolderDto
  	): Promise<Folder[]> {
  		await this.foldersRepository.update(
  			{userNo, folderNo}, updateFolderDto
  		);
  		return this.getFolders(userNo, updateFolderDto.parentFolderNo);
  	}

  	async deleteFolder(
  		userNo: Folder['userNo'],
  		folderNo: Folder['folderNo']
  	): Promise<void> {
  		const folders = await this.getFolders(userNo, folderNo);
  		await this.filesService.deleteFiles(userNo, folderNo);
  		await this.foldersRepository.delete({
  			userNo, folderNo
  		});

  		for (let folder of folders) {
  			await this.deleteFolder(userNo, folder.folderNo);
  		}
  	}

  	async getPass(
  		userNo: Folder['userNo'],
  		folderNo: Folder['folderNo']
  	): Promise<Folder[]> {
  		let folder: Folder;
  		let pass = []

  		while (true) {
  			if (folderNo === 0) {
  				pass.unshift({folderNo: 0, folderName: ""});
  				return pass; 
  			}else {
  				folder = await this.foldersRepository.findOne({
  					select: ['folderName', 'folderNo', 'parentFolderNo'],
  					where: {userNo, folderNo}
  				});

  				if (!folder) {
  					throw new NotFoundException();
  				}else {
  					pass.unshift(folder);
  					folderNo = folder.parentFolderNo;
  				}
  			}
  		}
  	}
}
