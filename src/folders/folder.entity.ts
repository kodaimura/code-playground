import {
	Entity, 
	Column, 
	PrimaryColumn, 
	CreateDateColumn,
	UpdateDateColumn,
	PrimaryGeneratedColumn
} from 'typeorm';


@Entity()
export class Folder {
	
	@PrimaryGeneratedColumn()
	folderNo: number;

	@Column()
	userNo: number;

	//0 ... userNoごとのルートフォルダ
	@Column()
	parentFolderNo: number;

	@Column({ length: 100 })
	folderName: string;

	@Column({nullable: true})
	description: string;

	@CreateDateColumn({ precision: 0 })
	createAt: string;

	@UpdateDateColumn({ precision: 0 })
	updateAt: string;

}