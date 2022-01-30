import { 
	IsNotEmpty, 
	IsString,
	IsInt,
	MaxLength 
} from 'class-validator';


export class RegisterFileBodyDto {
	@IsString()
	code: string;

	@IsString()
	description: string;
}


export class InsertFileInfoDto {

	@IsInt()
	userNo: number;

	@IsInt()
	parentFolderNo: number = 0;

	@IsString()
	@MaxLength(100)
	fileName: string;

	@IsString()
	@MaxLength(10)
	fileEx: string;

	@IsString()
	@MaxLength(30)
	lang: string;

	@IsString()
	@MaxLength(10)
	version: string;
}

export class UpdateFileInfoDto {

	@IsInt()
	parentFolderNo: number = 0;

	@IsString()
	@MaxLength(100)
	fileName: string;

	@IsString()
	@MaxLength(10)
	fileEx: string;

	@IsString()
	@MaxLength(30)
	lang: string;

	@IsString()
	@MaxLength(10)
	version: string;
}