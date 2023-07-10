import { AuthCredentialDto } from './dto/auth-credential.dto';
import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User>{
	constructor(private dataSource: DataSource) {
		super(User, dataSource.createEntityManager());
	}

	async createUser(authCredentialDto : AuthCredentialDto) : Promise<void>{
		const { username, password } = authCredentialDto;
		const user = this.create({ username, password });

		try{
			await this.save(user);
		} catch(error){
			if (error.code === '23505'){
				throw new ConflictException("username is already exist");
			} else{
				throw new InternalServerErrorException();
			}
		}
	}
}