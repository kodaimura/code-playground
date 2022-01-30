import { Injectable, ConflictException  } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';

import { User } from './user.entity';
import { SignUpDto } from './users.dto';


@Injectable()
export class UsersService {

	constructor(
    	@InjectRepository(User)
    	private readonly userRepository: Repository<User>
  	) {}

	hashPassword (password: string){
		return crypto
			.createHash('sha256')
			.update(password)
			.digest('hex')
	}

  	async findOne(userId: User['userId']): Promise<User | undefined> {
   		return this.userRepository.findOne({ where: { userId } });
  	}

  	async signup(signUpDto: Omit<SignUpDto, 'userNo' | 'passwordConfirm'>): Promise<void> {
  		if(await this.findOne(signUpDto.userId)) {
  			throw new ConflictException();
  		}

  		await this.userRepository.insert({
  			...signUpDto,
  			password: this.hashPassword(signUpDto.password)
  		});

  		return;
  	}

  	async changeProfile(signUpDto: Omit<SignUpDto, 'passwordConfirm'>): Promise<void> {
  		const user = await this.findOne(signUpDto.userId);
  		if(user && user.userNo !== signUpDto.userNo) {
  			throw new ConflictException();
  		}

  		await this.userRepository.save({
  			...signUpDto,
  			password: this.hashPassword(signUpDto.password)
  		});

  		return;
  	}

}