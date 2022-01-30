import {
	Entity, 
	Column, 
	PrimaryColumn, 
	CreateDateColumn,
	UpdateDateColumn,
	PrimaryGeneratedColumn
} from 'typeorm';


@Entity()
export class File {

	@PrimaryGeneratedColumn()
	fileNo: number;

	@Column()
	userNo: number;

	//0 ... userNoごとのルートフォルダ
	@Column()
	parentFolderNo: number;

	@Column({ length: 100 })
	fileName: string;

	@Column({ length: 10 })
	fileEx: string;

	@Column({ length: 30 })
	lang: string;

	@Column({ length: 10 })
	version: string;

	@Column({nullable: true})
	code: string;

	@Column({nullable: true})
	description: string;

	@CreateDateColumn({ precision: 0 })
	createAt: string;

	@UpdateDateColumn({ precision: 0 })
	updateAt: string;

}