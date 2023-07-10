import { AuthCredentialDto } from './dto/auth-credential.dto';
import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User>{
	constructor(private dataSource: DataSource) {
		super(User, dataSource.createEntityManager());
	}

	async createUser(authCredentialDto : AuthCredentialDto) : Promise<void>{
		const { username, password } = authCredentialDto;
		const user = this.create({ username, password });

		await this.save(user);
	}
}