import { 
	IsNotEmpty, 
	IsString,
	IsInt,
	MaxLength 
} from 'class-validator';


export class InsertFolderDto {

	@IsInt()
	userNo: number;

	@IsInt()
	parentFolderNo: number = 0;

	@IsNotEmpty()
	@IsString()
	@MaxLength(100)
	folderName: string;

}


export class UpdateFolderDto {

	@IsInt()
	parentFolderNo: number = 0;

	@IsString()
	@MaxLength(100)
	folderName: string;

	@IsString()
	description: string;

}